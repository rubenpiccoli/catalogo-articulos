const express = require('express');
const router = express.Router();
const usuarios = require('../models/index').usuarios
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

   
/**********************/

router.post('/', (req, res)=>{
 
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
   if(req.body.pass==""){
      var passwords = generator.generate({
        length: 8,
        uppercase: true,
        numbers:true,
      });
   req.body.pass= passwords;
    }
//-------------------

  usuarios.create(req.body)
  
  .then((data)=>{
      res.json({datos:data})
  })
 .catch((err)=>{
      res.json({error:err})
     
 })
}
}) 
})

/**PUT Usuario */
router.put('/:id',async(req,res)=>{
  console.log(req.params.id)
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
    .then( result => {
      res.status( 200 ).json('Usuario Actualizado' )
    } )
    .catch( error => {
      res.status( 400 ).send( error )
    } )
  
});

/********************************/   
/********************************/      
router.delete('/:id',async(req,res)=>{
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
});
  

module.exports = router;

