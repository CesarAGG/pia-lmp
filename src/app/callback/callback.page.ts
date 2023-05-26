import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.handleRedirectCallback().subscribe(() => {
      this.router.navigate(['/home']); // Redirect to the home page or any desired route
    });
  }

}
