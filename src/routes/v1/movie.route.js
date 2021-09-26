const express = require('express');
const validate = require('../../middlewares/validate');
const moviesValidation = require('../../validations/movie.validation');
const movieController = require('../../controllers/movie.controller');

const router = express.Router();
router
    .route('/')
    .post(validate(moviesValidation.createMovie), movieController.createMovie)
    .get(validate(moviesValidation.getMovies), movieController.getMovies);

router
    .route('/:movieId')
    .get(validate(moviesValidation.getMovie), movieController.getMovie)
    .patch(validate(moviesValidation.updateMovie), movieController.updateMovie)
    .delete(validate(moviesValidation.deleteMovie), movieController.deleteMovie);

module.exports = router;