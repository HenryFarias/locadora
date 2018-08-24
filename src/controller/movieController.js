const router = require("express").Router();
const jwtMiddleware = require('../middleware/jwt');
const movieService = require('../service/movieService');

//MIDDLEWARES
router.use(jwtMiddleware);

/**
 * @api {get} movie Listagem de filmes
 * @apiGroup Movie
 * @apiHeader {String} Authorization Token de acesso fornecido pelo login.
 * @apiHeader {String} Content-Type Content-Type json.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc"
 *       "Content-Type": "application/json"
 *     }
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *         {
 *            "id": 1,
 *            "code": "1",
 *            "title": "filme1",
 *            "director": "diretor",
 *            "createdAt": null,
 *            "updatedAt": "2018-08-13T19:15:38.000Z",
 *            "user": null
 *        }
 *    ]
 */
router.get('/', (req, res, next) => {
    movieService.list()
        .then((movies) => res.status(200).json(movies))
        .catch((error) => next(error));
});

/**
 * @api {get} movie/:title Listagem de filmes por título
 * @apiGroup Movie
 * @apiHeader {String} Authorization Token de acesso fornecido pelo login.
 * @apiHeader {String} Content-Type Content-Type json.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc"
 *       "Content-Type": "application/json"
 *     }
 * @apiParam {String} [title]  Título do filme.
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    [
 *         {
 *            "id": 2,
 *            "code": "2",
 *            "title": "filme2",
 *            "director": "diretor2",
 *            "createdAt": null,
 *            "updatedAt": "2018-08-13T19:15:33.000Z"
 *        }
 *    ]
 */
router.get('/:title', (req, res, next) => {
    movieService.findByTitle(req.params.title)
        .then((movies) => res.status(200).json(movies))
        .catch((error) => next(error));
});

/**
 * @api {patch} movie/rent/:movieId/user/:userId Alugar filme
 * @apiGroup Movie
 * @apiHeader {String} Authorization Token de acesso fornecido pelo login.
 * @apiHeader {String} Content-Type Content-Type json.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc"
 *       "Content-Type": "application/json"
 *     }
 * @apiParam {Number} movieId  ID do filme que será alugado.
 * @apiParam {Number} userId  ID do usuário que irá alugar o filme.
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 */
router.patch('/rent/:movieId/user/:userId', async (req, res, next) => {
    await movieService.rent(req.params.movieId, req.params.userId)
        .then(() => res.status(200).json())
        .catch((error) => next(error));
});

/**
 * @api {patch} movie/giveBack/:movieId Devolução de filme
 * @apiGroup Movie
 * @apiHeader {String} Authorization Token de acesso fornecido pelo login.
 * @apiHeader {String} Content-Type Content-Type json.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc"
 *       "Content-Type": "application/json"
 *     }
 * @apiParam {Number} movieId  ID do filme que será devolvido.
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 */
router.patch('/giveBack/:id', (req, res, next) => {
    movieService.giveBack(req.params.id)
        .then(() => res.status(200).json())
        .catch((error) => next(error));
});

module.exports = router;