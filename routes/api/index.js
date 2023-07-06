//This file sets up the middleware for these routes, allowing GET, POST, PUT and DELETE requests to reach the database via the specified prefixes, directing the queries to the corresponding route files shown. It then 'exports' the 'routes' to be utlized by another of our files, '../routes/index.js'.

const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
