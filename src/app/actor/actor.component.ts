import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;

  moviesDB: any[] = [];
  title: string = "";
  actors: any[] = [];
  year: number = 0;

  actorId: string = "";
  movieId: string = "";
  listActor = 0;

  constructor(private dbService: DatabaseService) { }
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  //Get all movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Add a movie
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete a movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete movie/s before aYear
  onDeleteMovieYear() {
    this.dbService.deleteMovieYear(this.year).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Actor selection
  actorSelect(item) {
    this.actorId = item._id;
    this.fullName = item.name;
  }

  //Movie selection
  movieSelect(item) {
    this.movieId = item._id;
    this.title = item.title;
  }

  //Add Actor to Movie
  onAddActorMovie() {
    this.dbService.addActorMovie(this.movieId, this.actorId).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Show actor to list of movies
  onListActors(movie) {
    this.listActor = 1;
    this.title = movie.title;
    this.actors = [];
    for (let i = 0; i < movie.actors.length; i++) {
      this.actors.push(movie.actors[i].name)
    }
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.title = "";
    this.year = 0;
    this.actors = [];
    this.movieId = "";
    this.listActor = 0;
  }
}