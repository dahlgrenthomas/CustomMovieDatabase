import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private basUrl = "http://localhost:8080/api/movies"

  constructor(private httpClient: HttpClient) {
  }

  getMovieList(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.basUrl}` + '/featured');
  }

  getMovieById(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.basUrl}/${id}`);
  }

  getMovieBySearch(params: HttpParams): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`${this.basUrl}` + '/moviesearch', {params});
  }
}
