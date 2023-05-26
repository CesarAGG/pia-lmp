import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MateriaModalComponent } from './materia-modal/materia-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public auth: AuthService, public router: Router, public modalController: ModalController) { }

  async presentAddModal() {
    const modal = await this.modalController.create({
      component: MateriaModalComponent
    });

    return await modal.present();
  }
}
