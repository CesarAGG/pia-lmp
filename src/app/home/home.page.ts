import { Component } from '@angular/core';
import { CrudService } from '../crud.service';
import { Materia } from '../interfaces';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  materias$: Observable<Materia[]>;
  isLoggedIn = false;

  constructor(private crud: CrudService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      if (isAuthenticated) {
        this.materias$ = this.crud.getAllMaterias() as Observable<Materia[]>;
      }
    });
  }
}
