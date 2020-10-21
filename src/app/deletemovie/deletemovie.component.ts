import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {
  moviesDB: any[] = [];
  title: string = "";
  actors: any[] = [];
  year: number = 0;

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.onGetMovies();
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.router.navigate(["/listmovies"]);
    });
  }

}
