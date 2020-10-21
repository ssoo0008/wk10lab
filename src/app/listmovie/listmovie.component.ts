import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-listmovie',
  templateUrl: './listmovie.component.html',
  styleUrls: ['./listmovie.component.css']
})
export class ListmovieComponent implements OnInit {
  moviesDB: any[] = [];
  actors: any[] = [];

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.onGetMovies();
  }

  onListActors(movie) {
    this.actors = [];
    for (let i = 0; i < movie.actors.length; i++) {
      this.actors.push(movie.actors[i].name)
    }
    return this.actors;
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

}
