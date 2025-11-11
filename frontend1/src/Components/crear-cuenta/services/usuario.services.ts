import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // 1. Asegúrate de que esta URL sea correcta.
  // Es la URL de tu backend Laravel (normalmente puerto 8000)
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  /**
   * Registra un nuevo usuario.
   * @param datos Los datos del formulario de registro.
   */
  registrarUsuario(datos: any): Observable<any> {
    // 2. Asegúrate de que la ruta sea '/registrar'
    // La URL completa será: http://localhost:8000/api/registrar
    return this.http.post(`${this.apiUrl}/registrar`, datos);
  }

  // Aquí puedes añadir más métodos (login, etc.)
  
}