import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-versolicitud',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './versolicitud.component.html',
  styleUrls: ['./versolicitud.component.css']
})
export class VersolicitudComponent implements OnInit {
  solicitudes: any[] = [];
  usuario: any = null; // 🔹 Datos del usuario
  apiSolicitudes = 'http://127.0.0.1:8000/api/solicitudes-usuario/';
  apiUsuario = 'http://127.0.0.1:8000/api/usuario/'; // Ruta para obtener usuario por numControl

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const numControl = localStorage.getItem('numControl');
    if (!numControl) return;

    // 🔹 Obtener perfil del usuario
    this.http.get<any>(this.apiUsuario + numControl).subscribe({
      next: (res) => {
        this.usuario = res;
      },
      error: (err) => {
        console.error('Error al cargar datos del usuario:', err);
      }
    });

    // 🔹 Obtener solicitudes del usuario
    this.http.get<any[]>(this.apiSolicitudes + numControl).subscribe({
      next: (res) => {
        this.solicitudes = res.map((s, i) => ({
          numero: i + 1,
          fecha: s.created_at.split('T')[0],
          marca: s.marca,
          color: s.color,
          so: s.sistemaOperativo,
          titulo: s.titulo,
          estatus: s.estatus ?? 'Pendiente'
        }));
      },
      error: (err) => console.error('Error al cargar solicitudes:', err)
    });
  }
}
