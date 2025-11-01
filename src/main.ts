import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './Components/crear-cuenta/crear-cuenta.component';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OlvideContrasenaComponent } from './Components/olvide-contrasena/olvide-contrasena.component';
import { VentanaUsuarioComponent } from './Components/ventanausuario/ventanausuario.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
        { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
      { path: 'inicio-sesion', component: InicioSesionComponent },
      { path: 'crear-cuenta', component: CrearCuentaComponent },
      { path: 'olvide-contrasena', component: OlvideContrasenaComponent },
      { path: 'ventanausuario', component: VentanaUsuarioComponent }
    ]),
    importProvidersFrom(ReactiveFormsModule)
  ]
});
