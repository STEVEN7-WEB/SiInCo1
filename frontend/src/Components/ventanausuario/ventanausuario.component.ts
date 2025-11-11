import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ventanausuario',
  standalone: true,
  imports: [CommonModule, RouterOutlet], 
  templateUrl: './ventanausuario.component.html',
  styleUrls: ['./ventanausuario.component.css']
})
export class VentanaUsuarioComponent {

  constructor(private router: Router) {}


  navegar(rutaHija: string): void {
    this.router.navigate([`/usuar/${rutaHija}`]);
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/inicio-sesion']);
  }
}