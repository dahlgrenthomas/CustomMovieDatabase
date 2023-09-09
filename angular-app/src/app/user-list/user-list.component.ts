import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user.model';
import { Movie } from '../movie.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  movies: Movie[] | undefined;

  constructor(private userService: UserService, private router: Router, public accountService: AccountService) {

  }

  ngOnInit(): void {
    this.accountService.getLoggedInStatus();
    this.getUserMovies();
  }
  public openMovie(id: number) {
    this.router.navigate(['movies/' + id]);
  }

  private getUserMovies() {
    this.userService.getUserMovies().subscribe(data => {
      this.movies = data;
    });
  }
  removeFromUserList(id: number){
    this.userService.removeFromList(id).subscribe(data => {
      this.accountService.getUserMovieListIds();
      this.getUserMovies();

    });

  }

  updateUser(id: number) {
    this.router.navigate(['all', id]);
  }

  // deleteUser(id: number) {
  //   this.userService.deleteUser(id).subscribe(data => {
  //     console.log(data);
  //     this.getUsers();
  //   });
  // }
}
