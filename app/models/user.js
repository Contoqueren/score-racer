const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {};

User.init({
    pseudo: Sequelize.STRING,
    password: Sequelize.STRING,
    twitch: Sequelize.STRING,
    avatar: Sequelize.STRING,
    role: Sequelize.STRING,
}, {
    sequelize,
    tableName: "user"
});


module.exports = User;