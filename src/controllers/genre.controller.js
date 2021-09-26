const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { genreService } = require('../services');
const { ApiSuccess, ApiValidation } = require("../utils/ApiResponse");
const { ERROR_CODES } = require('../config/constants');

const createGenre = catchAsync(async(req, res) => {
    try {
        let params = req.body;

        const genreDetails = await genreService.createGenre(params);

        res.status(httpStatus.CREATED)
            .json(ApiSuccess("Genre created successfully.", { genreDetails }, res.statusCode));
    } catch (e) {
        if (e.code == ERROR_CODES.DUPLICATE)
            res.status(httpStatus.BAD_REQUEST)
            .json(ApiSuccess("Entity with given values already present.", { status: false }, ERROR_CODES.DUPLICATE));
    }
});

const getGenres = catchAsync(async(req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sortBy', 'limit', 'page', 'name']);

    const result = await genreService.queryGenres(filter, options);
    res.status(200)
        .json(ApiSuccess("Genre list retrieved successfully.", result, res.statusCode));
});

const getGenre = catchAsync(async(req, res) => {
    const genreDetails = await genreService.getGenreById(req.params.genreId);
    if (!genreDetails) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Genre not found');
    }
    res.status(200)
        .json(ApiSuccess("Genre details retrieved successfully.", { genreDetails }, res.statusCode));
});

const updateGenre = catchAsync(async(req, res) => {
    try {
        const genreDetails = await genreService.updateGenreById(req.params.genreId, req.body);
        res.status(200)
            .json(ApiSuccess("Genre details updated successfully.", { genreDetails }, res.statusCode));
    } catch (e) {
        if (e.code == ERROR_CODES.DUPLICATE)
            res.status(httpStatus.BAD_REQUEST)
            .json(ApiSuccess("Entity with given values already present.", { status: false }, ERROR_CODES.DUPLICATE));
    }
});

const deleteGenre = catchAsync(async(req, res) => {
    await genreService.deleteGenreById(req.params.genreId);
    res.status(200)
        .json(ApiSuccess("Genre deleted successfully.", null, res.statusCode));
});

module.exports = {
    createGenre,
    getGenres,
    getGenre,
    updateGenre,
    deleteGenre,
};