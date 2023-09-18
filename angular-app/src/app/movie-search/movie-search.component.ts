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

export class MovieSearchComponent implements OnInit{

  movies: Movie[] = [];
  private routeSub: Subscription = new Subscription;
  movieSearch: string = "";

  years: number[] = [];

  constructor(public movieService: MovieService, private router: Router, private route: ActivatedRoute, public accountService: AccountService, private userService: UserService,
    private formBuilder: FormBuilder) {
    for (let i = 1900; i <= 2023; i++) {
      this.years.push(i);
    }

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        let myParams = new HttpParams();


        if (params[("movie")] != undefined ) {
          myParams = myParams.set("movie", '' + params[("movie")]);
        }

        if (params[("year")] != undefined){
          myParams = myParams.set("year", '' + params[("year")]);
        }

        if (params[("genre")] != undefined ){
          myParams = myParams.set("genre", '' + params[("genre")]);
        }


      this.getMovieSearch(myParams);
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
    this.router.navigate(['search'], { queryParams: { "movie": this.searchForm.value.title, "year": this.searchForm.value.year, "genre": this.searchForm.value.genre } });
  }

  removeFromUserList(id: number) {
    this.userService.removeFromList(id).subscribe(data => {
      this.accountService.getUserMovieListIds();
    });
  }

  public openMovie(id: number) {
    this.router.navigate(['movies/' + id]);
  }

  public addToUserList(id: number) {
    this.userService.addToList(id).subscribe(data => {
      this.accountService.getUserMovieListIds();
    });
  }

  public getMovieSearch(params: HttpParams) {
    this.movieService.getMovieBySearch(params).subscribe(data => {
      this.movies = data;
    });
  }

}
