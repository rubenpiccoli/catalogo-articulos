const express = require('express');
const router = express.Router();
const usuarios = require('../models/index').usuarios
const roles = require('../models/index').roles
var generator = require('generate-password');


router.get('/', async (req, res) =>{
     await usuarios.findAll({
       include:{
         association:"roles",
         attributes:['id','rol']

       }
     })
    .then( userResponse => {
      res.status( 200 ).json( userResponse )
    } )
    .catch( error => {
      res.status( 400 ).send( error )
    } )
});
 /* Muestra un usuarios por id GET con los roles*/
 router.get('/:id/roles', async (req, res) =>{
  const user = await usuarios.findAll({
  include:{
    association:"roles",
    attributes:['id','rol']
  },
    where:{
      id: req.params.id
  }
  })

  .then( userResponse => {
    res.status( 200 ).json( userResponse )
  } )
  .catch( error => {
    res.status( 400 ).send( error )
  } )
});
/********************************* */
   
/**********************/

router.post('/', async (req, res)=>{
 
  /*Verifica si existe Email para que no se repita*/  
  const testcuenta = req.body.cuenta;
  console.log('EMAMIL', testcuenta)

  const user= usuarios.count({where:{cuenta:testcuenta}})
    .then( user => {
      if (user > 0){
      res.json('usuarios exitente');
      return
      }else{
  
  // ------------------
   if(req.body.pass=="" || !req.body.pass){
      var passwords = generator.generate({
        length: 8,
        uppercase: true,
        numbers:true,
      });
   req.body.pass= passwords;
    }
//-------------------

let rol = roles.findByPk(req.body.rol_id)
 .then(rol=>{

if(!rol){
  res.status( 500 ).json('Verifique Rol');
}else{
  
 usuarios.create(req.body)
 
 .then(use=>{
  res.status( 200 ).json(use)
 }).catch(err=>{
   res.status(500).json(err.message)
 })
}
  
})


}
})

})



/**PUT Usuario */
router.put('/:id',async(req,res)=>{
  const user = await usuarios.findByPk(req.params.id)
  if(!user){
    res.status( 500 ).json('Usuario inexistente');
  }else{
    try {
         await usuarios.update({
          cuenta:req.body.cuenta,
          nombre:req.body.nombre,
          pass:req.body.pass,
          rol_id:req.body.rol_id
            },{
              where:{
                id: req.params.id
        }
    })
    res.status( 200 ).json('Usuario Actualizado' )
  }
  

catch (e){
  res.status(500).send({ message: 'Se produjo un error al actualizar el Usuario', exception: e})
    }
  }
});

/********************************/   
/********************************/      
router.delete('/:id',async(req,res)=>{
  const user = await usuarios.findByPk(req.params.id)
  if(!user){
    res.status( 500 ).json('Usuario inexistente');
  }else{
  await usuarios.destroy({
    where:{
        id:req.params.id
    }
  })
    .then( result => {
      res.status( 200 ).json('Usuario Eliminado con exito' )
    } )
    .catch( error => {
      res.status( 400 ).send( error )
    } )
  }
});
  

module.exports = router;

