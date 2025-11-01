import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ventanausuario',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './ventanausuario.component.html',
  styleUrls: ['./ventanausuario.component.css']
})
export class VentanaUsuarioComponent {

  constructor(private router: Router) {}

  cerrarSesion(): void {
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/inicio-sesion']);
  }
}
