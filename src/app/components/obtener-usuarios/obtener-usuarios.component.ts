import { Component, OnInit } from '@angular/core';
import { EmpresaModel } from 'src/app/models/empresa.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-obtener-usuarios',
  templateUrl: './obtener-usuarios.component.html',
  styleUrls: ['./obtener-usuarios.component.css'],
})
export class ObtenerUsuariosComponent implements OnInit {
  idEmpresa: string = '';
  usuarios: UsuarioModel[] = [];
  empresas: EmpresaModel[] = [];
  cargandoEmp = true;
  cargandoCorreos = true;
  seleccionEmp = false;

  constructor(
    private empleadosService: EmpleadosService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.empleadosService
      .obtenerEmpresasEmpleado()
      .subscribe((resp: EmpresaModel[]) => {
        this.empresas = resp;
        this.cargandoEmp = false;
      });
  }

  obtenerUsuarios() {
    this.seleccionEmp = true;
    this.cargandoCorreos = true;
    this.usuarios = [];
    this.usuariosService
      .obtenerUsuarios(this.idEmpresa)
      .subscribe((resp: any[]) => {
        if (resp.length == 0) {
          this.cargandoCorreos = false;
          return;
        }
        resp.forEach((usuario: UsuarioModel) => {
          this.usuarios.push(usuario);
        });
        this.cargandoCorreos = false;
      });
  }

  get getCargandoEmp(): boolean {
    return this.cargandoEmp;
  }

  get getCargandoCorreos(): boolean {
    return this.cargandoCorreos;
  }

  get existenRegistros(): boolean {
    return this.usuarios.length != 0;
  }

  get getSeleccionEmp(): boolean {
    return this.seleccionEmp;
  }

  getCorreos(): string {
    let texto: string = '';
    this.usuarios.forEach((usuario) => {
      texto += usuario.correo + '\n';
    });
    return texto;
  }
}
