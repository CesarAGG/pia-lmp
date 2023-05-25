import { NgModule, OnInit, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MateriaCardComponent } from './materia-card/materia-card.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Importar el módulo CommonModule




const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
  path: 'materia',
  component: MateriaCardComponent,
  pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicModule,
    CommonModule // Agregar el módulo a imports
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
