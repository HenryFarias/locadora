const router = require("express").Router();
const userService = require('../service/userService');

/**
 * @api {post} user Cadastro de usuário
 * @apiGroup User
 * @apiHeader {String} Content-Type Content-Type json.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json"
 *     }
 * @apiParam {String} email  E-mail do usuário. (único)
 * @apiParam {String} name  Nome do usuário.
 * @apiParam {String} password  Senha do usuário.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email" : "henry@gmail.com",
 *       "name" : "Henry",
 *       "password" : "123"
 *     }
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 */
router.post('/', (req, res, next) => {
    userService.create(req.body)
        .then(() => res.status(200).json())
        .catch((error) => next(error));
});

module.exports = router;