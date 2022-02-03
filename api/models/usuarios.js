'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios.init({
    id: DataTypes.INTEGER,
    cuenta: DataTypes.STRING,
    nombre: DataTypes.STRING,
    pass: DataTypes.STRING,
    rol_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};