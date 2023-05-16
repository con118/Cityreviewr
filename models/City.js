const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class City extends Model {}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    city_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "review",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "city",
  }
);

module.exports = City;
