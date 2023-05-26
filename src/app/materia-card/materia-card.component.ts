import { Component, Input } from '@angular/core';
import { Materia } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materia-card',
  templateUrl: './materia-card.component.html',
  styleUrls: ['./materia-card.component.scss'],
})
export class MateriaCardComponent {
  @Input() materia: Materia;

  constructor(private router: Router) { }

  navigateToMateria() {
    this.router.navigate(['/materia', this.materia.id]);
  }

  calcularProgreso(): { totalPtObtenidos: number, totalPtPerdidos: number } {
    const totalPO = this.materia.evaluaciones.reduce((total, evaluacion) => total + (evaluacion.ptObtenidos ?? 0), 0);
    const totalPP = this.materia.evaluaciones.reduce((total, evaluacion) => total + (evaluacion.completado ? evaluacion.ptPosibles : 0), 0);
    const totalPPerdidos = totalPP - totalPO;
    return { totalPtObtenidos: totalPO, totalPtPerdidos: totalPPerdidos };
  }
}

