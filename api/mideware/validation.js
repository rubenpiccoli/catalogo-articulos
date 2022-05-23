function validate(validation){
    return(req,res,next)=>{
        try{
            validation(req.body);
            next();
        }catch(error){
            
            next(error);

        }
    }
}

function validationLogin(data){
const {cuenta, pass} = data;
if(cuenta == '' || cuenta == null){
    throw new Error( 'debe contenter usuario');
};
if(pass == '' || pass==null ){
    throw new Error( 'debe contener password');
};

}
module.exports = {validate, validationLogin,};