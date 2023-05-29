export class UsuarioModel {
  id: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  cedula: string;
  direccion: string;
  telefono: number;
  edad: number;
  genero: string;
  activo: boolean;
  usuario: string;
  contrasena: string;
  idEmpresa: string;

  constructor() {
    this.activo = true;
    this.segundoNombre = '';
    this.segundoApellido = '';
  }
}
