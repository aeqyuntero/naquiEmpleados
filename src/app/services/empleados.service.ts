import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../models/empleado.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private url: string =
    'https://naqui-app-default-rtdb.firebaseio.com/empleados';

  constructor(private http: HttpClient) {}

  obtenerEmpleado(empleado: EmpleadoModel) {
    return this.http.get(`${this.url}.json`).pipe(
      map((resp: any[]) => {
        let empleadoValido: EmpleadoModel = null;
        const empleados = this.crearArreglo(resp);
        empleados.forEach((emp) => {
          if (
            emp.usuario == empleado.usuario &&
            emp.contrasena == empleado.contrasena
          ) {
            empleadoValido = emp;
          }
        });
        return empleadoValido;
      })
    );
  }

  private crearArreglo(obj: object) {
    const empleados: EmpleadoModel[] = [];

    Object.keys(obj).forEach((key) => {
      const empleado: EmpleadoModel = obj[key];
      empleado.id = key;
      empleados.push(empleado);
    });

    if (obj === null) return [];

    return empleados;
  }
}
