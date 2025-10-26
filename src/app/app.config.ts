import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { InicioSesionComponent } from '../Components/inicio-sesion/inicio-sesion.component';

export const routes: Routes = [
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
