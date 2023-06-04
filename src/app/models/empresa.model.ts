export class EmpresaModel {
  id: string;
  nit: string;
  nombre: string;
  direccion: string;
  telefono: string;
  fecha: string;
  activo: boolean;

  constructor() {
    this.activo = true;
    this.id = '';
  }
}
