import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  loginForm!: FormGroup;
  selectedRole: 'usuario' | 'admin' = 'usuario';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.selectedRole === 'usuario') {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioValido = usuarios.find(
        (u: any) => u.numControl === this.loginForm.value.usuario && u.contrasena === this.loginForm.value.contrasena
      );

      if (usuarioValido) {
        alert(`Bienvenido ${usuarioValido.nombre} ✅`);
                this.router.navigate(['/ventanausuario']);
      } else {
        alert('Usuario o contraseña incorrectos ❌');
      }

    } else {
      // admin fijo
      const adminUser = { usuario: 'admin', contrasena: '1234' };
      if (this.loginForm.value.usuario === adminUser.usuario && this.loginForm.value.contrasena === adminUser.contrasena) {
        alert('Bienvenido Admin ✅');
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
