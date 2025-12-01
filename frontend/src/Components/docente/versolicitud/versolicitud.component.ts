import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-versolicituddocente',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './versolicitud.component.html',
  styleUrls: ['./versolicitud.component.css']
})
export class VersolicitudDocenteComponent implements OnInit {
  solicitudes: any[] = [];
  docente: any = null;

  // Rutas correctas según tu API
  apiSolicitudes = 'http://127.0.0.1:8000/api/solicitudes-docente/';
  apiDocente = 'http://127.0.0.1:8000/api/usuario/id/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const docenteId = localStorage.getItem('user_id'); // 🔹 Ahora sí, correcto
    if (!docenteId) {
      console.warn('No se encontró user_id en localStorage');
      return;
    }

    // ===========================
    // Obtener datos del docente
    // ===========================
    this.http.get<any>(this.apiDocente + docenteId).subscribe({
      next: (res) => this.docente = res,
      error: (err) => console.error('Error al cargar docente:', err)
    });

    // ===========================
    // Obtener solicitudes del docente
    // ===========================
    this.http.get<any[]>(this.apiSolicitudes + docenteId).subscribe({
      next: (res) => {
        this.solicitudes = res.map((s, i) => ({
          numero: i + 1,
          fecha: s.created_at?.split('T')[0] ?? '—',
          marca: s.marca,
          color: s.color,
          so: s.sistemaOperativo,
          titulo: s.titulo,
          estatus: s.estatus ?? 'Pendiente'
        }));
      },
      error: (err) => console.error('Error al cargar solicitudes del docente:', err)
    });
  }
}
