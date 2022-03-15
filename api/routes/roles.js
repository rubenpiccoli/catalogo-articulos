const express = require('express');
const router = express.Router();
const politicas = require('../models/index').politicas;
const roles_politicas = require('../models/index').roles_politicas;
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
   
    // 1. INSERT a new rol
 const rol = await roles.create({
   rol: req.body.rol,
   
   });
    
 politicas.findAll({where: {id: req.body.politicas}})
 
    .then(resultado=>{
      
      if(!resultado){
       // res.status( 400 ).send( error )
        return null;
      }
      rol.addPoliticas(resultado, { through: { selfGranted: false }})
      res.status( 200 ).json( rol )
    })
     
 
  });
  
    


  /*Modifica Rol PUT*/
  router.put('/:id', async(req,res)=>{
      const rol= await roles.update({rol:req.body.rol},{ where:{id: req.params.id }});
          
            if(!req.body.politicas){
              return res.status( 200 ).json('rol Modificado');
            }else{         
            const politica=politicas.findAll({where: {id: req.body.politicas}})
           
         .then(politica=>{
           
           if(!politica){
            return null;
           }else{
              const rolees=req.params.id;
              
               rolees.setPoliticas(politica);
                return res.status( 200 ).json('rol y politicas Modificado') 
           }
           })
            }
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