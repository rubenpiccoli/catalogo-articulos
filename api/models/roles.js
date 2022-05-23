'use strict';
const {
  Model
} = require('sequelize');
const roles_politicas = require('./roles_politicas');
const usuarios = require('./usuarios');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    roles.hasMany(models.usuarios,{as: "roles", foreignKey:"rol_id" });
    roles.belongsToMany(models.politicas, {through:"roles_politicas", foreignKey:"rol_id"});
    
    }
  }
  roles.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      references: {
        model: roles_politicas, 
        foreignKey: 'rol_id'
      }
    },
    
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
     /* Unique: true*/
    },
   
  }, {
    sequelize,
   
    modelName: 'roles',
  });
  return roles;
};