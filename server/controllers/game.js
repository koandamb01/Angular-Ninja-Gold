const Game = require('../models/models');

module.exports = {
    newGame: (req, res) => {
        Game.create(req.body, (err, game) => {
            if (err) {
                let data = {}
                for (let key in err.errors) {
                    data[key] = err.errors[key].message;
                }
                res.json({ status: false, message: data });
            } else {
                res.json({ status: true, game: game });
            }
        })
    },
    getGame: (req, res) => {
        Game.findOne({ userName: req.params.userName }, (err, game) => {
            if (err) {
                let data = {}
                for (let key in err.errors) {
                    data[key] = err.errors[key].message;
                }
                res.json({ status: false, message: data });
            } else if (game == null) {
                res.json({ status: false, message: { userName: "*Game name doesn't exist!" } });
            }
            else {
                res.json({ status: true, game: game });
            }
        })
    },
    updateScore: (req, res) => {
        Game.findOneAndUpdate({ _id: req.body._id }, { $set: { score: req.body.score } }, (err, game) => {
            if (err) {
                let data = {}
                for (let key in err.errors) {
                    data[key] = err.errors[key].message;
                }
                res.json({ status: false, message: data });
            } else {
                res.json({ status: true, game: game });
            }
        })
    },

    topThree: (req, res) => {
        Game.find({}).limit(3).sort({ 'score': -1 }).exec((err, games) => {
            if (err) {
                let data = {}
                for (let key in err.errors) {
                    data[key] = err.errors[key].message;
                }
                res.json({ status: false, message: data });
            } else {
                res.json({ status: true, games: games });
            }
        });
    },
}