import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../movie.model';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {



  movie: Movie = new Movie;
  private routeSub: Subscription = new Subscription;
  id: number = 0;

  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute, public accountService: AccountService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getMovie();
    });

  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  public addToUserList(id: number) {
    this.userService.addToList(id).subscribe(data => {
      this.accountService.getUserMovieListIds();
    });
  }

  removeFromUserList(id: number) {
    this.userService.removeFromList(id).subscribe(data => {
      this.accountService.getUserMovieListIds();
    });
  }

  getMovie() {
    this.movieService.getMovieById(this.id).subscribe(data => {
      this.movie = data;
    });
  }
}
