import { Component, OnInit } from '@angular/core';
import { EmpresaModel } from 'src/app/models/empresa.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  idEmpresa: string = '';
  usuarios = [];
  empresas: EmpresaModel[] = [];
  cargandoEmp = true;
  cargandoUsuarios = true;
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
    this.cargandoUsuarios = true;
    this.usuarios = [];
    this.usuariosService
      .obtenerUsuarios(this.idEmpresa)
      .subscribe((resp: any[]) => {
        if (resp.length == 0) {
          this.cargandoUsuarios = false;
          return;
        }
        resp.forEach((usuario: UsuarioModel) => {
          this.usuarios.push(usuario);
        });
        this.cargandoUsuarios = false;
      });
  }

  get getCargandoEmp(): boolean {
    return this.cargandoEmp;
  }

  get getCargandoUsuarios(): boolean {
    return this.cargandoUsuarios;
  }

  get existenRegistros(): boolean {
    return this.usuarios.length != 0;
  }

  get getSeleccionEmp(): boolean {
    return this.seleccionEmp;
  }

  getNombre(usuario: UsuarioModel) {
    return usuario.primerNombre + ' ' + usuario.primerApellido;
  }

  cambiarEstadoUsuario(usuario: UsuarioModel) {
    Swal.fire({
      title: 'Confirmar',
      text: `¿Está seguro de que desea cambiar el estado del usuario de ${
        usuario.activo
      }
        )} a ${!usuario.activo}?`,
      icon: 'warning',
      showCancelButton: true,
    }).then((confirmar) => {
      if (confirmar.isConfirmed) {
        usuario.activo = !usuario.activo;
        this.usuariosService.actualizarUsuario(usuario).subscribe();
      }
    });
  }
}
