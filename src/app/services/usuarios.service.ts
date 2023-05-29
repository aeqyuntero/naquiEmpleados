import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private url: string =
    'https://naqui-app-default-rtdb.firebaseio.com/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuario(id: string) {
    return this.http.get(`${this.url}/${id}.json`);
  }
}
