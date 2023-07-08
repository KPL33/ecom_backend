//This file assists in setting up our app's middleware, allowing GET, POST, PUT and DELETE requests to reach the database via the specified prefixes, directing the queries to the corresponding route files shown. We then 'export' the 'routes' (as 'router') to be utlized by another of our files, '../routes/index.js'.

const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
