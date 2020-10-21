const mongoose = require('mongoose');
const Actor = require('../models/actor');
const movie = require('../models/movie');
const Movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    deleteOneAndMovies: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err, data) {
            if (err) return res.status(400).json(err);
            if (!data) return res.status(404).json();

            if (data) {
                let movieIds = [];
                for (let movie of data.movies) {
                    let data = mongoose.Types.ObjectId(movie);
                    movieIds.push(data);
                }
                console.log(movieIds);
                Movie.deleteMany({ _id: { $in: movieIds } }, function (err, result) {
                    if (err) return res.status(400).json(err);
                    res.json(result);
                });
            }
        });
    },
    removeMovie: function (req, res) {
        let actorId = req.params.aid;
        let movieId = req.params.mid;

        console.log(actorId);
        console.log(movieId);

        Actor.findByIdAndUpdate({ _id: actorId }, { $pull: { movies: movieId } }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            res.json(actor);
        });

    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    }
};