const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(

{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    review_text: {
        type: DataTypes.STRING
    },
    rate: {
        type: DataTypes.INTEGER
    },
   
   traveller_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'traveller',
            key: 'id',
        }
    },
    
    place_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'place',
            key: 'id',
        }
    }

},
{   sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review'
  }
);

module.exports = Review;