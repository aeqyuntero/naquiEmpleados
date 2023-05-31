import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';

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

  obtenerUsuarios(idEmpresa: string) {
    return this.http.get(`${this.url}.json`).pipe(
      map((resp) => {
        const usuarios = this.crearArreglo(resp).filter(
          (usuario) => usuario.idEmpresa == idEmpresa
        );
        if (usuarios.length > 0) {
          return usuarios;
        } else {
          return [];
        }
      })
    );
  }

  private crearArreglo(obj: object) {
    const usuarios: UsuarioModel[] = [];

    Object.keys(obj).forEach((key) => {
      const usuario: UsuarioModel = obj[key];
      usuario.id = key;
      usuarios.push(usuario);
    });

    if (obj === null) return [];

    return usuarios;
  }

  actualizarUsuario(usuario: UsuarioModel) {
    const usuarioTemp = {
      ...usuario,
    };

    delete usuarioTemp.id;

    return this.http.put(
      `${this.url}/usuarios/${usuario.id}.json`,
      usuarioTemp
    );
  }

  crearUsuario(usuario: UsuarioModel) {
    return this.http.post(`${this.url}.json`, usuario).pipe(
      map((resp: any) => {
        usuario.id = resp.name;
        return usuario;
      })
    );
  }
}
