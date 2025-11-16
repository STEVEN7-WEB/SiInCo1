import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://127.0.0.1:8000/api/usuario';

  constructor(private http: HttpClient) { }

  obtenerUsuario(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${user_id}`);
  }

  // Puedes agregar otros métodos, por ejemplo para actualizar datos, cambiar contraseña, etc.
}
