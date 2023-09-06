import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  constructor(public accountService: AccountService) {

  }

  ngOnInit(): void {
    this.accountService.getLoggedInStatus();
  }
}
