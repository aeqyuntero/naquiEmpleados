import { EmpresaModel } from './empresa.model';

export class ConferenciaModel {
  id: string;
  idEmp: string;
  url: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  empresas: EmpresaModel[];

  constructor() {
    this.empresas = [];
    this.url = '';
  }
}
