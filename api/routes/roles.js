const express = require('express');
const usuarios = require('../models/usuarios');
const router = express.Router();
const politicas = require('../models/index').politicas;
const roles_politicas = require('../models/index').roles_politicas;
const roles = require('../models/index').roles;


/* Muestra todos los roles GET */
router.get('/', async (req, res) =>{
  try{
    const rol = await roles.findAll({attributes:['id','nombre']})
    if (rol.length==0){
    res.status(200).send({ message: 'no se encontraron roles'})
    }else{
    res.status( 200 ).json( rol )
    }
  }catch(e){
    res.status(400).send({ message: 'error', exception: e})
  }
    
  });
 
  
  /** Nuevo Rol POST */
  router.post('/', async (req, res)=>{
       
 // 1. INSERT a new rol
 try {
  if (!req.body.nombre || req.body.nombre=="" || !req.body.politicas || req.body.politicas=="")
    res.status(400).send({ message: 'Debe indicar el campo [nombre] con sus politicas en el body ' })
  else {
    const rol = await roles.create({
      nombre: req.body.nombre,
    });
    for (const p of req.body.politicas) {
      let politica = await politicas.findByPk(p);
       if(!politica) {    
         
         /*sino encuentra la politica en la base de datos no la guarda en roles_politicas*/
       }else{
        rol.addPoliticas(politica);
       
       }
    }
    res.status(200).json(rol);
  }

} catch (e) {
  res.status(500).send({ message: 'Se produjo un error al guardar el rol', exception: e})
}
});
    

/**************************************************************************************** */
  /*Modifica Rol PUT*/
  router.put('/:id', async (req,res)=>{
    
    try {
      const role = await roles.findByPk(req.params.id)
     
      if(!role){
        res.status( 200 ).json('Rol inexistente'); 
      }else{
      
        if (!req.body.nombre){
        res.status(400).send({ message: 'Debe indicar el campo [nombre] en el body ' })
         } else {
  
                  await roles.update({ nombre:req.body.nombre},
              { where:{
                       id: req.params.id 
                      }
      });
    }
      const role = await roles.findByPk(req.params.id)
        /* sino se envia policas muestra el rol modificado*/
      if(!req.body.politicas){
        res.status(200).json(role);
    
    }else {
  
         /* si se recibe politicas nuevas o las mismas las actuliza */
          let  politica = await politicas.findAll({where: {id: req.body.politicas}})
          
          //.then(resultado=>{
          if(politica.length==0 ){
              /*si se envia vacio o no se envia*/
          }else{
            /*elimina y actualiza las politicas */
            role.setPoliticas(politica);
        }
        res.status(200).json(role);
      }
      }


      } catch (e) {
      res.status(400).send({ message: 'Se produjo un error al Modificar el rol', exception: e})
    }
    
  });
      
         
        
           


  /* Elimina  Rol*/
  router.delete('/:id',async(req,res)=>{
    try{
    const role = await roles.findByPk(req.params.id)
    if(!role){
      res.status( 200 ).json('Rol inexistente'); 
    }else{
    await roles.destroy({
      where:{
          id:req.params.id
      }
    })
    res.status( 200 ).json('Rol eliminado');
   } 
    }catch (e) {
      res.status(400).send({ message: 'Se produjo un error querer eliminar el rol', exception: e})
    }
    
    });


  /*************************** */
   

  module.exports = router;