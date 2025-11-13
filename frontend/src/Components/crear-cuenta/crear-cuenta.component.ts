import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true, // ✅ Esto lo hace independiente
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // ✅ Importamos lo necesario
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {
  crearForm!: FormGroup;
  apiUrl = 'http://127.0.0.1:8000/api/registrar';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.crearForm = this.fb.group({
      nombre: ['', Validators.required],
      numControl: ['', Validators.required],
      carrera: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      preguntaSeguridad: ['', Validators.required],
      respuestaSeguridad: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.crearForm.valid) {
      this.http.post(this.apiUrl, this.crearForm.value).subscribe({
        next: (res: any) => {
          console.log('📦 Respuesta del servidor:', res);
          alert('✅ Usuario registrado con éxito');
          this.crearForm.reset();
          this.router.navigate(['/inicio-sesion']);
        },
        error: (err) => {
          console.error('❌ Error en la API:', err);
          if (err.error && err.error.message) {
            alert(`Error: ${err.error.message}`);
          } else {
            alert('❌ Error al registrar usuario. Verifica los datos.');
          }
        }
      });
    } else {
      alert('⚠️ Por favor completa todos los campos correctamente.');
    }
  }

  volverLogin() {
    this.router.navigate(['/inicio-sesion']);
  }
}
