import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  loginForm!: FormGroup;
  selectedRole: 'usuario' | 'admin' = 'usuario';

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

    // 🔹 LOGIN DE USUARIO NORMAL
    if (this.selectedRole === 'usuario') {
      const datos = {
        numControl: this.loginForm.value.usuario, // ✅ debe coincidir con el backend
        password: this.loginForm.value.contrasena
      };

      this.http.post('http://127.0.0.1:8000/api/login', datos).subscribe({
        next: (res: any) => {
          alert(`Bienvenido ${res.user.nombre} ✅`);
          localStorage.setItem('usuario', JSON.stringify(res.user));
          this.router.navigate(['/usuar']);
        },
        error: (err) => {
          alert(err.error.message || 'Usuario o contraseña incorrectos ❌');
        }
      });

    } else {
      // 🔹 LOGIN DE ADMIN LOCAL
      const adminUser = { usuario: 'admin', contrasena: '1234' };
      if (
        this.loginForm.value.usuario === adminUser.usuario &&
        this.loginForm.value.contrasena === adminUser.contrasena
      ) {
        alert('Bienvenido Admin ✅');
        this.router.navigate(['/admin']);
      } else {
        alert('Usuario o contraseña admin incorrectos ❌');
      }
    }
  }

  irACrearCuenta() {
    this.router.navigate(['/crear-cuenta']);
  }

  olvideContrasena() {
    this.router.navigate(['/olvide-contrasena']);
  }

  seleccionarRol(rol: 'usuario' | 'admin'): void {
    this.selectedRole = rol;
    this.loginForm.reset();
  }
}
