const jwt = require('jwt-simple');
require('dotenv').config();
const config = require('../config/config');
const CustomError = require('../error/customError');

/**
 * Método responsável por verificar a validade do token:
 *
 * Valida se o token não está na blackList de tokens que já deslogaram do sistema
 * Valida se a data de expiração é maior que a data atual
 */
const validateToken = (token, exp) => !config.blacklist.includes(token) && exp > Date.now();

const middleware = function(req, res, next) {
    let token = req.headers['authorization'];
    let decoded = jwt.decode(token, process.env.TOKEN_KEY);

    if (!validateToken(token, decoded.exp)) {
        throw new CustomError('Verifique seu token de acesso!', 401);
    } else {
        next();
    }
};

module.exports = middleware;