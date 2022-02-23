const express = require('express');
const router = express.Router();
const politicas = require('../models/index').politicas;

router.get('/', async (req, res) =>{
    const politica = await politicas.findAll({attributes:['id','politicas']})
    .then( poliResponse => {
      res.status( 200 ).json( poliResponse )
    } )
    .catch( error => {
      res.status( 400 ).send( error )
    } )
  });
  module.exports = router;
