'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class politicas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* muchos a muchos*/
      politicas.belongsToMany(models.roles, {through:"roles_politicas",foreignKey:"politica_id"})
     
    }
  }
  politicas.init({
    politicas: DataTypes.STRING
  }, {
    sequelize,
   
    modelName: 'politicas',
  });
  return politicas;
};