import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ventanaadmin',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './ventanaadmin.component.html',
  styleUrls: ['./ventanaadmin.component.css']
})
export class VentanaadminComponent {

  constructor(private router: Router) {}

  navegar(rutaHija: string): void {
    this.router.navigate([`/admin/${rutaHija}`]);
  }

  cerrarSesion(): void {
    localStorage.removeItem('adminActual');
    this.router.navigate(['/inicio-sesion']);
  }
}