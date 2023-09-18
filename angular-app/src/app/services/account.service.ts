import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isLoggedIn = false;

  public userMovieIds: number[] = [];

  private basUrl = "http://localhost:8080/api/user"

  constructor(private httpClient: HttpClient) {
  }

  getLoggedInStatus(): void {
    this.httpClient.get<Boolean>(`${this.basUrl}` + '/loggedstatus').subscribe(data => {
        if(data == true){
          this.getUserMovieListIds();
          this.isLoggedIn = true;
        }
        else{
          this.isLoggedIn = false;
        }

    });
  }
  getUserMovieListIds(): void {
    this.httpClient.get<number[]>(`${this.basUrl}` + '/usermovies').subscribe(data => {
      this.userMovieIds = data;
    });
  }


}
