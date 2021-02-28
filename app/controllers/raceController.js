const {
    Race,
    RaceUser
} = require('../models');

const {
    Op
} = require("sequelize");

const raceController = {

    subscribeToTheRace: async (req, res) => {

        if (req.session.user) {

            const isSubscribed = await RaceUser.findOne({
                where: {
                    race_id: req.body.subscribe,
                    user_id: req.session.user.id
                }
            })

            if (isSubscribed) {
                return res.redirect('/');
            }

            const subscribed = await RaceUser.create({
                race_id: req.body.subscribe,
                user_id: req.session.user.id
            })

            const theRace = await Race.findByPk(req.body.subscribe);

            const newPlayerNumber = theRace.player_number + 1;

            const changePlayerNumber = await Race.update({
                    player_number: newPlayerNumber
                }, {
                    where: {
                        id: req.body.subscribe
                    }
                }

            )
        }

        res.redirect('/');
    }
}

module.exports = raceController