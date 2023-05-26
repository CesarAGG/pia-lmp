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

  // all the code below is for testing and should be removed before production
  materiaId: string;
  testMateria = {
    userId: 'testUserId',
    id: 'adsdasdadasd',
    salon: 'Salon 1',
    pase: 70,
    nombre: 'Materia 1',
    profe: 'Profe 1',
    horario: 'Horario 1',
    evaluaciones: [
      {
        nombre: 'Evaluacion 1',
        tipo: 'Tipo 1',
        ptObtenidos: 1,
        ptPosibles: 1,
        completado: true
      },
      {
        nombre: 'Evaluacion 2',
        tipo: 'Tipo 2',
        ptObtenidos: 16,
        ptPosibles: 20,
        completado: true
      },
      {
        nombre: 'Evaluacion 3',
        tipo: 'Tipo 3',
        ptObtenidos: 0,
        ptPosibles: 10,
        completado: false
      }
    ]
  };

  // test functions

  postDataToAPI() {
    this.crud.createMateria(this.testMateria).subscribe(
      data => {
        console.log(data); // Handle the response data
      },
      error => {
        console.error(error); // Handle any errors
      }
    );
  }

  getDataFromAPI() {
    this.crud.getAllMaterias().subscribe(
      data => {
        console.log(data); // Handle the response data
      },
      error => {
        console.error(error); // Handle any errors
      }
    );
  }

  getMateriaFromAPI() {
    this.crud.getMateria(this.materiaId).subscribe(
      data => {
        console.log(data); // Handle the response data
      },
      error => {
        console.error(error); // Handle any errors
      }
    );
  }

}
