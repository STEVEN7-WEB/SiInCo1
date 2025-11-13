import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// --- Componentes Principales (Login, Registro, etc.) ---
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './Components/crear-cuenta/crear-cuenta.component';
import { OlvideContrasenaComponent } from './Components/olvide-contrasena/olvide-contrasena.component';

// --- Componentes Layout (Padres) ---
import { VentanaUsuarioComponent } from './Components/ventanausuario/ventanausuario.component';
import { VentanaadminComponent } from './Components/ventanaadmin/ventanaadmin.component';

// --- Componentes Hijos ---
import { CrearSolicitudComponent } from './Components/usuar/crearsolicitud/crearsolicitud.component';
import { BienvenidaComponent } from './Components/usuar/bienvenida/bienvenida.component';
import { Versolicitud } from './Components/usuar/versolicitud/versolicitud';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      // --- Rutas principales ---
      { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
      { path: 'inicio-sesion', component: InicioSesionComponent },
      { path: 'crear-cuenta', component: CrearCuentaComponent },
      { path: 'olvide-contrasena', component: OlvideContrasenaComponent },
      { path: 'admin', component: VentanaadminComponent },

      // --- RUTA PADRE (Usuario) ---
      {
        path: 'usuar',
        component: VentanaUsuarioComponent,
        children: [
          { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
          { path: 'bienvenida', component: BienvenidaComponent },
          { path: 'crear-solicitud', component: CrearSolicitudComponent },
          { path: 'mis-solicitudes', component: Versolicitud },
        ]
      },
    ]),

    // ✅ Módulos esenciales para formularios y peticiones HTTP
    importProvidersFrom(
      CommonModule,
      ReactiveFormsModule,
      HttpClientModule
    ),
  ],
}).catch(err => console.error(err));
