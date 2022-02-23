const express = require('express');
const politicas = require('../models/index').politicas;
const router = express.Router();
const roles = require('../models/index').roles;


/* Muestra todos los roles GET */
router.get('/', async (req, res) =>{
    const rol = await roles.findAll({attributes:['id','rol']})
    .then( rolResponse => {
      res.status( 200 ).json( rolResponse )
    } )
    .catch( error => {
      res.status( 400 ).send( error )
    } )
  });
  
  /** Nuevo Rol POST */
router.post('/', async (req, res)=>{
  
  const rol= await roles.create({
          rol: req.body.rol,
          politicas:[{
            politicas:req.body,
            roles_politicas: {
              selfGranted: true
            }
          }]
        
  },{
    include: 'politicas',       
  })
  const result = await User.findOne({
    where: { rol: req.body.rol },
    include: politicas
  })
.then( result => {
  res.status( 200 ).json( result )
} )
.catch( error => {
  res.status( 400 ).send( error )
} )

}),
 


  /*Modifica Rol PUT*/
  router.put('/:id',async(req,res)=>{
    console.log(req.params.id)
    
     const rol =  await roles.update({
           rol:req.body.rol },{ where:{id: req.params.id}})
           
               
    .then( rol => {
      res.status( 200 ).json('Rol actualizado');
    } )
    .catch( error => {
      res.status( 400 ).send(error)
    } )
     
    });

  /* Elimina  Rol*/
  router.delete('/:id',async(req,res)=>{
    await roles.destroy({
      where:{
          id:req.params.id
      }
    }).then( rol => {
      res.status( 200 ).json('Rol eliminado');
    } )
    .catch( error => {
      res.status( 400 ).send(error)
    } )
    });
  
    

  module.exports = router;