import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';

const routes: Routes = [
  { path: 'demo', component: UserListComponent },
  { path: 'movies', component: MovieListComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'update-user/:id', component: UserUpdateComponent },
  { path: 'movies/:id', component: MovieInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
