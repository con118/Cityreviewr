const sequelize = require("../config/connection");
const fs = require("fs");
const { City, User, Review } = require("../models");

const citySeedData = require("./city-seeds.json");
const userSeedData = require("./user-seeds.json");
const reviewSeedData = require("./review-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const data = JSON.parse(fs.readFileSync("./seeds/city-seeds.json", "utf8"));

  for (let i = 0; i < data.length; i++) {
    await City.create(data[i]);
  }

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Review.bulkCreate(reviewSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
