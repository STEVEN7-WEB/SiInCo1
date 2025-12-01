import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaDocenteComponent {
  vista: 'contactos' | 'mapa' = 'contactos';

  contactos = [
    { nombre: 'Soporte Técnico', telefono: '555-123-4567', correo: 'soporte@empresa.com' },
    { nombre: 'Atención al Cliente', telefono: '555-987-6543', correo: 'clientes@empresa.com' },
    { nombre: 'Administración', telefono: '555-321-7890', correo: 'admin@empresa.com' }
  ];
}
