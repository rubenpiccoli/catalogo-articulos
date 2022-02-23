'use strict';
const {
  Model
} = require('sequelize');
const roles = require('./roles');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usuarios.belongsTo(models.roles, {as:"roles", foreignKey:"rol_id"});

     

    }
  }
  usuarios.init({
    cuenta:{
    type: DataTypes.STRING,
    
    validate:{
      isEmail:{
        args:true,
        msg:"Tiene que ser un correo Valido"
      },
      
    },
    
    
    
  },

    nombre:{ 
      type: DataTypes.STRING,
      allowNull:false,
    validate:{
      notNull:{
         msg:"el campo no puede estar vacio"
      },
      isAlpha:{
         /* solo letras */
         args: true,
         msg:"el nombre solo puede contener letras"
      },
      len:{
        args:[3,150],
        msg:"El nombre de contener 3 a 150 caracteres"
      },
    },
    },
    pass: DataTypes.STRING,
    rol_id: DataTypes.INTEGER,
   
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};