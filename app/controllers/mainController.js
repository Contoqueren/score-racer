const {
    User,
    Race,
    Game,
    RaceUser
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
                    ['date', 'ASC']
                ]
            });

            const users = await User.findAll({
                include: 'scores'
            })

            const isSubscribed = await RaceUser.findOne({
                where: {
                    race_id: race.id,
                    user_id: req.session.user.id || 0
                }
            })

            res.render('home', {
                games,
                race,
                users,
                isSubscribed
            });

        } catch (error) {
            console.log('Error in mainController', error);
        }
    }
}

module.exports = mainController