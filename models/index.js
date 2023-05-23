// import models
const User = require("./User");
const City = require("./City");
const Review = require("./Review");
const Todo = require("./Todo");

//One user has Many Reviews
//one review belongs to one user
//one city has many reviews
//one city has one todo

City.hasOne(Todo,{
  foreignKey: "city_id",
});

Review.belongsTo(City, {
  foreignKey: "city_id",
});

City.hasMany(Review, {
  foreignKey: "city_id",
});
Review.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Review, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  City,
  Review,
  Todo,
};
