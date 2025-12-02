import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  loginForm!: FormGroup;
  selectedRole: 'usuario' | 'docente' | 'admin' = 'usuario';

  showModal: boolean = false;
  modalTitulo: string = "";
  modalMensaje: string = "";
  modalTipo: string = ""; // modal-success | modal-error

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  mostrarModal(tipo: 'success' | 'error', titulo: string, mensaje: string) {
    this.modalTipo = tipo === 'success' ? 'modal-success' : 'modal-error';
    this.modalTitulo = titulo;
    this.modalMensaje = mensaje;
    this.showModal = true;

    setTimeout(() => this.showModal = false, 2500);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.mostrarModal('error', 'Campos vacíos', 'Por favor llena todos los campos');
      return;
    }

    /* ========== LOGIN USUARIO ========== */
    if (this.selectedRole === 'usuario') {
      const datos = {
        numControl: this.loginForm.value.usuario,
        password: this.loginForm.value.contrasena
      };

      this.http.post('http://127.0.0.1:8000/api/login', datos).subscribe({
        next: (res: any) => {

          localStorage.setItem('numControl', res.usuario.numControl);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));

          this.mostrarModal('success', '✔ Sesión iniciada', `Bienvenido ${res.usuario.nombre}`);

          setTimeout(() => this.router.navigate(['/usuar']), 2500);
        },
        error: (err) =>
          this.mostrarModal('error', 'Error', err.error.message || 'Usuario o contraseña incorrectos ❌')
      });

      return;
    }

    /* ========== LOGIN DOCENTE ========== */
    if (this.selectedRole === 'docente') {
      const datos = {
        usuario: this.loginForm.value.usuario,
        password: this.loginForm.value.contrasena
      };

      this.http.post('http://127.0.0.1:8000/api/login-admin-docente', datos)
        .subscribe({
          next: (res: any) => {

            if (res.usuario.rol !== 'docente') {
              this.mostrarModal('error', 'Acceso denegado', 'Este usuario no es docente');
              return;
            }

            localStorage.setItem('docente', JSON.stringify(res.usuario));

            this.mostrarModal('success', '✔ Bienvenido Docente', res.usuario.nombre);

            setTimeout(() => this.router.navigate(['/docente']), 2500);
          },
          error: (err) =>
            this.mostrarModal('error', 'Error', err.error.message || 'Credenciales incorrectas ❌')
        });

      return;
    }

    /* ========== LOGIN ADMIN ========== */
    if (this.selectedRole === 'admin') {
      const datos = {
        usuario: this.loginForm.value.usuario,
        password: this.loginForm.value.contrasena
      };

      this.http.post('http://127.0.0.1:8000/api/login-admin-docente', datos)
        .subscribe({
          next: (res: any) => {

            if (res.usuario.rol !== 'admin') {
              this.mostrarModal('error', 'Acceso denegado', 'Este usuario no es administrador');
              return;
            }

            localStorage.setItem('admin', JSON.stringify(res.usuario));

            this.mostrarModal('success', '✔ Bienvenido Administrador', res.usuario.nombre);

            setTimeout(() => this.router.navigate(['/admin']), 2500);
          },
          error: (err) =>
            this.mostrarModal('error', 'Error', err.error.message || 'Credenciales incorrectas ❌')
        });

      return;
    }
  }

  irACrearCuenta() {
    this.router.navigate(['/crear-cuenta']);
  }

  olvideContrasena() {
    this.router.navigate(['/olvide-contrasena']);
  }

  seleccionarRol(rol: 'usuario' | 'docente' | 'admin'): void {
    this.selectedRole = rol;
    this.loginForm.reset();
  }
}
