import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
  usuario: any = null; // Datos del usuario
  apiUsuario = 'http://127.0.0.1:8000/api/usuario/numcontrol/'; // Ajusta según tu ruta Laravel

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const numControl = localStorage.getItem('numControl');
    if (!numControl) return;

    this.http.get<any>(this.apiUsuario + numControl).subscribe({
      next: (res) => {
        this.usuario = res;
      },
      error: (err) => console.error('Error al cargar datos del usuario:', err)
    });
  }

  irAActualizar() {
    this.router.navigate(['/actualizar-perfil']);
  }
}
