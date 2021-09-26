const Joi = require('joi');

const createGenre = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string()
    }),
};

const getGenres = {
    query: Joi.object().keys({
        genreId: Joi.number(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    }),
};


const getGenre = {
    params: Joi.object().keys({
        genreId: Joi.string(),
    })
};

const updateGenre = {
    params: Joi.object().keys({
        genreId: Joi.string(),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
            description: Joi.string()
        })
        .min(1),
};

const deleteGenre = {
    params: Joi.object().keys({
        genreId: Joi.string().required()
    }),
};

module.exports = {
    createGenre,
    getGenres,
    getGenre,
    updateGenre,
    deleteGenre
};