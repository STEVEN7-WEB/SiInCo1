import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router'; // Asegúrate que RouterOutlet esté aquí

@Component({
  selector: 'app-ventanausuario',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Y aquí
  templateUrl: './ventanausuario.component.html',
  styleUrls: ['./ventanausuario.component.css']
})
export class VentanaUsuarioComponent {

  constructor(private router: Router) {}

  /**
   * Navega a una ruta hija dentro del layout '/usuario'.
   * @param rutaHija El nombre de la ruta (ej: 'crear-solicitud')
   */
  navegar(rutaHija: string): void {
    // Construimos la ruta completa, ej: /usuario/crear-solicitud
    this.router.navigate([`/usuario/${rutaHija}`]);
  }

  /**
   * La función 'crearSolicitud()' se elimina.
   * Su lógica de navegación ahora la maneja 'navegar('crear-solicitud')'.
   *
   * NOTA: Tu función 'crearSolicitud()' original tenía un bug,
   * borraba el 'localStorage' igual que 'cerrarSesion()'.
   * Al eliminarla, ese bug también desaparece.
   */

  cerrarSesion(): void {
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/inicio-sesion']);
  }
}