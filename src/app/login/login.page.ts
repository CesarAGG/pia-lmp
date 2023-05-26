import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  constructor(public auth: AuthService) { }

  login(): void {
    this.auth.loginWithRedirect();
  }
}
