import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crearsolicitud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  templateUrl: './crearsolicitud.component.html',
  styleUrls: ['./crearsolicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  formularioMantenimiento!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioMantenimiento = this.fb.group({
      marca: ['', Validators.required],
      color: ['', Validators.required],
      sistemaOperativo: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      mensajeError: [''],

      // Cuadrados de selección
      instalaRam: [false],
      instalaSsd: [false],
      mantenimiento: [false],
      instalaPrograma: [false],
      nombrePrograma: [''],

      // Confirmación
      aceptaConfirmacion: [false, Validators.requiredTrue]
    });

    this.formularioMantenimiento.get('instalaPrograma')?.valueChanges.subscribe(valor => {
      const nombrePrograma = this.formularioMantenimiento.get('nombrePrograma');
      if (valor) {
        nombrePrograma?.setValidators([Validators.required]);
      } else {
        nombrePrograma?.clearValidators();
      }
      nombrePrograma?.updateValueAndValidity();
    });
  }

  enviarSolicitud(): void {
    if (this.formularioMantenimiento.valid) {
      console.log('Solicitud enviada:', this.formularioMantenimiento.value);
      alert('✅ Solicitud enviada correctamente');
      this.formularioMantenimiento.reset();
    } else {
      alert('⚠️ Por favor completa todos los campos requeridos');
    }
  }
}
