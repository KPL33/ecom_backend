//This file further sets up our middleware, importing the 'index.js' file from our '/api' folder, which "bundled" all of the routes utilized by our GET, POST, PUT and DELETE methods. It adds-on to that "bundle", by generating an '<h1>' element for the user to see on the page, in the event that they are querying via an invalid 'route'. This updated "bundle" is then 'export'ed (as 'router'), to be utilized by the '../server.js' file.
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;