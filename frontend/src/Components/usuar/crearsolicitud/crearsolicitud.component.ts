import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crearsolicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './crearsolicitud.component.html',
  styleUrls: ['./crearsolicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  formularioMantenimiento!: FormGroup;
  apiUrl = 'http://127.0.0.1:8000/api/solicitud';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.formularioMantenimiento = this.fb.group({
      numControl: [localStorage.getItem('numControl'), Validators.required],
      marca: ['', Validators.required],
      color: ['', Validators.required],
      sistemaOperativo: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      mensajeError: ['', Validators.required],
      instalaRam: [false],
      instalaSsd: [false],
      mantenimiento: [false],
      instalaPrograma: [false],
      nombrePrograma: [''],
      aceptaConfirmacion: [false, Validators.requiredTrue]
    });

    this.formularioMantenimiento.get('instalaPrograma')?.valueChanges.subscribe(valor => {
      const nombrePrograma = this.formularioMantenimiento.get('nombrePrograma');
      if (valor) nombrePrograma?.setValidators([Validators.required]);
      else nombrePrograma?.clearValidators();
      nombrePrograma?.updateValueAndValidity();
    });
  }

  enviarSolicitud(): void {
    if (this.formularioMantenimiento.valid) {
      this.http.post(this.apiUrl, this.formularioMantenimiento.value).subscribe({
        next: () => {
          alert('✅ Solicitud enviada correctamente');
          this.formularioMantenimiento.reset();
        },
        error: (err) => {
          console.error('Error:', err);
          alert('❌ Ocurrió un error al enviar la solicitud');
        }
      });
    } else {
      alert('⚠️ Por favor completa todos los campos requeridos');
    }
  }

  abrirModal() {
    const modal = document.getElementById('modalTerminos');
    if (modal) modal.style.display = 'flex';
  }

  cerrarModal() {
    const modal = document.getElementById('modalTerminos');
    if (modal) modal.style.display = 'none';
  }
}
