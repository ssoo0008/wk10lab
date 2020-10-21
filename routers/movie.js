var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
const actor = require('../models/actor');

module.exports = {
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndDelete({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    removeActor: function (req, res) {
        let movieId = req.params.mid;
        let actorId = req.params.aid;

        Movie.findOneAndUpdate({ _id: movieId }, { $pull: { actors: actorId } }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },
    addActor: function (req, res) {
        let movieId = req.params.mid;
        let actorId = req.params.aid;

        Movie.findOneAndUpdate({ _id: movieId }, { $push: { actors: actorId } }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },
    getBwYears: function (req, res) {
        let year1 = req.params.y1;
        let year2 = req.params.y2;

        Movie.where('year').gte(year2).lte(year1).exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    },
    deleteBwYears: function (req, res) {
        let year1 = req.body.y1;
        let year2 = req.body.y2;

        console.log(year1 + '/ ' + year2);

        Movie.where('year').gte(year2).lte(year1).exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            let movieId = [];

            for (let i in movie) {
                let data = mongoose.Types.ObjectId(movie[i]._id);
                movieId.push(data);
            }

            console.log(movieId);

            Movie.deleteMany({ _id: { $in: movieId } }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
        });
    },
    deleteBeforeYear: function (req, res){
        let year = req.params.y;
        console.log('delete');
        Movie.deleteMany({'year': {$lte: year}}, function (err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    getActorsByRate: function (req, res) {
        let movieRate = req.params.rate;

        Movie.find({ 'rating': movieRate }, 'actors').populate('actors').exec(function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);

        });

        // Movie.where({ rating: movieRate }).exec(function (err, movie) {
        //     if (err) return res.status(400).json(err);
        //     if (!movie) return res.status(404).json();


        //     let movieId = [];

        //     for (let i in movie) {
        //         let data = mongoose.Types.ObjectId(movie[i]._id);
        //         movieId.push(data);
        //     }

        //     console.log(movieId);

        //     Actor.where({ movies: { $in: movieId } }).exec(function (err, actor) {
        //         if (err) return res.status(400).json(err);
        //         if (!actor) return res.status(404).json();
        //         res.json(actor);
        //     });

        // });

    }
};