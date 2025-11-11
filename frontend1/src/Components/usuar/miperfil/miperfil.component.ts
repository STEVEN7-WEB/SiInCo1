import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  usuario = {
    nombre: 'Sergio Steven Martínez Martínez',
    numControl: '21690067',
    carrera: 'Ingeniería en Sistemas Computacionales',
    celular: '55 1234 5678',
    preguntaSeguridad: 'Nombre de tu primera mascota',
    respuestaSeguridad: 'Rocky'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí podrías cargar los datos reales desde un servicio o localStorage
  }

  irAActualizar() {
    this.router.navigate(['/actualizar-perfil']);
  }
}
