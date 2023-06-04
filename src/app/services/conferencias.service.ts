import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConferenciaModel } from '../models/conferencia.model';
import { EmpresasEmpleadoModel } from '../models/empresas.empleado.model';
import { map } from 'rxjs/operators';
import { EmpresaModel } from '../models/empresa.model';

@Injectable({
  providedIn: 'root',
})
export class ConferenciasService {
  private url: string =
    'https://naqui-app-default-rtdb.firebaseio.com/conferencias';

  constructor(private http: HttpClient) {}

  obtenerConferencias() {
    return this.http.get(`${this.url}.json`).pipe(
      map((resp) => {
        if (resp == null || resp == undefined) {
          return [];
        }
        let conferencias: ConferenciaModel[] =
          this.crearArregloConferencias(resp);
        if (conferencias.length == 0) {
          return [];
        }
        conferencias = conferencias.filter(
          (conf) => conf.idEmp == localStorage.getItem('token')
        );
        if (conferencias.length == 0) {
          return [];
        }
        conferencias.forEach((conf) => {
          conf.empresas = this.crearArregloEmpresasConferencia(conf.empresas);
        });
        return conferencias;
      })
    );
  }

  obtenerConferencia(id: string) {
    return this.http.get(`${this.url}/${id}.json`);
    /*.pipe(
      map((resp: any) => {
        console.log('7. obtener Conferencia');
        console.log(resp);
        resp.empresas = this.crearArregloEmpresasConferencia(resp.empresas);
        console.log('8. obtener Conferencia arreglo empresas');
        console.log(resp);
        return resp;
      })
    );*/
  }

  private crearArregloConferencias(obj: object) {
    const conferencias: ConferenciaModel[] = [];

    Object.keys(obj).forEach((key) => {
      const conferencia: ConferenciaModel = obj[key];
      conferencia.id = key;
      conferencias.push(conferencia);
    });

    if (obj === null) return [];

    return conferencias;
  }

  private crearArregloEmpresasConferencia(obj: object) {
    const empresaConferencias: EmpresaModel[] = [];

    Object.keys(obj).forEach((key) => {
      const empresaConferencia: EmpresaModel = obj[key];
      empresaConferencia.id = key;
      empresaConferencias.push(empresaConferencia);
    });

    if (obj === null) return [];

    return empresaConferencias;
  }

  actualizarConferencia(conferencia: ConferenciaModel) {
    const conferenciaTemp = {
      ...conferencia,
    };

    delete conferenciaTemp.id;

    /*if (conferenciaTemp.empresas != null) {
      conferenciaTemp.empresas.forEach((empresa) => delete empresa.id);
    }*/

    return this.http.put(`${this.url}/${conferencia.id}.json`, conferenciaTemp);
  }

  eliminarConferencia(id: string) {
    return this.http.delete(`${this.url}/${id}.json`);
  }

  crearConferencia(conferencia: ConferenciaModel) {
    return this.http.post(`${this.url}.json`, conferencia).pipe(
      map((resp: any) => {
        conferencia.id = resp.name;
        return conferencia;
      })
    );
  }
}
