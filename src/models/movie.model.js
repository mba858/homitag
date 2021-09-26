const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const movieSchema = mongoose.Schema({

    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    releaseDate: { type: Date, required: false },
    duration: { type: Number, required: false },
    rating: { type: Number, required: false },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: false }],
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
movieSchema.plugin(toJSON);
movieSchema.plugin(paginate);

/**
 * @typedef movie
 */
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;