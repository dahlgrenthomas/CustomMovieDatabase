import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  constructor(public accountService: AccountService, private router: Router, public matIcon: MatIconModule) {

  }

  ngOnInit(): void {
    this.accountService.getLoggedInStatus();
  }
  public getMovie(movie: string) {
    if (movie != "") {
      this.router.navigate(['search'], { queryParams: { "movie": movie} });
    }
  }
}
