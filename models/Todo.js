const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Todo extends Model {}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    things_todo1: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    things_todo2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    things_todo3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    things_todo4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    things_todo5: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "city",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "todo",
  }
);

module.exports = Todo;
