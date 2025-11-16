import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-olvide-contrasena',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './olvide-contrasena.component.html',
  styleUrls: ['./olvide-contrasena.component.css']
})
export class OlvideContrasenaComponent {

  forgotForm: FormGroup;
  resetForm: FormGroup;
  mensaje: string | null = null;
  paso = 1;
  usuarioId: number | null = null;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {

    this.forgotForm = this.fb.group({
      numControl: ['', Validators.required],
      celular: ['', Validators.required],
      respuestaSeguridad: ['', Validators.required]
    });

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required]
    });
  }

  revisarUsuario() {
    this.http.post("http://127.0.0.1:8000/api/usuario/verificar", this.forgotForm.value)
      .subscribe((res: any) => {

        if (res.success) {
          this.usuarioId = res.user_id;
          this.paso = 2;
          this.mensaje = null;
        } else {
          this.mensaje = "Datos incorrectos ❌";
        }

      }, err => {
        this.mensaje = "Error al verificar datos ❌";
      });
  }

  actualizarPassword() {
    if (this.resetForm.value.password !== this.resetForm.value.password2) {
      this.mensaje = "Las contraseñas no coinciden ❌";
      return;
    }

    const datos = {
      user_id: this.usuarioId,
      password: this.resetForm.value.password
    };

    this.http.post("http://127.0.0.1:8000/api/usuario/actualizar-contrasena", datos)
      .subscribe((res: any) => {

        if (res.success) {
          this.mensaje = "Contraseña actualizada correctamente ✔️";
          setTimeout(() => this.router.navigate(['/inicio-sesion']), 1500);
        } else {
          this.mensaje = "No se pudo actualizar la contraseña ❌";
        }

      }, err => {
        this.mensaje = "Error en el servidor ❌";
      });
  }

  volverLogin() {
    this.router.navigate(['/inicio-sesion']);
  }
}
