import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../movie.model';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {



  movie: Movie = new Movie;
  private routeSub: Subscription = new Subscription;
  id: number = 0;

  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) {

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

  private getMovie() {
    this.movieService.getMovieById(this.id).subscribe(data => {
      this.movie = data;
    });
  }

  updateMovie(id: number) {
    this.router.navigate(['all', id]);
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(data => {
      console.log(data);
      this.getMovie();
    });
  }
}
