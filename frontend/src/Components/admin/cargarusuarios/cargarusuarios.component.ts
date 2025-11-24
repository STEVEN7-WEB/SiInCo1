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
  apellido: string = '';
  fechaNacimiento: string = '';
  telefono: string = '';
  sexo: string = '';
  correo: string = '';
  carrera: string = '';
  contrasena: string = '';

  loading: boolean = false;

  // Toast
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' = 'success';
  showToast: boolean = false;

  constructor(private http: HttpClient) {}

  cambiarRol(nuevoRol: 'admin' | 'docente') {
    this.rol = nuevoRol;
    this.limpiarCampos();
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.fechaNacimiento = '';
    this.telefono = '';
    this.sexo = '';
    this.correo = '';
    this.carrera = '';
    this.contrasena = '';
  }

  generarUsuario(): string {
    if (!this.nombre || !this.apellido || !this.fechaNacimiento) return '';
    const fecha = new Date(this.fechaNacimiento);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const nombreSinEspacios = this.nombre.replace(/\s+/g, '').toLowerCase();
    const apellidoSinEspacios = this.apellido.replace(/\s+/g, '').toLowerCase();
    return `${nombreSinEspacios}${apellidoSinEspacios}${dia}${mes}`;
  }

  agregarUsuario() {
    // Validación de todos los campos
    if (!this.nombre || !this.apellido || !this.fechaNacimiento ||
        !this.telefono || !this.sexo || !this.contrasena ||
        (this.rol === 'docente' && (!this.correo || !this.carrera))) {
      this.showToastMessage('⚠️ Completa todos los campos obligatorios', 'warning');
      return;
    }

    const usuarioData: any = {
      rol: this.rol,
      nombre: `${this.nombre} ${this.apellido}`,
      fechaNacimiento: this.fechaNacimiento,
      telefono: this.telefono,
      sexo: this.sexo,
      usuario: this.generarUsuario(),
      contrasena: this.contrasena
    };

    if (this.rol === 'docente') {
      usuarioData.correo = this.correo;
      usuarioData.carrera = this.carrera;
    }

    this.loading = true;

    // Guardar localmente
    this.usuarios.push(usuarioData);

    // Guardar en Laravel
    this.http.post('http://localhost:8000/api/admin-docente', usuarioData)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.showToastMessage('✅ Usuario creado correctamente', 'success');
          this.limpiarCampos();
        },
        error: (err) => {
          this.loading = false;
          if (err.status === 422) {
            this.showToastMessage('❌ Usuario ya existe o datos incorrectos', 'error');
          } else {
            this.showToastMessage('❌ Error al guardar usuario', 'error');
          }
          console.error(err);
        }
      });
  }

  showToastMessage(message: string, type: 'success' | 'error' | 'warning') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  // Función para clases dinámicas en los inputs según si están vacíos
  campoVacio(campo: string): boolean {
    return !campo;
  }
}
