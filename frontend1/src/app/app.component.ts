import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioSesionComponent } from '../Components/inicio-sesion/inicio-sesion.component';
import { CrearCuentaComponent } from '../Components/crear-cuenta/crear-cuenta.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {}
