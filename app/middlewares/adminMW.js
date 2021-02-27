const adminMW = (request, response, next) => {
    //est-ce que l'utilisateur est connecté
    if (!request.session.user) {
        //pas connecté : on le redirige vers la page login
        return response.redirect('/login');
    }
    //est-ce que l'utilisateur a le role admin
    if (request.session.user.role !== 'admin') {
        //si pas admin, on affiche la vue 403
        return response.status(403).render('403');
    }
    //sinon on appelle next
    next();
}

module.exports = adminMW;