const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const genreSchema = mongoose.Schema({

    name: { type: String, required: true, unique: true },
    description: { type: String, required: true }
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
genreSchema.plugin(toJSON);
genreSchema.plugin(paginate);

/**
 * @typedef genre
 */
const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;