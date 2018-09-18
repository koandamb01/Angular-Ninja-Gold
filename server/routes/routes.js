const Game = require('../controllers/game');

module.exports = (app) => {

    app.post('/game', (req, res) => {
        Game.newGame(req, res);
    });

    app.get('/game/:userName', (req, res) => {
        Game.getGame(req, res);
    });

    app.put('/update', (req, res) => {
        Game.updateScore(req, res);
    });

    app.get('/topthree', (req, res) => {
        Game.topThree(req, res);
    });

}
