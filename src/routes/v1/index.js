const express = require('express');

const genreRoute = require('./genre.route');
const movieRoute = require('./movie.route');

const router = express.Router();

const defaultRoutes = [{
    path: '/genre',
    route: genreRoute,
}, {
    path: '/movie',
    route: movieRoute,
}];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;