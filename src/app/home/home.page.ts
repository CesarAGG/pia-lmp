import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  materiaId: string;

  constructor(private http: HttpClient, public auth: AuthService) { }

  NgOninit() {

    this.auth.idTokenClaims$.subscribe((claims) => {
      if (claims && claims.__raw) {
        const accessToken = claims.__raw;
      } else {
        console.error('Access token not available.');
      }
    });
  }

  getMateriaById() {
    if (this.materiaId) {
      const apiUrl = `${environment.apiBaseUrl}/api/materia/${this.materiaId}`;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getAccessTokenSilently()}`
      });
      this.http.get(apiUrl).subscribe(
        (data) => {
          console.log(data); // Handle the response data
        },
        (error) => {
          console.error(error); // Handle any errors
        }
      );
    }
  }

  // make a post request to create a new Materia, the schema in python is:
  //   class Materia:
  //     def __init__(self, ID, Nombre, Profe, Horario, Evaluaciones):
  // self.ID = ID # this is created by the database
  // self.Nombre = Nombre
  // self.Profe = Profe
  // self.Horario = Horario
  // self.Evaluaciones = Evaluaciones

  // class Evaluacion:
  //     def __init__(self, Nombre, Tipo, Ptos_obtenidos, Ptos_posibles):
  // self.Nombre = Nombre
  // self.Tipo = Tipo
  // self.Ptos_obtenidos = Ptos_obtenidos
  // self.Ptos_posibles = Ptos_posibles
  postData() {
    return this.http.post(environment.apiBaseUrl + '/api/materia', {
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
    });
  }

  postDataToAPI() {
    this.postData().subscribe(
      (data) => {
        console.log(data); // Handle the response data
      },
      (error) => {
        console.error(error); // Handle any errors
      }
    );
  }
}
