const httpStatus = require('http-status');
const { Movie } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a movie_
 * @param {Object} movieBody
 * @returns {Promise<Movie>}
 */
const createMovie = async(movieBody) => {
    // if(movieBody)
    const movie_ = await Movie.create(movieBody);
    return movie_;
};

/**
 * Query for movies
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMovies = async(filter, options) => {
    const movies = await Movie.paginate(filter, options);
    return movies;
};

/**
 * Get movie_ by id
 * @param {ObjectId} id
 * @returns {Promise<Movie>}
 */
const getMovieById = async(id) => {
    return Movie.findById(id).populate('genres');
};


/**
 * Update movie_ by id
 * @param {ObjectId} movieId
 * @param {Object} updateBody
 * @returns {Promise<Movie>}
 */
const updateMovieById = async(movieId, updateBody) => {
    const movie_ = await Movie.findById(movieId);
    if (!movie_) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
    }

    Object.assign(movie_, updateBody);
    await movie_.save();
    return movie_;
};

/**
 * Delete movie_ by id
 * @param {ObjectId} movieId
 * @returns {Promise<Movie>}
 */
const deleteMovieById = async(movieId) => {
    const movie_ = await Movie.findById(movieId);
    if (!movie_) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
    }
    await movie_.remove();
    return movie_;
};

module.exports = {
    createMovie,
    queryMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById,
};