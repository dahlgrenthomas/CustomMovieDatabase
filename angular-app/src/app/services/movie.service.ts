import { HttpClient } from '@angular/common/http';
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

  createMovie(movie: Movie): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}` + '/add', movie, { responseType: 'text' });
  }

  getMovieById(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.basUrl}/${id}`);
  }

  // updateMovie(id: number, movie: Movie): Observable<Object> {
  //   return this.httpClient.put(`${this.basUrl}/${id}`, Movie);
  // }

  deleteMovie(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.basUrl}/${id}`);
  }
  getMovieBySearch(movie: string): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`${this.basUrl}` + '/moviesearch' +`/${movie}`);
  }
}
