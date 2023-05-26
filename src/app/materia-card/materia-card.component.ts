import { Component, OnInit } from '@angular/core';
import { Materia, Evaluacion } from '../interfaces';

@Component({
  selector: 'app-materia-card',
  templateUrl: './materia-card.component.html',
  styleUrls: ['./materia-card.component.scss'],
})
export class MateriaCardComponent implements OnInit {
  materia: Materia = {
    ID: 1,
    nombre: 'Matemáticas',
    profe: 'Tenorio Rigoberto',
    horario: 'Lunes 9:00 - 11:00',
    evaluaciones: [],
  };

  constructor() {}

  ngOnInit() {
    // Generar datos de prueba para la materia y evaluaciones
    this.materia.evaluaciones = [
      {
        nombre: 'Examen 1',
        tipo: 'Parcial',
        PO: 60,
        PP: 30,
      },
      {
        nombre: 'Proyecto',
        tipo: 'Final',
        PO: 30,
        PP: 70,
      },
    ];
  }
  calcularProgreso(): { totalPO: number; totalPP: number; sumPO: boolean; sumPP: boolean } {
    const totalPO = this.materia.evaluaciones.reduce((total, evaluacion) => total + evaluacion.PO, 0);
    const totalPP = this.materia.evaluaciones.reduce((total, evaluacion) => total + evaluacion.PP, 0);
    const sumPO = this.materia.evaluaciones.some(evaluacion => evaluacion.PO > 0);
    const sumPP = this.materia.evaluaciones.some(evaluacion => evaluacion.PP > 0);
    return { totalPO, totalPP, sumPO, sumPP };
  }
}

