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
      alert('Inicio de sesión Alumno ✅');
    } else {
      alert('Inicio de sesión Admin ✅');
    }
  }

  irACrearCuenta() {
    this.router.navigate(['/crear-cuenta']);
  }

  olvideContrasena() {
    alert('Redirigiendo a recuperación de contraseña...');
    // Aquí puedes navegar a otra ruta o abrir un modal
  }

  seleccionarRol(rol: 'usuario' | 'admin'): void {
    this.selectedRole = rol;
    this.loginForm.reset();
    console.log('Modo:', rol);
  }
}
