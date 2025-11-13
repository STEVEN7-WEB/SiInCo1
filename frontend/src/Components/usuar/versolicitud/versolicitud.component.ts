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
  apiUrl = 'http://127.0.0.1:8000/api/solicitudes';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe({
      next: (res: any) => {
        this.solicitudes = res.map((s: any, i: number) => ({
          numero: i + 1,
          fecha: s.created_at,
          marca: s.marca,
          color: s.color,
          so: s.sistemaOperativo,
          titulo: s.titulo,
          estatus: 'Pendiente' // Puedes agregar columna estatus en la tabla si quieres
        }));
      },
      error: (err) => console.error('Error al cargar solicitudes:', err)
    });
  }
}
