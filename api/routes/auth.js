
const express = require('express');
const router = express.Router();
const usuarios = require('../models/index').usuarios;
const roles = require('../models/index').roles
const jwt = require('jsonwebtoken');
const validation = require('../mideware/validation');
const authroutes =require ('../mideware/authroutes');


router.post('/login', validation.validate(validation.validationLogin), async (req, res)=>{

 
    try{
        const user = await usuarios.findAll({

            where:{
                cuenta:req.body.cuenta,
                pass:req.body.pass
                
            }
        })
       
    if(user.length==0){
        res.json("Verifique datos")
    }
    else{
        const cuenta= req.body.cuenta;
        const pass= req.body.pass;
        const jUser={cuenta, pass};
       console.log(jUser)
       const token = jwt.sign(jUser,'UserToken', { expiresIn:'1h'});
       console.log(token)

      /* var descodificado = jwt.verify(token, 'UserToken');
       console.log(descodificado);*/
       /////////////////////////////////////
       const Role= await roles.findAll({
        include:{
                 association:"politicas",
                 attributes:['politicas']
             },
        where:{
               id: user[0].rol_id
              }
    });
     
    
   
     for(const p of Role[0].politicas) {
        
         if("Dashboard"===p.politicas){
           const dashboard = true;
           return res.status(200).send({token:token, message:dashboard})
         }
     }
    
       /////////////////////////////////
        res.status(200).send({token:token})

    }
}
catch(e){
    res.status(500).send({ message: 'error', exception: e})
}

});

////VERIFICA TOKEN PARA INGRESAR A LA RUTA ////
router.post('/index', authroutes.verifyToken, authroutes.VerifyAuthroutes, async (req, res)=>{
 jwt.verify(req.token, 'UserToken', (error, authData)=>{
     if(error){
         res.sendStatus(403)
     }else{
         res.json({
             mensaje:"Token verificado correctamente",
             /*authData*/
         })
     }
 })
});





module.exports = router;