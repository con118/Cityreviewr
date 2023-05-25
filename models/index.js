const Place = require('./place');
const Review = require('./review');
const Traveller = require('./traveller');

Place.hasMany(Review, {
  foreignKey: 'place_id',
  onDelete: 'CASCADE',
});

Traveller.hasMany(Review, {
  foreignKey: 'traveller_id',
  onDelete: 'CASCADE',
});



Review.belongsTo(Place, {
  foreignKey: 'place_id',
});

Review.belongsTo(Traveller, {
  foreignKey: 'traveller_id',
});

module.exports = { Place, Review, Traveller };
