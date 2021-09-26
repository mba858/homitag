const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Genre } = require('../../src/models');
const { genreOne, genreTwo, admin, insertGenres } = require('../fixtures/user.fixture');

setupTestDB();

describe('Genre routes', () => {
    describe('POST /v1/genres', () => {
        let newGenre;

        beforeEach(() => {
            newGenre = {
                name: faker.name.findName(),
                description: faker.name.jobDescriptor()
            };
        });

        test('should return 201 and successfully create new genre if data is ok', async() => {
            await insertGenres([admin]);

            const res = await request(app)
                .post('/v1/genre')
                .send(newGenre)
                .expect(httpStatus.CREATED);

            expect(res.body.genreDetails).toEqual({
                id: expect.anything(),
                name: newGenre.name,
                description: newGenre.description,
                createdAt: expect.anything(),
                updatedAt: expect.anything()
            });

            const dbGenre = await Genre.findById(res.body.genreDetails.id);
            expect(dbGenre).toBeDefined();
            expect(dbGenre).toMatchObject({
                name: newGenre.name,
                description: newGenre.description
            });
        });

    });
});