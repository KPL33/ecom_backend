//This file further sets up our middleware, importing the 'index.js' file from our '/api' folder, which bundled all of the routes utilized by our GET, POST, PUT and DELETE methods. It adds-on to this 'bundle', by providing code that will generated an '<h1>' element for the user to see, in the event that they are querying with an invalid 'route'.files, routes > index.js. It then exports this updated bundle to be utilized by our 'hub', at '../server.js'.
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;