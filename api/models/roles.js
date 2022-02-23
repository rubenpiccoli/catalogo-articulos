'use strict';
const {
  Model
} = require('sequelize');
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
    roles.belongsToMany(models.politicas, {through:"roles_politicas",uniqueKey: 'id'});
    
    }
  }
  roles.init({
    rol: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};