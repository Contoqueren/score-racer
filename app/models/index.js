const Game = require('./game');
const Race = require('./race');
const Scoring = require('./scoring');
const User = require('./user');
const RaceUser = require('./raceUser')

// Un jeu correspond à plusieurs races
Game.hasMany(Race, {
    foreignKey: "game_id",
    as: "races"
});

// réciproque : une race est liée à un seul jeu
Race.belongsTo(Game, {
    foreignKey: "game_id",
    as: "game"
});

// Un jeu a plusieurs scores
Game.hasMany(Scoring, {
    foreignKey: "game_id",
    as: "scores"
});

// Un score est lié à un seul jeu
Scoring.belongsTo(Game, {
    foreignKey: "game_id",
    as: "game"
});

// Un score est lié à un seul user
Scoring.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

// Un user a plusieurs scores
User.hasMany(Scoring, {
    foreignKey: "user_id",
    as: "scores"
});

// Un user a plusieurs races
User.belongsToMany(Race, {
    as: "races",
    through: "user_participate_race",
    foreignKey: "user_id",
    otherKey: "race_id"
});

// Une race a plusieurs users
Race.belongsToMany(User, {
    as: "users",
    through: "user_participate_race",
    foreignKey: "race_id",
    otherKey: "user_id"
});

// Mise en place de la table de liaison race/user
RaceUser.belongsTo(Race, {
    foreignKey: 'race_id'
});

RaceUser.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(RaceUser, {
    foreignKey: 'user_id'
})

Race.hasMany(RaceUser, {
    foreignKey: 'race_id'
})

module.exports = {
    Game,
    Race,
    Scoring,
    User,
    RaceUser
};