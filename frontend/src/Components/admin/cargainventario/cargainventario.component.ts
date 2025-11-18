import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventarioService } from './services/inventario';

@Component({
  selector: 'app-cargainventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cargainventario.component.html',
  styleUrls: ['./cargainventario.component.css'],
})
export class CargainventarioComponent {

  inventarioForm: FormGroup;
  toastVisible = false;

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService
  ) {
    this.inventarioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [1, [Validators.required, Validators.min(1)]],
    });
  }

  mostrarToast() {
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

  enviarInventario() {
    if (this.inventarioForm.invalid) return;

    this.inventarioService.guardarInventario(this.inventarioForm.value)
      .subscribe({
        next: (resp) => {
          console.log('Enviado al backend:', resp);
          this.mostrarToast();
          this.inventarioForm.reset({
            nombre: '',
            descripcion: '',
            cantidad: 1,
            precio: 1
          });
        },
        error: (err) => console.error('Error al enviar:', err),
      });
  }
}
