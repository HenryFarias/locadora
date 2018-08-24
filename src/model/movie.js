module.exports = function (sequelize, DataTypes) {
    const Movie = sequelize.define('movie', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        director: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
	}, {
        tableName: 'movie',
        // Atributos que não retornarão nas responses.
        defaultScope: {
            attributes: {exclude: ['userId', 'deletedAt']},
        }
    });

    const User = require('./user')(sequelize, DataTypes);
    User.hasMany(Movie);
    Movie.belongsTo(User);

    // Foi incluído o usuário na listagem pois pode ser necessário no front para um botão de aluguel de filme.
    Movie.list = () => Movie.findAll({
        include: [{
            model: User,
            required: false
        }]
    });

    Movie.findByTitle = (title) => Movie.findAll({
        where: {
            title: {$like: title}
        }
    });

    Movie.find = (id) => Movie.findById(id, {
        include: [{
            model: User,
            required: false
        }]
    });

    Movie.rent = (movieId, userId) => {
        return Movie.update({userId: userId},
            {
                where: {id: movieId}
            });
    };

    // A devolução do filme foi de uma forma diferente do aluguel apenas para mostrar as duas formas
    // É uma forma um pouco mais elegante mas com o custo de uma consulta a mais.
    // Para uma aplicação desse tamanho acredito que seria o ideal trabalhar com os objetos relacionais dessa forma,
    // ao invés de apenas setar o id como feito no rent.
    Movie.giveBack = (movieId) => Movie.findById(movieId).then((movie) => {
        movie.setUser(null)
    });

	return Movie;
};
