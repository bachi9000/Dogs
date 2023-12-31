const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperaments', {
    name: {
      type: DataTypes.STRING,
      primaryKey:true,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
    },
  },
    {timestamps:false})
};
