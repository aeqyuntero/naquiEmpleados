import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../models/empleado.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EmpresasEmpleadoModel } from '../models/empresas.empleado.model';
import { EmpresaModel } from '../models/empresa.model';

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

  obtenerEmpresasEmpleado() {
    return this.http
      .get<EmpresaModel[]>(`${this.url}/${localStorage.getItem('token')}.json`)
      .pipe(
        map((resp: any) => {
          let ciclo = true;
          const empresas: EmpresaModel[] = [];
          const empresasEmp = this.crearArregloEmpresasEmpleado(resp.empresas);
          empresasEmp.forEach((emp) => {
            this.http
              .get(
                `https://naqui-app-default-rtdb.firebaseio.com/empresas/${emp.idEmpresa}.json`
              )
              .subscribe((empresa: EmpresaModel) => {
                empresa.id = emp.idEmpresa;
                if (emp.activo) {
                  empresas.push(empresa);
                }
              });
          });
          return empresas;
        })
      );
  }

  private crearArregloEmpresasEmpleado(obj: object) {
    const empresas: EmpresasEmpleadoModel[] = [];

    Object.keys(obj).forEach((key) => {
      const empresa: EmpresasEmpleadoModel = obj[key];
      empresa.id = key;
      empresas.push(empresa);
    });

    if (obj === null) return [];

    return empresas;
  }
}
