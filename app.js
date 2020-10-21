const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const path = require('path');
const app = express();

app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/movies', actors.deleteOneAndMovies);
app.delete('/actors/:aid/:mid', actors.removeMovie);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/year/:y', movies.deleteBeforeYear);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:mid/:aid', movies.removeActor);
app.put('/movies/:mid/:aid', movies.addActor);
app.get('/movies/:y1/:y2', movies.getBwYears);
app.delete('/movies', movies.deleteBwYears);
app.get('/showactors/movie/:rate', movies.getActorsByRate);