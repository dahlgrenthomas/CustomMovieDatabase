import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { Movie } from '../movie.model';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] | undefined;

  constructor(private movieService: MovieService, private router: Router, private userService: UserService, public accountService: AccountService) {

  }

  ngOnInit(): void {
    this.getMovies();
  }

  public openMovie(id: number) {
    this.router.navigate(['movies/' + id]);
  }

  private getMovies() {
    this.movieService.getMovieList().subscribe(data => {
      this.movies = data;
    });
  }

  public addToUserList(id: number) {
    this.userService.addToList(id).subscribe(data => {

    });
  }

  updateMovie(id: number) {
    this.router.navigate(['all', id]);
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(data => {
      console.log(data);
      this.getMovies();
    });
  }



}
