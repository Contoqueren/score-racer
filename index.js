  //on charge les variables d'environnement
  require('dotenv').config();

  const express = require('express');
  const router = require('./app/router');
  const session = require('express-session');

  const userMW = require('./app/middlewares/userMW');

  const app = express();
  //on utilise la variable d'environnement PORT pour attribuer un port à notre appli express
  //En cas de pépin, on se rabat sur une valeur par défaut
  const PORT = process.env.PORT || 4000;

  //configuration pour utiliser EJS comme moteur de templates
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  //on ajoute les ressources statiques du projet
  //on ne va pas utiliser les fichiers html fournis mais des vues ejs
  //le middleware static servira uniquement pour les fichiers css
  app.use(express.static('./integration/css'));

  //mise en place du système de sessions pour stocker les infos utilisateur
  app.use(session({
      secret: "contos",
      resave: true,
      saveUninitialized: true
  }));

  //on veut utiliser notre middleware maison pour initialiser user en session à chaque requête
  app.use(userMW);


  //on va devoir gérer des données en POST
  //on ajoute le middleware urlencoded pour récupérer les infos dans request.body
  app.use(express.urlencoded({
      extended: true
  }));

  app.use(router);


  //on lance le serveur
  app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
  });