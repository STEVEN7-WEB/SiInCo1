import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-versolicitud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './versolicitud.component.html',
  styleUrls: ['./versolicitud.component.css']
})
export class VersolicitudComponent {
  solicitudes = [
    {
      numero: 1,
      fecha: '2025-11-08',
      marca: 'Lenovo',
      color: 'Negro',
      so: 'Windows 11',
      titulo: 'Pantalla azul al iniciar',
      estatus: 'Pendiente'
    },
    {
      numero: 2,
      fecha: '2025-11-07',
      marca: 'HP',
      color: 'Gris',
      so: 'Windows 10',
      titulo: 'No reconoce el SSD',
      estatus: 'En proceso'
    },
    {
      numero: 3,
      fecha: '2025-11-05',
      marca: 'Asus',
      color: 'Blanco',
      so: 'Linux',
      titulo: 'Instalación de programa',
      estatus: 'Completado'
    }
  ];
}
