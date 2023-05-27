import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Materia, Evaluacion } from '../interfaces';
import { materiaValidator, ptPosiblesSumValidator } from '../validators';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-materia-modal',
  templateUrl: './materia-modal.component.html',
  styleUrls: ['./materia-modal.component.scss'],
})
export class MateriaModalComponent implements OnInit {
  @Input() materia: Materia;

  materiaForm: FormGroup;

  constructor(private fb: FormBuilder, private crud: CrudService, private modalController: ModalController) {
    this.materiaForm = this.fb.group({
      nombre: ['', Validators.required],
      profe: ['', Validators.required],
      horario: ['', Validators.required],
      salon: ['', Validators.required],
      pase: [70, Validators.required],
      evaluaciones: this.fb.array([], ptPosiblesSumValidator())
    }, { validators: materiaValidator() });

  }

  get evaluaciones() {
    return this.materiaForm.get('evaluaciones') as FormArray;
  }

  addEvaluacion(evaluacion?: Evaluacion) {
    this.evaluaciones.push(this.fb.group({
      nombre: [evaluacion ? evaluacion.nombre : '', Validators.required],
      tipo: [evaluacion ? evaluacion.tipo : '', Validators.required],
      ptObtenidos: [evaluacion?.ptObtenidos ? evaluacion.ptObtenidos : "-1", Validators.required],
      ptPosibles: [evaluacion ? evaluacion.ptPosibles : '', Validators.required],
      completado: [false]
    }));
  }

  ngOnInit() {
    if (this.materia) {
      this.materiaForm.patchValue({
        nombre: this.materia.nombre,
        profe: this.materia.profe,
        horario: this.materia.horario,
        salon: this.materia.salon,
        pase: this.materia.pase,
      });

      this.materia.evaluaciones.forEach(evaluacion => {
        this.addEvaluacion(evaluacion);
      });

      this.materiaForm.get('evaluaciones')!.valueChanges.subscribe(evaluaciones => {
        evaluaciones.forEach((evaluacion: Evaluacion, index: number) => {
          if (+(evaluacion.ptObtenidos ?? 0) !== -1) {
            this.evaluaciones.at(index).get('completado')!.setValue(true, { emitEvent: false });
          } else {
            this.evaluaciones.at(index).get('completado')!.setValue(false, { emitEvent: false });
          }

          // Check if value is a string and contains the '%' character
          if (typeof evaluacion.ptObtenidos === 'string' && evaluacion.ptObtenidos.includes('%')) {
            const percentage = parseFloat(evaluacion.ptObtenidos.replace('%', ''));
            if (!isNaN(percentage)) {
              const computedValue = (percentage * this.evaluaciones.at(index).get('ptPosibles')!.value) / 100;
              this.evaluaciones.at(index).get('ptObtenidos')!.setValue(computedValue, { emitEvent: false });
            }
          }
        });
      });
    }
  }

  dismissModal() {
    this.modalController.dismiss().then(() => {
      window.location.reload();
    });
  }

  onSubmit() {
    if (this.materiaForm.valid) {
      // Modify evaluaciones to replace -1 with null
      const materia: Materia = this.materiaForm.value;
      materia.evaluaciones.forEach(evaluacion => {
        if (+(evaluacion.ptObtenidos ?? 0) === -1) {
          evaluacion.ptObtenidos = null;
          evaluacion.completado = false;
        } else {
          evaluacion.completado = true;
        }
      });
      if (this.materia) {
        // Update existing Materia
        this.crud.updateMateria(this.materia.id!, this.materiaForm.value).subscribe(response => {
          console.log(response);
          this.dismissModal();
        });
      } else {
        // Add new Materia
        this.crud.createMateria(this.materiaForm.value).subscribe(response => {
          console.log(response);
          this.dismissModal();
        });
      }
    }
  }
}
