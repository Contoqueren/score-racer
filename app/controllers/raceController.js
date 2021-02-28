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
            });

            if (isSubscribed) {
                return res.redirect('/');
            };

            const subscribed = await RaceUser.create({
                race_id: req.body.subscribe,
                user_id: req.session.user.id
            });

            const theRace = await Race.findByPk(req.body.subscribe);

            const newPlayerNumber = theRace.player_number + 1;

            const changePlayerNumber = await Race.update({
                    player_number: newPlayerNumber
                }, {
                    where: {
                        id: req.body.subscribe
                    }
                }

            );
        };

        res.redirect('/race/' + req.body.subscribe);
    },

    unsubscribeToTheRace: async (req, res) => {

        if (req.session.user) {

            const isSubscribed = await RaceUser.findOne({
                where: {
                    race_id: req.body.unsubscribe,
                    user_id: req.session.user.id
                }
            });

            if (!isSubscribed) {
                return res.redirect('/');
            };

            const unsubscribed = await RaceUser.destroy({
                where: {
                    race_id: req.body.unsubscribe,
                    user_id: req.session.user.id
                }
            });

            const theRace = await Race.findByPk(req.body.unsubscribe);

            const newPlayerNumber = theRace.player_number - 1;

            const changePlayerNumber = await Race.update({
                    player_number: newPlayerNumber
                }, {
                    where: {
                        id: req.body.unsubscribe
                    }
                }

            );
        };

        res.redirect('/race/' + req.body.unsubscribe);
    },

    raceById: async (req, res) => {
        const {
            id
        } = req.params;

        const race = await Race.findByPk(id, {
            include: ['game', {
                association: 'users',
                include: 'scores'
            }]
        });

        const isSubscribed = await RaceUser.findOne({
            where: {
                race_id: race.id,
                user_id: req.session.user.id || 0
            }
        });

        res.render('race', {
            race,
            isSubscribed
        });
    }
}

module.exports = raceController