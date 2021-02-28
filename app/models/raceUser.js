const Sequelize = require('sequelize');
const sequelize = require('../database');

class RaceUser extends Sequelize.Model {};

RaceUser.init({
    time: Sequelize.TIME,
    place: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: "user_participate_race"
});

module.exports = RaceUser;