// src/Components/ventanaadmin/ventanaadmin.component.ts
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

  adminLogeado: any = null;

  constructor(private router: Router) {
    // Aquí se obtiene el ADMIN real que inició sesión
    const data = localStorage.getItem('admin');
    this.adminLogeado = data ? JSON.parse(data) : null;
  }

  esElAdminPrincipal(): boolean {
    // Solo este usuario verá el botón especial
    return this.adminLogeado?.usuario === 'steven2311';
  }

  navegar(rutaHija: string): void {
    this.router.navigate([`/admin/${rutaHija}`]);
  }

  cerrarSesion(): void {
    localStorage.removeItem('admin');
    this.router.navigate(['/inicio-sesion']);
  }
}
