import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crearsolicitud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './crearsolicitud.component.html',
  styleUrls: ['./crearsolicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {
  formularioMantenimiento!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.formularioMantenimiento = this.fb.group({
      marca: ['', Validators.required],
      color: ['', Validators.required],
      sistemaOperativo: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      mensajeError: [''],
      instalaRam: [false],
      instalaSsd: [false],
      mantenimiento: [false],
      nombrePrograma: [''],
      aceptaConfirmacion: [false, Validators.requiredTrue]
    });
  }

  enviarSolicitud(): void {
    if (this.formularioMantenimiento.invalid) {
      alert('⚠️ Por favor completa todos los campos requeridos');
      return;
    }

    const datos = this.formularioMantenimiento.value;

    this.http.post('http://127.0.0.1:8000/api/solicitudes', datos).subscribe({
      next: (res: any) => {
        alert('✅ Solicitud registrada correctamente');
        this.formularioMantenimiento.reset();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al registrar la solicitud');
      }
    });
  }
}
