import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioSesionComponent } from '../Components/inicio-sesion/inicio-sesion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InicioSesionComponent], // ← Importa aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SiInCo1';
}