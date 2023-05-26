import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, filter } from 'rxjs/operators';
import { Materia } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMateria(materiaId: string) {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        if (token) {
          const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
          return this.http.get(`${environment.apiBaseUrl}/api/materia/${materiaId}`, { headers }) as Observable<Materia>;
        } else {
          throw new Error('User is not authenticated');
        }
      })
    );
  }

  getAllMaterias() {
    return this.auth.user$.pipe(
      filter(user => user !== null),  // filter out null users
      switchMap(user =>
        this.auth.getAccessTokenSilently().pipe(
          switchMap(token => {
            if (token) {
              const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
              return this.http.get(`${environment.apiBaseUrl}/api/materias/${user!.sub}`, { headers }) as Observable<Materia[]>;
            } else {
              throw new Error('User is not authenticated');
            }
          })
        )
      )
    );
  }

  createMateria(materia: Materia) {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        if (token) {
          const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
          return this.http.post(environment.apiBaseUrl + '/api/materia', materia, { headers });
        } else {
          throw new Error('User is not authenticated');
        }
      })
    );
  }

  updateMateria(materiaId: string, updatedMateria: Materia) {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        if (token) {
          const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
          return this.http.put(`${environment.apiBaseUrl}/api/materia/${materiaId}`, updatedMateria, { headers });
        } else {
          throw new Error('User is not authenticated');
        }
      })
    );
  }

  deleteMateria(materiaId: string) {
    return this.auth.getAccessTokenSilently().pipe(
      switchMap(token => {
        if (token) {
          const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
          return this.http.delete(`${environment.apiBaseUrl}/api/materia/${materiaId}`, { headers });
        } else {
          throw new Error('User is not authenticated');
        }
      })
    );
  }

  deleteAllMaterias() {
    return this.auth.user$.pipe(
      filter(user => user !== null),
      switchMap(user =>
        this.auth.getAccessTokenSilently().pipe(
          switchMap(token => {
            if (token) {
              const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
              return this.http.delete(`${environment.apiBaseUrl}/api/materias/${user!.sub}`, { headers });
            } else {
              throw new Error('User is not authenticated');
            }
          })
        )
      )
    );
  }
}
