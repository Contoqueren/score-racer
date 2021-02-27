const {
    User,
    Race,
    Game
} = require('../models');

const {
    Op
} = require("sequelize");

const mainController = {
    home: async (req, res) => {
        try {
            const games = await Game.findAll();

            const race = await Race.findOne({
                include: ['users', 'game'],
                where: {
                    date: {
                        [Op.gt]: Date.now()
                    }
                },
                order: [
                    ['date', 'DESC']
                ]
            });

            const users = await User.findAll({
                include: 'scores'
            })

            res.render('home', {
                games,
                race,
                users
            });

        } catch (error) {
            console.log('Error in mainController', error);
        }
    }
}

module.exports = mainController