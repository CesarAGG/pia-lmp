import { Component, OnInit, NgModule } from '@angular/core';
import { Materia, Evaluacion } from '../interfaces';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Importar el módulo CommonModule

@Component({
  selector: 'app-materia-card',
  templateUrl: './materia-card.component.html',
  styleUrls: ['./materia-card.component.scss'],
})
export class MateriaCardComponent implements OnInit {
  materia: Materia = {
    ID: 1,
    nombre: 'Matemáticas',
    profe: 'Juan Pérez',
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
        PP: 40,
      },
      {
        nombre: 'Proyecto',
        tipo: 'Final',
        PO: 30,
        PP: 70,
      },
    ];
  }
}

@NgModule({
  declarations: [MateriaCardComponent],
  imports: [IonicModule, CommonModule],
})
export class MateriaCardModule {}