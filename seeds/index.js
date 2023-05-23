const sequelize = require("../config/connection");
const { City, User, Review, Todo } = require("../models");

const citySeedData = require("./city-seeds.json");
const userSeedData = require("./user-seeds.json");
const reviewSeedData = require("./review-seeds.json");
const todoSeedData = require("./things-todo-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await City.bulkCreate(citySeedData, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Review.bulkCreate(reviewSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Todo.bulkCreate(todoSeedData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
