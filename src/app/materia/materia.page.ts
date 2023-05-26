import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from '../interfaces';
import { CrudService } from '../crud.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
})
export class MateriaPage implements OnInit {
  materia: Materia;
  materiaId: string;
  error: string;

  constructor(private route: ActivatedRoute, private crud: CrudService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.materiaId = this.route.snapshot.paramMap.get('id') ?? '';
    this.fetchMateria();
  }

  async fetchMateria() {
    this.crud.getMateria(this.materiaId).subscribe(
      materia => {
        this.materia = materia as Materia;
      },
      error => {
        console.error('Failed to fetch materia', error);
        this.error = `Failed to fetch materia: ${error.message}`;
        this.presentToast(this.error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
    this.router.navigate(['/home']);
  }
  calcularTotalPuntosObtenidos(): number {
    if (this.materia && this.materia.evaluaciones.length > 0) {
      return this.materia.evaluaciones.reduce(
        (acumulador, evaluacion) => acumulador + (evaluacion.ptObtenidos || 0),
        0
      );
    }
    return 0;
  }

  calcularTotalPuntosPosibles(): number {
    if (this.materia && this.materia.evaluaciones.length > 0) {
      return this.materia.evaluaciones.reduce(
        (acumulador, evaluacion) => acumulador + evaluacion.ptPosibles,
        0
      );
    }
    return 0;
  }
}
