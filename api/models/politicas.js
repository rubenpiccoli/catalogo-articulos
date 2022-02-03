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
      // define association here
    }
  }
  politicas.init({
    id: DataTypes.INTEGER,
    politicas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'politicas',
  });
  return politicas;
};