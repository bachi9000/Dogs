const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dogs', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,  
    },
    image:{
      type: DataTypes.STRING,
      
    },
    height:{
      type: DataTypes.STRING,
      
    },
    weight:{
      type: DataTypes.STRING,
      
    },
    life_span:{
      type: DataTypes.STRING,
      
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
    
  },
    {timestamps:false})
};
