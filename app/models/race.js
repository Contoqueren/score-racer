const Sequelize = require('sequelize');
const sequelize = require('../database');

class Race extends Sequelize.Model {};

Race.init({
    date: Sequelize.DATE,
    player_number: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: "race"
});


module.exports = Race;