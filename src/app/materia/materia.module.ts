import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriaPageRoutingModule } from './materia-routing.module';

import { FilterByTipoPipe } from '../filter-by-tipo.pipe';
import { MateriaPage } from './materia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriaPageRoutingModule
  ],
  declarations: [MateriaPage, FilterByTipoPipe]
})
export class MateriaPageModule { }
