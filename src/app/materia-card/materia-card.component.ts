import { Component, NgModule, OnInit } from '@angular/core';
import { Materia, Evaluacion } from '../interfaces';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-materia-card',
  templateUrl: './materia-card.component.html',
  styleUrls: ['./materia-card.component.scss'],
})
export class MateriaCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
@NgModule({
  declarations: [MateriaCardComponent],
  imports: [IonicModule],
})
export class MateriaCardModule {}