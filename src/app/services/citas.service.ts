import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CitaModel } from '../models/cita.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private url: string = 'https://naqui-app-default-rtdb.firebaseio.com/citas';

  constructor(private http: HttpClient) {}

  obtenerCita(id: string) {
    return this.http.get(`${this.url}/${id}.json`).pipe(
      map((resp: CitaModel) => {
        resp.id = id;
        return resp;
      })
    );
  }

  obtenerCitas(idEmpresa: string) {
    return this.http.get(`${this.url}.json`).pipe(
      map((resp) => {
        const citas: CitaModel[] = this.crearArreglo(resp).filter(
          (cita) =>
            cita.idEmp == localStorage.getItem('token') &&
            cita.idEmpresa == idEmpresa
        );
        if (citas.length > 0) {
          return citas;
        } else {
          return [];
        }
      })
    );
  }

  crearCita(cita: CitaModel) {
    return this.http.post(`${this.url}.json`, cita).pipe(
      map((resp: any) => {
        cita.id = resp.name;
        return cita;
      })
    );
  }

  actualizarCita(cita: CitaModel) {
    const citaTemp: CitaModel = {
      ...cita,
    };

    delete citaTemp.id;

    return this.http.put(`${this.url}/${cita.id}.json`, citaTemp);
  }

  eliminarCita(id: string) {
    return this.http.delete(`${this.url}/${id}.json`);
  }

  private crearArreglo(obj: object): CitaModel[] {
    const citas: CitaModel[] = [];

    Object.keys(obj).forEach((key) => {
      const cita: CitaModel = obj[key];
      cita.id = key;
      citas.push(cita);
    });

    if (obj === null) return [];

    return citas;
  }
}
