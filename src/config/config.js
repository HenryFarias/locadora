/**
 * Lista de tokens deslogados:
 *
 * A ideia é funcionar como um singleton no sistema.
 * Sempre que um usuário deslogar incrementa o seu token nessa lista.
 * Isso porque a lib de jwt não implementa nenhum tipo de remoção de token.
 */
const config = {
    cors: {
        origin: '*'
    },
    blacklist: []
};

module.exports = config;