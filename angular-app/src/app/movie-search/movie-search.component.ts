import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../movie.model';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { UserService } from '../services/user.service';
import { HttpParams } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})

export class MovieSearchComponent implements OnInit {


  movies: Movie[] | undefined;
  private routeSub: Subscription = new Subscription;
  movieSearch: string = "";


  constructor(public movieService: MovieService, private router: Router, private route: ActivatedRoute, public accountService: AccountService, private userService: UserService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(param => {
      let params = new HttpParams()
        .set("movie", '' + param["movie"])
;

      this.getMovieSearch(params);
    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


  searchForm = this.formBuilder.group({
    title: '',
    year: '',
    genre: ''

  });

  public onSubmit(): void {
    let params = new HttpParams()
    .set("movie", '' + this.searchForm.value.title)
    .set("year", '' + this.searchForm.value.year)
    .set("genre", '' + this.searchForm.value.genre);

    console.log(params.toString());

    this.movieService.getMovieBySearch(params).subscribe(data => {

      this.movies = data;
    });

  }


  public openMovie(id: number) {
    this.router.navigate(['movies/' + id]);
  }

  public addToUserList(id: number) {
    this.userService.addToList(id).subscribe(data => {

    });
  }

  public getMovies() {
    let params = new HttpParams();
    params = params.append("movie", this.movieSearch)
    this.movieService.getMovieBySearch(params).subscribe(data => {

      this.movies = data;
    });
  }
  public getMovieSearch(params: HttpParams) {

    this.movieService.getMovieBySearch(params).subscribe(data => {
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
