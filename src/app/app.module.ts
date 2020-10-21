import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListactorComponent } from './listactor/listactor.component';
import { AddactorComponent } from './addactor/addactor.component';
import { UpdateactorComponent } from './updateactor/updateactor.component';
import { DeleteactorComponent } from './deleteactor/deleteactor.component';
import { RouterModule, Routes } from '@angular/router';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ListmovieComponent } from './listmovie/listmovie.component';
import { AddactormovieComponent } from './addactormovie/addactormovie.component';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes: Routes = [
  { path: "listactors", component: ListactorComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "listmovies", component: ListmovieComponent },
  { path: "addmovie", component: AddmovieComponent },
  { path: "addactormovie", component: AddactormovieComponent },
  { path: "deletemovie", component: DeletemovieComponent },
  { path: "", redirectTo: "/listactors", pathMatch: "full" },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    ListactorComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    AddmovieComponent,
    DeletemovieComponent,
    ListmovieComponent,
    AddactormovieComponent,
    NotfoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }), BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
