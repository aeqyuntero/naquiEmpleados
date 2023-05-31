import { EmpresasEmpleadoModel } from './empresas.empleado.model';

export class EmpleadoModel {
  id: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  cedula: string;
  direccion: string;
  correo: string;
  telefono: number;
  edad: number;
  genero: string;
  ocupacion: string;
  activo: boolean;
  usuario: string;
  contrasena: string;
  fecha: string;
  empresas: EmpresasEmpleadoModel[];

  constructor() {
    this.empresas = [];
    this.activo = true;
    this.segundoNombre = '';
    this.segundoApellido = '';
  }
}
