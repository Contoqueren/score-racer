const Sequelize = require('sequelize');
const sequelize = require('../database');

class Scoring extends Sequelize.Model {};

Scoring.init({
    score: Sequelize.FLOAT,
}, {
    sequelize,
    tableName: "scoring"
});


module.exports = Scoring;