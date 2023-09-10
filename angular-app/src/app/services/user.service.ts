import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { Movie } from '../movie.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basUrl = "http://localhost:8080/api/user"

  constructor(private httpClient: HttpClient) {
  }


  addToList(id: number): Observable<Object> {
    return this.httpClient.get<User>(`${this.basUrl}/` + 'movieadd/' + `${id}`);
  }

  getUserMovies(): Observable<Movie[]>{
    return this.httpClient.get<Movie[]>(`${this.basUrl}` + '/userlist');
  }

  removeFromList(id: number){
    return this.httpClient.delete(`${this.basUrl}/` + 'removefromlist/' + `${id}`);
  }


}
