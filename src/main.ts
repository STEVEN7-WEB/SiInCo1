import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// --- Componentes Principales (Login, Registro, etc.) ---
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './Components/crear-cuenta/crear-cuenta.component';
import { OlvideContrasenaComponent } from './Components/olvide-contrasena/olvide-contrasena.component';

// --- Componente Layout (Padre) ---
import { VentanaUsuarioComponent } from './Components/ventanausuario/ventanausuario.component';

// --- Componentes Hijos (Se mostrarán dentro de VentanaUsuario) ---
import { CrearSolicitudComponent } from './Components/usuario/crearsolicitud/crearsolicitud.component';
// (Necesitarás crear este componente que te mencioné en el paso anterior)
import { BienvenidaComponent } from './Components/usuario/bienvenida/bienvenida.component'; 
import { Versolicitud } from './Components/usuario/versolicitud/versolicitud';
// (Aquí importarías MisSolicitudesComponent, PerfilComponent, etc. cuando los tengas)
// import { MisSolicitudesComponent } from './Components/usuario/missolicitudes/missolicitudes.component';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      // --- Rutas Principales (fuera del layout de usuario) ---
      { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
      { path: 'inicio-sesion', component: InicioSesionComponent },
      { path: 'crear-cuenta', component: CrearCuentaComponent },
      { path: 'olvide-contrasena', component: OlvideContrasenaComponent },

      // --- RUTA PADRE (El Layout de Usuario) ---
      {
        // 1. CAMBIO: Renombramos 'ventanausuario' a 'usuario' (es más corto y semántico)
        path: 'usuario', 
        component: VentanaUsuarioComponent,
        
        // 2. CAMBIO: Añadimos 'children' (rutas hijas)
        // Estas rutas se cargarán en el <router-outlet> de VentanaUsuarioComponent
        children: [
          { 
            path: '', // Si solo van a /usuario
            redirectTo: 'bienvenida', // Redirige a la bienvenida
            pathMatch: 'full' 
          },
          { 
            path: 'bienvenida', // Ruta: /usuario/bienvenida
            component: BienvenidaComponent 
          },
          { 
            path: 'crear-solicitud', // Ruta: /usuario/crear-solicitud
            component: CrearSolicitudComponent 
          },
          {
            path: 'mis-solicitudes',
            component: Versolicitud
          }
          // (Aquí pondrías las otras rutas: mis-solicitudes, mi-perfil, etc.)
          // { path: 'mis-solicitudes', component: MisSolicitudesComponent },
        ]
      },

      // 3. CAMBIO: Eliminamos las rutas "planas" que ahora son "hijas"
      // { path: 'ventanausuario', component: VentanaUsuarioComponent }, // <- Eliminada (ahora es 'usuario' y es padre)
      // { path: 'crear-solicitud', component: CrearSolicitudComponent } // <- Eliminada (ahora es hija de 'usuario')
    ]),
    
    importProvidersFrom(ReactiveFormsModule)
  ]
});