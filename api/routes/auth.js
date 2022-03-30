const express = require('express');
const router = express.Router();
const usuarios = require('../models/index').usuarios;
 const jwt = require('jsonwebtoken')

router.post('/login', async (req, res)=>{

    const user = await usuarios.findAll({
        where:{
            cuenta:req.body.usuario,
            pass:req.body.pass
            
        }
    })
    try{
       
    if(user == "" ){
        res.json("Verifique datos")
    }
    else{
        const usuario= req.body.usuario;
        const pass= req.body.pass;
        const jUser={usuario, pass};
       console.log(jUser)
       const token = jwt.sign(jUser,'UserToken', { expiresIn:'1h'});
       console.log(token)
       /*var descodificado = jwt.verify(token, 'UserToken');
       console.log(descodificado);*/
        res.status(200).send({token:token})

    }
}
catch(e){
    res.status(500).send({ message: 'error', exception: e})
}

});

////VERIFICA TOKEN PARA INGRESAR A LA RUTA ////
router.post('/index', verifyToken, (req, res)=>{
 jwt.verify(req.token, 'UserToken', (error, authData)=>{
     if(error){
         res.sendStatus(403)
     }else{
         res.json({
             mensaje:"Token verificado correctamente",
             authData
         })
     }
 })
});


//Authorization: Bearer <token> 
//Funcion para verificar si el 
//usuario esta enviando un token para ingresar sino a caducado
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader!=='undefined'){
        const Token=bearerHeader.split(" ")[1];
        req.token = Token; 
        next();    
    }else{
        res.sendStatus(403)

    }

}

module.exports = router;