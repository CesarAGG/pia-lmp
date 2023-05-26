import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MateriaModalComponent } from './materia-modal/materia-modal.component';
import { CrudService } from './crud.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService,
    private route: ActivatedRoute,
    private crudService: CrudService,
    public router: Router,
    public modalController: ModalController,
    private menuController: MenuController
  ) {

  }

  materiaId: string | null = null;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.params),
    ).subscribe(params => {
      this.materiaId = params['id'] || null;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuController.close(); // Close the menu after navigating to a new route
      }
    });
  }

  async presentAddModal() {
    const modal = await this.modalController.create({
      component: MateriaModalComponent
    });

    return await modal.present();
  }

  async presentUpdateModal() {
    if (this.materiaId) {
      const modal = await this.modalController.create({
        component: MateriaModalComponent,
        componentProps: {
          materia: await this.crudService.getMateria(this.materiaId).toPromise()
        }
      });
      return await modal.present();
    }
  }


}
