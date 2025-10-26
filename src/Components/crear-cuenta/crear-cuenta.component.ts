import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      numControl: ['', Validators.required],
      carrera: ['', Validators.required],
      celular: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmContrasena: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      if (this.registerForm.value.contrasena !== this.registerForm.value.confirmContrasena) {
        alert('Las contraseñas no coinciden');
        return;
      }
      alert('Cuenta creada ✅');
      this.router.navigate(['/inicio-sesion']); // redirige al login
    } else {
      alert('Por favor completa todos los campos');
    }
  }

volverLogin() {
  console.log('Volver pulsado'); // verificar si entra aquí
  this.router.navigate(['/inicio-sesion']);
}

}
