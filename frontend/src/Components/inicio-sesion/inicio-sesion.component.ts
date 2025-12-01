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

  onSubmit(): void {
    if (this.loginForm.invalid) {
      alert('Por favor llena todos los campos ⚠️');
      return;
    }

    // ============================================================
    //  LOGIN DE USUARIO (SIN CAMBIOS)
    // ============================================================
    if (this.selectedRole === 'usuario') {
      const datos = {
        numControl: this.loginForm.value.usuario,
        password: this.loginForm.value.contrasena
      };

      this.http.post('http://127.0.0.1:8000/api/login', datos).subscribe({
        next: (res: any) => {
          localStorage.setItem('numControl', res.usuario.numControl);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          alert(`Bienvenido ${res.usuario.nombre} ✅`);
          this.router.navigate(['/usuar']);
        },
        error: (err) =>
          alert(err.error.message || 'Usuario o contraseña incorrectos ❌')
      });

      return;
    }

    // ============================================================
    //  LOGIN DE DOCENTE (NUEVO - CONEXIÓN A AdminDocente)
    // ============================================================
if (this.selectedRole === 'docente') {

  const datos = {
    usuario: this.loginForm.value.usuario,
    password: this.loginForm.value.contrasena
  };

  this.http.post('http://127.0.0.1:8000/api/login-admin-docente', datos)
    .subscribe({
      next: (res: any) => {

        if (res.usuario.rol !== 'docente') {
          alert('Este usuario no es docente ❌');
          return;
        }

        // Guardar ID del docente para solicitudes
        localStorage.setItem('user_id', res.usuario.id);
        localStorage.setItem('docente', JSON.stringify(res.usuario));

        alert(`Bienvenido Docente ${res.usuario.nombre} 👨‍🏫`);
        this.router.navigate(['/docente']);
      },
      error: (err) =>
        alert(err.error.message || 'Credenciales de docente inválidas ❌')
    });

  return;
}


    // ============================================================
    //  LOGIN DE ADMIN (NUEVO - DESDE BASE DE DATOS)
    // ============================================================
    if (this.selectedRole === 'admin') {

      const datos = {
        usuario: this.loginForm.value.usuario,
        password: this.loginForm.value.contrasena
      };

      this.http.post('http://127.0.0.1:8000/api/login-admin-docente', datos)
        .subscribe({
          next: (res: any) => {

            if (res.usuario.rol !== 'admin') {
              alert('Este usuario no es administrador ❌');
              return;
            }

            localStorage.setItem('admin', JSON.stringify(res.usuario));

            alert(`Bienvenido Administrador ${res.usuario.nombre} 🛡️`);
            this.router.navigate(['/admin']);
          },
          error: (err) =>
            alert(err.error.message || 'Credenciales de administrador inválidas ❌')
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
