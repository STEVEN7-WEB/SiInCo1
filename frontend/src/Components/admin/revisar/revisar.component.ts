import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-revisar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './revisar.component.html',
  styleUrls: ['./revisar.component.css']
})
export class RevisarComponent implements OnInit {
  solicitudes: any[] = [];
  cargando = true;
  apiUrl = 'http://127.0.0.1:8000/api/solicitudes';
  solicitudSeleccionada: any = null;

  // Toast
  toastMensaje: string = '';
  toastVisible: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.cargando = true;
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (res) => {
        this.solicitudes = res.map((s, i) => ({
          numero: i + 1,
          id: s.id,
          fecha: s.created_at.split('T')[0],
          usuario: s.user?.nombre ?? 'Sin usuario',
          marca: s.marca,
          color: s.color,
          so: s.sistemaOperativo,
          titulo: s.titulo,
          descripcion: s.descripcion,
          mensajeError: s.mensajeError,
          instalaRam: s.instalaRam ? 'Sí' : 'No',
          instalaSsd: s.instalaSsd ? 'Sí' : 'No',
          mantenimiento: s.mantenimiento ? 'Sí' : 'No',
          instalaPrograma: s.instalaPrograma ? 'Sí' : 'No',
          nombrePrograma: s.nombrePrograma ?? '-',
          aceptaConfirmacion: s.aceptaConfirmacion ? 'Sí' : 'No',
          estatus: s.estatus ?? 'Pendiente'
        }));
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar solicitudes:', err);
        this.cargando = false;
      }
    });
  }

  cambiarEstatus(solicitud: any, nuevoEstatus: string) {
    this.http.patch<any>(`${this.apiUrl}/${solicitud.id}/estatus`, { estatus: nuevoEstatus })
      .subscribe({
        next: (updated) => {
          solicitud.estatus = updated.estatus;
          this.mostrarToast(`Estatus actualizado a "${updated.estatus}"`);
        },
        error: (err) => console.error('Error al actualizar estatus:', err)
      });
  }

  abrirModal(s: any) {
    this.solicitudSeleccionada = s;
  }

  cerrarModal() {
    this.solicitudSeleccionada = null;
  }

  mostrarToast(mensaje: string) {
    this.toastMensaje = mensaje;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 3000); // Se oculta después de 3 segundos
  }
}
