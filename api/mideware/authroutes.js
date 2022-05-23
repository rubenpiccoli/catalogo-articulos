const usuarios = require('../models/index').usuarios
const roles = require('../models/index').roles
const jwt = require('jsonwebtoken');


async function verifyToken (req,res,next){
    try{
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader)
    if(typeof bearerHeader!=='undefined'){
        const Token=bearerHeader.split(" ")[1];
        req.token = Token; 
        var descodificado = jwt.verify(Token, 'UserToken');
       /*console.log(descodificado);*/
       const cuenta = descodificado.cuenta
       const user = await usuarios.findAll({

        where:{
            cuenta:cuenta,
        }});
       if(!user) return res.status(400).json({message:"Usuario no encontrado"});
       req.cuenta= cuenta
       
        next();    
    }else{
        res.sendStatus(403)

    }
    

    }catch (error ){
     return res.status(401).json({message:"No autorizado"})
    }

}

//Verifucar autorizacion de ruta por roles ///
async function VerifyAuthroutes(req,res,next){
    try{ 
       
   const usuario= await usuarios.findAll({ 
       
       where:{cuenta: req.cuenta},})
    if(!usuario){
        return res.status(401).json({message:"No autorizado"})
    }else{
    
   const Role= await roles.findAll({
       include:{
                association:"politicas",
                attributes:['politicas']
            },
       where:{
              id: usuario[0].rol_id
             }
   });
    
   const Poli=req.headers.poli
   console.log(Poli)
    for(const p of Role[0].politicas) {
        
        if(Poli===p.politicas){
          return next();
        }
    }
   
    return res.status(401).json({message:"No autorizado"})
   
}
}catch (error ){
    return res.status(401).json({message:"No autorizado"})
   }

    }

module.exports = {verifyToken,VerifyAuthroutes};