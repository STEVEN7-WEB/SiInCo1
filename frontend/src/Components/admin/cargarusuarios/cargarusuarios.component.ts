import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cargarusuarios',
  templateUrl: './cargarusuarios.component.html',
  styleUrls: ['./cargarusuarios.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class CargarusuariosComponent {
  rol: 'admin' | 'docente' = 'admin';
  usuarios: any[] = [];

  nombre: string = '';
  fechaNacimiento: string = '';
  telefono: string = '';
  sexo: string = '';
  correo: string = '';
  carrera: string = '';
  contrasena: string = '';

  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(private http: HttpClient) {}

  cambiarRol(nuevoRol: 'admin' | 'docente') {
    this.rol = nuevoRol;
    this.limpiarCampos();
    this.error = '';
    this.success = '';
  }

  limpiarCampos() {
    this.nombre = '';
    this.fechaNacimiento = '';
    this.telefono = '';
    this.sexo = '';
    this.correo = '';
    this.carrera = '';
    this.contrasena = '';
  }

  generarUsuario(): string {
    if (!this.nombre || !this.fechaNacimiento) return '';
    const fecha = new Date(this.fechaNacimiento);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const nombreSinEspacios = this.nombre.replace(/\s+/g, '').toLowerCase();
    return `${nombreSinEspacios}${dia}${mes}`;
  }

  agregarUsuario() {
    if (!this.nombre || !this.fechaNacimiento) {
      this.error = 'Nombre y fecha de nacimiento son obligatorios.';
      return;
    }

    const usuarioData: any = {
      rol: this.rol,
      nombre: this.nombre,
      fechaNacimiento: this.fechaNacimiento,
      telefono: this.telefono,
      sexo: this.sexo,
      usuario: this.generarUsuario(),
      contrasena: this.contrasena || '1234'
    };

    if (this.rol === 'docente') {
      usuarioData.correo = this.correo;
      usuarioData.carrera = this.carrera;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    // Guardar localmente
    this.usuarios.push(usuarioData);

    // Guardar en Laravel en el nuevo endpoint AdminDocente
    this.http.post('http://tu-laravel-app.test/api/admin-docente', usuarioData)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.success = 'Usuario guardado correctamente.';
          console.log('Usuario guardado en Laravel:', res);
          this.limpiarCampos();
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al guardar usuario en Laravel.';
          console.error('Error al guardar usuario:', err);
        }
      });
  }
}
