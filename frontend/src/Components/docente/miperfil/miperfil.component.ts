import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-miperfil-docente',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilDocenteComponent implements OnInit {

  docente: any = null;
  apiDocenteId = 'http://127.0.0.1:8000/api/admin-docente/'; // SI quieres pedir al backend

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    // 1️⃣ Tomamos los datos guardados al iniciar sesión
    const docenteLocal = localStorage.getItem('docente');

    if (!docenteLocal) {
      console.error('No hay sesión del docente');
      return;
    }

    this.docente = JSON.parse(docenteLocal);

    // 2️⃣ SI QUIERES RECARGAR DESDE BACKEND, lo dejo listo:
    /*
    this.http.get<any>(this.apiDocenteId + this.docente.id).subscribe({
      next: (data) => this.docente = data,
      error: (err) => console.error('Error al cargar perfil docente', err)
    });
    */
  }
}
