const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { movieService } = require('../services');
const { ApiSuccess, ApiValidation } = require("../utils/ApiResponse");
const { ERROR_CODES } = require('../config/constants');

const createMovie = catchAsync(async(req, res) => {
    try {
        let params = req.body;

        if (params.genres)
            params.genres = params.genres.split(',');
        const movieDetails = await movieService.createMovie(params);


        res.status(httpStatus.CREATED)
            .json(ApiSuccess("Movie created successfully.", { movieDetails }, res.statusCode));
    } catch (e) {
        if (e.code == ERROR_CODES.DUPLICATE)
            res.status(httpStatus.BAD_REQUEST)
            .json(ApiSuccess("Entity with given values already present.", { status: false }, ERROR_CODES.DUPLICATE));
        else
            res.status(httpStatus.BAD_REQUEST)
            .json(ApiSuccess("One of the provided genre id/ids is not correct.", { status: false }, ERROR_CODES.INVALID_PARAMS));
    }
});

const getMovies = catchAsync(async(req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sortBy', 'limit', 'page', 'name']);
    options['populate'] = "genres";

    const result = await movieService.queryMovies(filter, options);
    res.status(200)
        .json(ApiSuccess("Movie list retrieved successfully.", result, res.statusCode));
});

const getMovie = catchAsync(async(req, res) => {
    const movieDetails = await movieService.getMovieById(req.params.movieId);
    if (!movieDetails) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
    }
    res.status(200)
        .json(ApiSuccess("Movie details retrieved successfully.", { movieDetails }, res.statusCode));
});

const updateMovie = catchAsync(async(req, res) => {
    try {
        const movieDetails = await movieService.updateMovieById(req.params.movieId, req.body);
        res.status(200)
            .json(ApiSuccess("Movie details updated successfully.", { movieDetails }, res.statusCode));
    } catch (e) {
        if (e.code == ERROR_CODES.DUPLICATE)
            res.status(httpStatus.BAD_REQUEST)
            .json(ApiSuccess("Entity with given values already present.", { status: false }, ERROR_CODES.DUPLICATE));
        else
            res.status(httpStatus.NOT_FOUND)
            .json(ApiSuccess("Movie not found.", { status: false }, ERROR_CODES.NOT_FOUND));
    }
});

const deleteMovie = catchAsync(async(req, res) => {
    await movieService.deleteMovieById(req.params.movieId);
    res.status(200)
        .json(ApiSuccess("Movie deleted successfully.", null, res.statusCode));
});

module.exports = {
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie,
};