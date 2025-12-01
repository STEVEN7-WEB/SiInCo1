import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verreportes',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './verreportes.component.html',
  styleUrls: ['./verreportes.component.css']
})
export class VerreportesComponent implements OnInit {

  cargando: boolean = true;
  error: boolean = false;
  mostrarMov: boolean = false; // 👈 Nuevo

  data: any = {
    total_usuarios: 0,
    total_admins: 0,
    total_docentes: 0,
    total_inventario_items: 0,
    total_inventario_valor: 0,
    total_solicitudes: 0,
    solicitudes_pendientes: 0,
    solicitudes_proceso: 0,
    solicitudes_finalizadas: 0,
    solicitudes_canceladas: 0,
    movimientos: []
  };

  apiUrl: string = 'http://127.0.0.1:8000/api/reportes';
  fechaFiltro: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(fecha?: string) {
    this.cargando = true;
    this.error = false;

    let url = this.apiUrl;
    if (fecha) url += `?fecha=${fecha}`;

    this.http.get(url).subscribe({
      next: (res: any) => {
        this.data = res || this.data;

        if (Array.isArray(this.data.movimientos)) {
          this.data.movimientos = this.data.movimientos.map((m: any) => {

            let estado = (m.estado || '').toLowerCase().trim();

            if (estado.includes('pend') || estado.includes('espera')) {
              estado = 'pendiente';
            } else if (estado.includes('proc') || estado.includes('rev')) {
              estado = 'proceso';
            } else if (estado.includes('fin') || estado.includes('complet')) {
              estado = 'finalizada';
            } else if (estado.includes('cancel') || estado.includes('rechaz')) {
              estado = 'cancelado';
            }

            m.estado = estado;

            if (m.tipo === 'inventario') {
              m.cantidad = Number(m.cantidad) || 0;
              m.precio = Number(m.precio) || 0;
            }

            return m;
          });
        }

        this.recalcularContadoresSiNecesario();
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  private recalcularContadoresSiNecesario() {
    const solicitudes = this.data.movimientos.filter((m: any) => m.tipo === 'solicitud');

    this.data.solicitudes_pendientes = solicitudes.filter((s: any) => s.estado === 'pendiente').length;
    this.data.solicitudes_proceso = solicitudes.filter((s: any) => s.estado === 'proceso').length;
    this.data.solicitudes_finalizadas = solicitudes.filter((s: any) => s.estado === 'finalizada').length;
    this.data.solicitudes_canceladas = solicitudes.filter((s: any) => s.estado === 'cancelado').length;
    this.data.total_solicitudes = solicitudes.length;
  }

  filtrarPorFecha(event: any) {
    this.fechaFiltro = event.target.value;
    this.cargarDatos(this.fechaFiltro || undefined);
  }

  limpiarFiltro() {
    this.fechaFiltro = '';
    const input = document.getElementById('ffecha') as HTMLInputElement;
    if (input) input.value = '';
    this.cargarDatos();
  }

  badgeClass(estado: string) {
    switch (estado) {
      case 'pendiente': return 'pendiente';
      case 'proceso': return 'proceso';
      case 'finalizada': return 'finalizada';
      case 'cancelado': return 'cancelado';
      default: return '';
    }
  }

  formatearPesos(valor: number) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(valor || 0);
  }
}
