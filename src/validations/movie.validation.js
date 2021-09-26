const Joi = require('joi').extend(joi => ({
    base: joi.array(),
    coerce: (value, helpers) => ({
        value: value.split ? value.split('|') : value,
    }),
    type: 'versionArray',
}))

const createMovie = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        releaseDate: Joi.string(),
        duration: Joi.number().integer().min(1),
        rating: Joi.number().integer().min(1).max(10),
        genres: Joi.string()
    }),
};

const getMovies = {
    query: Joi.object().keys({
        movieId: Joi.number(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    }),
};


const getMovie = {
    params: Joi.object().keys({
        movieId: Joi.string(),
    })
};

const updateMovie = {
    params: Joi.object().keys({
        movieId: Joi.string(),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
            description: Joi.string(),
            releaseDate: Joi.string(),
            duration: Joi.number().integer().min(1),
            rating: Joi.number().integer().min(1).max(10),
            genres: Joi.string()
        })
        .min(1),
};

const deleteMovie = {
    params: Joi.object().keys({
        movieId: Joi.string().required()
    }),
};

module.exports = {
    createMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie
};