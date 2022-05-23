const express = require('express');
const router = express.Router();
const usuarios = require('../models/index').usuarios
const roles = require('../models/index').roles
var generator = require('generate-password');

const authroutes =require ('../mideware/authroutes');


router.get('/',authroutes.verifyToken, authroutes.VerifyAuthroutes, async (req, res) =>{
  try{  
  const user=await usuarios.findAll({
       include:{
         association:"roles",
         attributes:['id','nombre']
         }
     })
    
      res.status( 200 ).json( user )
    
  }catch (e) {
      res.status(400).send({ message: 'Se produjo un error querer mostrar usuario y rol', exception: e})
    }
});

 /* Muestra un usuarios por id GET con los roles*/
 router.get('/:id/roles', async (req, res) =>{

  try{
  const user = await usuarios.findAll({
  include:{
    association:"roles",
    attributes:['id','nombre']
  },
    where:{
      id: req.params.id
  }
  })
  res.status( 200 ).json( user )
 } catch (e) {
    res.status(400).send({ message: 'Se produjo un error querer mostrar usuario y rol', exception: e})
  }
  
});
/********************************* */
   
/**********************/

router.post('/', async (req, res)=>{
 try{
  /*Verifica si existe Email para que no se repita*/  
  const testcuenta = req.body.cuenta;
  console.log('EMAMIL', testcuenta)

  const user= await usuarios.count({where:{cuenta:testcuenta}})
    
      if (user){
      res.json('Usuarios existente');
      
      }else{
  
  // ------------------
   if(req.body.pass=="" || !req.body.pass){
      var passwords = generator.generate({
        length: 8,
        uppercase: true,
        numbers:true,
      });
   req.body.pass= passwords;
    };
//-------------------

let rol = await roles.findByPk(req.body.rol_id);
 

if(!rol){
  res.status( 200 ).json('Verifique Rol');
}else{
  
 const user=await usuarios.create(req.body)
 res.status( 200 ).json('Usuario Creado')
}
}

}catch (e) {
  res.status(400).send({ message: 'Se produjo un error querer crear usuario', exception: e})
}
});

  

/**PUT Usuario */
router.put('/:id',authroutes.verifyToken, authroutes.VerifyAuthroutes,async(req,res)=>{
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
router.delete('/:id',authroutes.verifyToken, authroutes.VerifyAuthroutes,async(req,res)=>{
  const user = await usuarios.findByPk(req.params.id)
  if(!user){
    res.status( 500 ).json('Usuario inexistente');
  }else{
    try {
  await usuarios.destroy({
    where:{
        id:req.params.id
    }
  })
  res.status( 200 ).json('Usuario Eliminado' )
  }
  catch(e){
    res.status(500).send({ message: 'Se produjo un error al borrar el Usuario', exception: e})
      }
  }
   
      
});
  



module.exports = router;

