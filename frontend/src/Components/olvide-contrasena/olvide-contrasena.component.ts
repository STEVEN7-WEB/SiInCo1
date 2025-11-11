import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvide-contrasena',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './olvide-contrasena.component.html',
  styleUrls: ['./olvide-contrasena.component.css']
})
export class OlvideContrasenaComponent {

  forgotForm: FormGroup;
  mensaje: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      numControl: ['', Validators.required]
    });
  }

  revisarUsuario() {
    const numControl = this.forgotForm.value.numControl;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const encontrado = usuarios.find((u: any) => u.numControl === numControl);

    if (encontrado) {
      this.mensaje = `Tu contraseña es: ${encontrado.contrasena}`;
    } else {
      this.mensaje = 'Número de control no encontrado ❌';
    }
  }

  volverLogin() {
    this.router.navigate(['/inicio-sesion']);
  }
}
