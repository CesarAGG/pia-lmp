import { Component } from '@angular/core';
import { CrudService } from '../crud.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  materiaId: string;
  testMateria = {
    Nombre: 'Materia 1',
    Profe: 'Profe 1',
    Horario: 'Horario 1',
    Evaluaciones: [
      {
        Nombre: 'Evaluacion 1',
        Tipo: 'Tipo 1',
        Ptos_obtenidos: 1,
        Ptos_posibles: 1
      },
      {
        Nombre: 'Evaluacion 2',
        Tipo: 'Tipo 2',
        Ptos_obtenidos: 2,
        Ptos_posibles: 2
      }
    ]
  };

  constructor(private crud: CrudService) { }

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
