const faker = require('faker');
const { Genre } = require('../../../src/models');

describe('Genre model', () => {
    describe('Genre validation', () => {
        let newGenre;
        beforeEach(() => {
            newGenre = {
                name: faker.name.findName(),
                description: faker.name.jobDescriptor()
            };
        });

        test('should correctly validate a valid genre', async() => {
            await expect(new Genre(newGenre).validate()).resolves.toBeUndefined();
        });
    });
});