import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(environment.apiBaseUrl + '/api/data');
  }

  getDataFromAPI() {
    this.getData().subscribe(
      (data) => {
        console.log(data); // Handle the response data
      },
      (error) => {
        console.error(error); // Handle any errors
      }
    );
  }
}
