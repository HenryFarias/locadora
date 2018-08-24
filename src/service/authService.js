const CustomError = require('../error/customError');
const User = require('../model/user')(global.db, global.Sequelize);
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config/config');

function service() {

}

service.login = async (email, password) => {
    return getToken(await User.login(email, password));
};

service.logoff = (token) => {
    config.blacklist.push(token);
};

const getToken = (user) => {
    if (user) {
        // Cria o token com um objeto de user. Data de expiração: Data atual.
        // Acrescenta uma token key que foi definida no .env
        // Após retorna o token.
        return jwt.encode({
            iss: {user: user},
            exp: moment().add(8, 'hours').valueOf()
        }, process.env.TOKEN_KEY);
    } else {
        throw new CustomError('Verifique seu email ou senha!', 401);
    }
};

module.exports = service;