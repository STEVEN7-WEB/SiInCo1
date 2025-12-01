import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-verinventario',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './verinventario.component.html',
  styleUrls: ['./verinventario.component.css']
})
export class VerinventarioComponent implements OnInit {

  inventario: any[] = [];
  cargando = true;

  apiInventario = 'http://127.0.0.1:8000/api/inventario';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiInventario).subscribe({
      next: (data) => {
        this.inventario = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar inventario:', err);
        this.cargando = false;
      }
    });
  }

  getColor(item: any) {
    if (item.cantidad <= 2) return 'rojo';
    if (item.cantidad <= 5) return 'amarillo';
    return 'verde';
  }

}
