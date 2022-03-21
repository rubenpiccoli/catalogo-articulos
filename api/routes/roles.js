const express = require('express');
const usuarios = require('../models/usuarios');
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
 try {
  if (!req.body.rol || req.body.rol=="" || !req.body.politicas || req.body.politicas=="")
    res.status(400).send({ message: 'Debe indicar el campo [nombre] con sus politicas en el body ' })
  else {
    const rol = await roles.create({
      rol: req.body.rol,
    });
    for (const p of req.body.politicas) {
      let politica = await politicas.findByPk(p);
       if(!politica) {    
         
         /*sino encuentra la politica en la base de datos no la guarda en roles_politicas*/
       }else{
        rol.addPoliticas(politica);
        res.status(200).json(rol);
       }
    }
    
  }

} catch (e) {
  res.status(500).send({ message: 'Se produjo un error al guardar el rol', exception: e})
}
});
    

/**************************************************************************************** */
  /*Modifica Rol PUT*/
  router.put('/:id', async (req,res)=>{
    const role = await roles.findByPk(req.params.id)
    if(!role){
      res.status( 500 ).json('Rol inexistente'); 
    }else{
    try {
      if (!req.body.rol)
      res.status(400).send({ message: 'Debe indicar el campo [nombre] en el body ' })
    else {

      await roles.update({ rol:req.body.rol},
      { where:{
        id: req.params.id 
      }
    });
    const role = await roles.findByPk(req.params.id)
      /* sino se envia policas muestra el rol modificado*/
    if(!req.body.politicas){
      res.status(200).json(role);
  
  }else {

       /* si se recibe politicas nuevas o las mismas las actuliza */
        let  politica=politicas.findAll({where: {id: req.body.politicas}})
        
        .then(resultado=>{
        if(resultado=="" || !resultado ){
            /*si se envia vacio o no se envia*/
        }else{
          /*elimina y actualiza las politicas */
          role.setPoliticas(resultado);
      }
      res.status(200).json(role);
    })
       }
      }
    
  }catch (e) {
      res.status(500).send({ message: 'Se produjo un error al Modificar el rol', exception: e})
    }
    }
  });
      
         
        
           


  /* Elimina  Rol*/
  router.delete('/:id',async(req,res)=>{
    const role = await roles.findByPk(req.params.id)
    if(!role){
      res.status( 500 ).json('Rol inexistente'); 
    }else{
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
  }
    });


  /*************************** */
   

  module.exports = router;