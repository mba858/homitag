const mongoose = require('mongoose');
const faker = require('faker');
const Genre = require('../../src/models/genre.model');


const genreOne = {
    _id: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    description: faker.name.jobDescriptor()
};

const genreTwo = {
    _id: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    description: faker.name.jobDescriptor()
};

const admin = {
    _id: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    description: faker.name.jobDescriptor()
};

const insertGenres = async(genres) => {
    await Genre.insertMany(genres);
};

module.exports = {
    genreOne,
    genreTwo,
    admin,
    insertGenres,
};