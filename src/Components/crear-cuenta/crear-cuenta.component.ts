import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crear-cuenta.component.html',  // ✅ tu HTML aquí
  styleUrls: ['./crear-cuenta.component.css']    // ✅ tu CSS aquí
})
export class CrearCuentaComponent {}
