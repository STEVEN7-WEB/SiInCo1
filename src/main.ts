import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './Components/crear-cuenta/crear-cuenta.component';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: InicioSesionComponent },
      { path: 'crear-cuenta', component: CrearCuentaComponent }
    ]),
    importProvidersFrom(ReactiveFormsModule)
  ]
});
