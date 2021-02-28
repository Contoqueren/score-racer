const {
    Race,
    RaceUser
} = require('../models');

const {
    Op
} = require("sequelize");

const raceController = {

    subscribeToTheRace: async (req, res) => {

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

        if (req.session.user) {
            const subscribed = await RaceUser.create({
                race_id: 11,
                user_id: 1
            })
        }

        res.redirect('/');
    }
}

module.exports = raceController