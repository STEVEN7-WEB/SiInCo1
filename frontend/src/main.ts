import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// --- Componentes Principales ---
import { InicioSesionComponent } from './Components/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from './Components/crear-cuenta/crear-cuenta.component';
import { OlvideContrasenaComponent } from './Components/olvide-contrasena/olvide-contrasena.component';

// --- Componentes Layout ---
import { VentanaUsuarioComponent } from './Components/ventanausuario/ventanausuario.component';
import { VentanaadminComponent } from './Components/ventanaadmin/ventanaadmin.component';
import { VentanaDocente } from './Components/ventanadocente/ventanadocente.component';

// --- Componentes Hijos Usuario ---
import { CrearSolicitudComponent } from './Components/usuar/crearsolicitud/crearsolicitud.component';
import { BienvenidaComponent } from './Components/usuar/bienvenida/bienvenida.component';
import { VersolicitudComponent } from './Components/usuar/versolicitud/versolicitud.component';
import { MiperfilComponent } from './Components/usuar/miperfil/miperfil.component';
import { AyudaComponent } from './Components/usuar/ayuda/ayuda.component';
import { VideoComponent } from './Components/usuar/video/video.component';
// ---Componentes Hijos Docente ---
import { BienvenidaDocenteComponent as BienvenidaDocenteComponent } from './Components/docente/bienvenida/bienvenida.component';
import { CrearSolicituDocentedComponent } from './Components/docente/crearsolicitud/crearsolicitud.component';
import { VersolicitudDocenteComponent } from './Components/docente/versolicitud/versolicitud.component';
import { MiperfilDocenteComponent } from './Components/docente/miperfil/miperfil.component';
import { AyudaDocenteComponent } from './Components/docente/ayuda/ayuda.component';
import { VideoDocenteComponent } from './Components/docente/video/video.component';
// --- Componentes Hijos Admin ---
import { BienvenidaComponent as BienvenidaAdminComponent } from './Components/admin/bienvenida/bienvenida.component';
import { RevisarComponent } from './Components/admin/revisar/revisar.component';
import { CargainventarioComponent } from './Components/admin/cargainventario/cargainventario.component';
import { CargarusuariosComponent } from './Components/admin/cargarusuarios/cargarusuarios.component';
import { VerinventarioComponent } from './Components/admin/verinventario/verinventario.component';
import { VerreportesComponent } from './Components/admin/verreportes/verreportes.component';
import { Manualdeayuda } from './Components/admin/manualdeayuda/manualdeayuda.component'; 
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      // --- Rutas principales ---
      { path: '', redirectTo: 'inicio-sesion', pathMatch: 'full' },
      { path: 'inicio-sesion', component: InicioSesionComponent },
      { path: 'crear-cuenta', component: CrearCuentaComponent },
      { path: 'olvide-contrasena', component: OlvideContrasenaComponent },

      // --- RUTA USUARIO ---
      {
        path: 'usuar',
        component: VentanaUsuarioComponent,
        children: [
          { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
          { path: 'bienvenida', component: BienvenidaComponent },
          { path: 'crear-solicitud', component: CrearSolicitudComponent },
          { path: 'mis-solicitudes', component: VersolicitudComponent },
          { path: 'mi-perfil', component: MiperfilComponent },
          { path: 'ayuda', component: AyudaComponent },
          { path: 'configuracion', component: VideoComponent },
        ]
      },

      // --- RUTA DOCENTE ---
      {
        path: 'docente',
        component: VentanaDocente,
        children: [
          { path: '', redirectTo: 'bienvenidadocente', pathMatch: 'full' },
          { path: 'bienvenidadocente', component: BienvenidaDocenteComponent },
          { path: 'crear-solicitud', component: CrearSolicituDocentedComponent },
          { path: 'mis-solicitudes', component: VersolicitudDocenteComponent },
          { path: 'mi-perfil', component: MiperfilDocenteComponent },
          { path: 'ayuda', component: AyudaDocenteComponent },
          { path: 'configuracion', component: VideoDocenteComponent },
        ]
      },

      // --- RUTA ADMIN ---
      {
        path: 'admin',
        component: VentanaadminComponent,
        children: [
          { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
          { path: 'bienvenida', component: BienvenidaAdminComponent },
          { path: 'revisar-solicitudes', component: RevisarComponent },
          { path: 'cargar-inventario', component: CargainventarioComponent },
          { path: 'cargar-usuarios', component: CargarusuariosComponent },
          { path: 'revisar-inventario', component: VerinventarioComponent},
          { path: 'reportes', component: VerreportesComponent},
          { path: 'ayuda', component: Manualdeayuda}
        ]
      },
    ]),

    // --- Módulos esenciales ---
    importProvidersFrom(
      CommonModule,
      ReactiveFormsModule,
      HttpClientModule
    ),
  ],
}).catch(err => console.error(err));
