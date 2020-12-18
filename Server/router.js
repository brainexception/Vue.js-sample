const express = require('express');
const Value = require('./controllers/Value.controller');

const Principle = require('./controllers/Principle.controller');




module.exports = function (app) {

  // Initializing route groups
  const apiRoutes = express.Router()

  // Value routes
  apiRoutes.post('/Value', Value.createValue);
  apiRoutes.get('/Value', Value.getValue);
  apiRoutes.put('/Value/:id', Value.updateValue);
  apiRoutes.delete('/Value/:id', Value.deleteValue);

 // Principle routes
  apiRoutes.post('/Principle', Principle.createPrinciple);
  apiRoutes.get('/Principle', Principle.getPrinciple);
  apiRoutes.put('/Principle/:id', Principle.updatePrinciple);
  apiRoutes.delete('/Principle/:id', Principle.deletePrinciple);



  

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
