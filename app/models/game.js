const Sequelize = require('sequelize');
const sequelize = require('../database');

class Game extends Sequelize.Model {};

Game.init({
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    time_wr: Sequelize.TIME,
    time_200: Sequelize.TIME,
    time_100: Sequelize.TIME,
}, {
    sequelize,
    tableName: "game"
});


module.exports = Game;