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

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.basUrl}`+'/all');
  }

  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}` + '/add', user, { responseType: 'text' });
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.basUrl}/${id}`);
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

  updateUser(id: number, user: User): Observable<Object> {
    return this.httpClient.put(`${this.basUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.basUrl}/${id}`);
  }


}
