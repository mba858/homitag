const express = require('express');
const validate = require('../../middlewares/validate');
const genresValidation = require('../../validations/genre.validation');
const genreController = require('../../controllers/genre.controller');

const router = express.Router();
router
    .route('/')
    .post(validate(genresValidation.createGenre), genreController.createGenre)
    .get(validate(genresValidation.getGenres), genreController.getGenres);

router
    .route('/:genreId')
    .get(validate(genresValidation.getGenre), genreController.getGenre)
    .patch(validate(genresValidation.updateGenre), genreController.updateGenre)
    .delete(validate(genresValidation.deleteGenre), genreController.deleteGenre);

module.exports = router;