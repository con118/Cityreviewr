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
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    things_todo: {
      type: DataTypes.STRING,
      allowNull: false,
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
