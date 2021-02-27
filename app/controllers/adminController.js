const {
    Race,
    User,
    Game,
    Scoring
} = require('../models');

const adminController = {

    adminPage: async (req, res) => {
        try {

            //La page admin renvoie toutes les races, tous les users, et tous les jeux
            const races = await Race.findAll({
                include: 'users'
            })
            const users = await User.findAll({
                include: 'scores'
            });
            const games = await Game.findAll();

            res.render('admin', {
                races,
                users,
                games
            })

        } catch (error) {
            console.log('error in admin', error);
        }
    },

    createRace: async (req, res) => {
        try {
            const date = req.body.date;

            let random = Math.floor(Math.random() * 10 + 21);

            // création d'une nouvelle race
            const newRace = await Race.create({
                date: date,
                player_number: 0,
                game_id: random
            })

            res.redirect('/admin');

        } catch (error) {
            console.log('error in admin', error);
        }
    }

}


module.exports = adminController;