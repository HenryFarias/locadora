const router = require("express").Router();
const jwtMiddleware = require('../middleware/jwt');
const authService = require('../service/authService');

//MIDDLEWARES - Middleware de jwt aplicado somente na rota /logoff
router.post('/logoff', jwtMiddleware);

/**
 * @api {post} login Login de usuário
 * @apiGroup Auth
 * @apiHeader {String} Content-Type Content-Type json.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json"
 *     }
 * @apiParam {String} email  E-mail do usuário.
 * @apiParam {String} password  Senha do usuário.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email" : "henry@gmail.com",
 *       "password" : "123"
 *     }
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    {
 *        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3"
 *    }
 */
router.post('/login', (req, res, next) => {
    authService.login(req.param('email'), req.param('password'))
        .then((token) => res.status(200).json({
            token: token
        }))
        .catch((error) => next(error))
});

/**
 * @api {post} logoff Logoff de usuário
 * @apiGroup Auth
 * @apiHeader {String} Authorization Token de acesso fornecido pelo login.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc"
 *     }
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 */
router.post('/logoff', (req, res) => {
    authService.logoff(req.headers['authorization']);
    res.status(200).json();
});

module.exports = router;