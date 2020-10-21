import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-addactormovie',
  templateUrl: './addactormovie.component.html',
  styleUrls: ['./addactormovie.component.css']
})
export class AddactormovieComponent implements OnInit {
  actorsDB: any[] = [];
  fullName: string = "";
  bYear: number = 0;

  moviesDB: any[] = [];
  title: string = "";
  actors: any[] = [];
  year: number = 0;

  actorId: string = "";
  movieId: string = "";
  listActor = 0;

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
  }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
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
      this.router.navigate(["/listmovies"]);
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

}
