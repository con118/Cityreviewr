// import models
const User = require("./User");
const City = require("./City");
const Review = require("./Review");

//One user has Many Reviews
//one review belongs to one user
//one city has many reviews
//

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
};
