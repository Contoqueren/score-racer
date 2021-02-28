const {
    User
} = require('../models');
const bcrypt = require('bcrypt');

const userController = {
    loginForm: (request, response) => {
        response.render('login');
    },

    handleLoginForm: async (request, response) => {
        try {
            //on cherche à identifier le user à partir de son pseudo
            const pseudo = request.body.pseudo;
            const user = await User.findOne({
                where: {
                    pseudo
                }
            })

            //si aucun user touvé avec ce pseudo => message d'erreur
            if (!user) {
                return response.render('login', {
                    error: 'Pseudo ou mot de passe incorrect'
                });
            }


            //le user avec ce pseudo existe, on vérifie son mot de passe en comparant :
            //- la version en clair saisie dans le formulaire
            //- la version hachée stockée en BDD
            //bcrypt est capable de déterminer si les 2 version du mot de passe correcpondent
            const validPwd = bcrypt.compareSync(request.body.password, user.password);

            if (!validPwd) {
                //la vérification a échoué, on envoie un message d'erreur
                return response.render('login', {
                    error: 'Pseudo ou mot de passe incorrect'
                });
            }


            //le user existe et s'est correctement identifié, on stocke les infos qui vont bien dans la session

            request.session.user = {
                id: user.id,
                pseudo: user.pseudo,
                twitch: user.twitch,
                avatar: user.avatar,
                role: user.role
            };

            console.log(request.session.user.pseudo, request.session.user.twitch, request.session.user.role);

            if (request.body.remember) {
                //l'utilisateur a coché la case 'se souvenir de moi'
                //on ajoute une heiure de validité à sa session
                //il peut ainsi quitter son navigateur et revenir sur la page, il devrait rester connecté
                //on indique en date d'expiration la date courante + une heure (en millisecondes)
                request.session.cookie.expires = new Date(Date.now() + 3600000);
            }

            response.redirect('/');
        } catch (error) {
            console.log(error);
        }

    },

    signupForm: (request, response) => {
        response.render('signup');
    },

    handleSignupForm: async (request, response) => {
        try {

            //on checke si un utilisateur existe déjà avec ce pseudo
            const user = await User.findOne({
                where: {
                    pseudo: request.body.pseudo
                }
            });
            if (user) {
                //il y a déjà un utilisateur avec ce pseudo, on envoie une erreur
                return response.render('signup', {
                    error: 'Un utilisateur avec ce pseudo existe déjà'
                });
            }

            //on checke si le password et la vérif sont bien identiques
            if (request.body.password !== request.body.passwordConfirm) {
                return response.render('signup', {
                    error: 'La confirmation du mot de passe est incorrecte'
                });
            }
            //on hache le password
            const hashedPwd = bcrypt.hashSync(request.body.password, 10)


            //on inscrit le nouveau user en BDD

            await User.create({
                pseudo: request.body.pseudo,
                password: hashedPwd,
                twitch: request.body.twitch,
            });
            response.redirect('/login');
        } catch (error) {
            console.log(error);
        }
    },

    logout: (request, response) => {
        //on reset des infos du user en session
        request.session.user = false;
        //on redirige sur la page d'accueil
        response.redirect('/');
    }
};

module.exports = userController