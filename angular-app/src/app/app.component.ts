import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  constructor(public accountService: AccountService, private router: Router) {

  }

  ngOnInit(): void {
    this.accountService.getLoggedInStatus();
  }
  public getMovie(movie: string) {
    if (movie != "") {
      let params = new HttpParams()
        .set("movie", movie);
      this.router.navigate(['movies/search', {params}]);
    }
  }
}
