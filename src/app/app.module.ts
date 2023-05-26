import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MateriaModalComponent } from './materia-modal/materia-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from '@auth0/auth0-angular';
import { FilterByTipoPipe } from './filter-by-tipo.pipe';

@NgModule({
  declarations: [AppComponent, MateriaModalComponent, FilterByTipoPipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-jwbsycv13ur5aut7.us.auth0.com',
      clientId: 'AAkIPAAVXaGcqcCOmp6siijSF5MezFju',
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      authorizationParams: {
        audience: 'https://dev-jwbsycv13ur5aut7.us.auth0.com/api/v2/',
        scope: 'openid profile email',
        redirect_uri: window.location.origin
      }
    }),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
