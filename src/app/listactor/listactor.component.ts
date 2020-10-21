import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";


@Component({
  selector: "app-listactor",
  templateUrl: "./listactor.component.html",
  styleUrls: ["./listactor.component.css"],
})
export class ListactorComponent implements OnInit {
  actorsDB: any[] = [];

  constructor(private dbService: DatabaseService) { }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  ngOnInit() {
    this.onGetActors();
    console.log("Hi From ListActors ngIOnit");
  }
}
