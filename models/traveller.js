const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Traveller extends Model {}

Traveller.init(

{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    traveller_name: {
        type: DataTypes.STRING(30)
    },
  
    traveller_email: {
        type: DataTypes.STRING(30)
    },
    young_parent: {
        type: DataTypes.BOOLEAN
    },
    senior: {
        type: DataTypes.BOOLEAN
    },
},
{   sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'traveller'
  }
);

module.exports = Traveller;