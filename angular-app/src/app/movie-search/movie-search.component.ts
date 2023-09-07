import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../movie.model';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {


  movies: Movie[] | undefined;
  private routeSub: Subscription = new Subscription;
  movieSearch: string = "";

  constructor(public movieService: MovieService, private router: Router, private route: ActivatedRoute, public accountService: AccountService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.movieSearch = params['movie'];
      this.getMovies();
    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  public openMovie(id: number) {
    this.router.navigate(['movies/' + id]);
  }
  public addToUserList(id: number) {
    this.userService.addToList(id).subscribe(data => {

    });
  }

  public getMovies() {
    this.movieService.getMovieBySearch(this.movieSearch).subscribe(data => {
      this.movies = data;
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
