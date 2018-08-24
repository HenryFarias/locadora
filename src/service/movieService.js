const Movie = require('../model/movie')(global.db, global.Sequelize);
const User = require('../model/user')(global.db, global.Sequelize);
const CustomError = require('../error/customError');

function service() {

}

service.list = () => {
    return Movie.list();
};

service.findByTitle = async (title) => {
    const movies = await Movie.findByTitle(title);

    if (!movies || movies.length == 0) {
        throw new CustomError('Nenhum filme encontrado para esse título!');
    }

    return movies;
};

service.rent = async (movieId, userId) => {
    const movie = await findMovie(movieId);

    if (movie.user) {
        throw new CustomError('Filme já está alugado!', 423);
    }

    const user = await User.find(userId);

    if (!user) {
        throw new CustomError('Usuário não encontrado!');
    }

    let result = await Movie.rent(movieId, userId);
    if(!result) throw new CustomError('Houve um erro durante a locação do filme!');
};

service.giveBack = async (id) => {
    const movie = await findMovie(id);

    if (!movie.user) {
        throw new CustomError('Filme não está alugado!');
    }

    await Movie.giveBack(id);
};

const findMovie = async (id) => {
    const movie = await Movie.find(id);

    if (!movie) {
        throw new CustomError('Filme não encontrado!');
    }

    return movie;
};

module.exports = service;