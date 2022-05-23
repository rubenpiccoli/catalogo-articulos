const express = require('express');
const router = express.Router();
const politicas = require('../models/index').politicas;

router.get('/', async (req, res) =>{
    
  try{
  const politica = await politicas.findAll({attributes:['id','politicas']})
  res.status( 200 ).json( politica )
  }catch(e){
    res.status(400).send({ message: 'error', exception: e})
  }
    
});   
   
  module.exports = router;
