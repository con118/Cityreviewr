const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Place extends Model {}

Place.init(

{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    place_name: {
        type: DataTypes.STRING
    },
    place_url: {
        type: DataTypes.STRING
    },
    place_type: {
        type: DataTypes.STRING
    }
},
{   sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'place'
  }
);

module.exports = Place;