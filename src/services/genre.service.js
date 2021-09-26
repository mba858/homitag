const httpStatus = require('http-status');
const { Genre } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a genre_
 * @param {Object} genreBody
 * @returns {Promise<Genre>}
 */
const createGenre = async(genreBody) => {
    // if(genreBody)
    const genre_ = await Genre.create(genreBody);
    return genre_;
};

/**
 * Query for genres
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryGenres = async(filter, options) => {
    const genres = await Genre.paginate(filter, options);
    return genres;
};

/**
 * Get genre_ by id
 * @param {ObjectId} id
 * @returns {Promise<Genre>}
 */
const getGenreById = async(id) => {
    return Genre.findById(id);
};


/**
 * Update genre_ by id
 * @param {ObjectId} genreId
 * @param {Object} updateBody
 * @returns {Promise<Genre>}
 */
const updateGenreById = async(genreId, updateBody) => {
    const genre_ = await Genre.findById(genreId);
    if (!genre_) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Genre not found');
    }

    Object.assign(genre_, updateBody);
    await genre_.save();
    return genre_;
};

/**
 * Delete genre_ by id
 * @param {ObjectId} genreId
 * @returns {Promise<Genre>}
 */
const deleteGenreById = async(genreId) => {
    const genre_ = await Genre.findById(genreId);
    if (!genre_) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Genre not found');
    }
    await genre_.remove();
    return genre_;
};

module.exports = {
    createGenre,
    queryGenres,
    getGenreById,
    updateGenreById,
    deleteGenreById,
};