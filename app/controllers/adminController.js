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
                include: ['users', 'game']
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
    },

    deleteRace: async (req, res) => {
        try {
            const id = req.body.id

            // Suppression d'une race
            const deletedRace = await Race.destroy({
                where: {
                    id: id
                }

            })

            res.redirect('/admin');

        } catch (error) {
            console.log('error in admin', error);
        }
    },

    createGame: async (req, res) => {
        try {
            const name = req.body.name;

            // ajout d'un nouveau jeu
            const newGame = await Game.create({
                name: name,
            })

            res.redirect('/admin');

        } catch (error) {
            console.log('error in admin', error);
        }
    },

    deleteGame: async (req, res) => {
        try {
            const id = req.body.id

            // Suppression d'un jeu
            const deletedGame = await Game.destroy({
                where: {
                    id: id
                }

            })

            res.redirect('/admin');

        } catch (error) {
            console.log('error in admin', error);
        }
    }

}


module.exports = adminController;