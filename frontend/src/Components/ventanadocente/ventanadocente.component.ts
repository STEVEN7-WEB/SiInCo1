import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ventanadocente',
  standalone: true,
  imports: [CommonModule, RouterOutlet], 
  templateUrl: './ventanadocente.component.html',
  styleUrl: './ventanadocente.component.css',
})
export class VentanaDocente {

  constructor(private router: Router) {}


  navegar(rutaHija: string): void {
    this.router.navigate([`/docente/${rutaHija}`]);
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/inicio-sesion']);
  }
}