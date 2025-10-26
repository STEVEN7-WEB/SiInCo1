import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { InicioSesionComponent } from '../Components/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from '../Components/crear-cuenta/crear-cuenta.component';

export const routes: Routes = [
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
  {path: 'crear-cuenta', component: CrearCuentaComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
