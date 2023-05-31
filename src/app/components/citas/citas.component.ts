import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { CitasService } from '../../services/citas.service';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpresaModel } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
})
export class CitasComponent implements OnInit {
  idEmpresa: string = '';
  citas = [];
  empresas: EmpresaModel[] = [];
  cargandoEmp = true;
  cargandoCitas = true;
  seleccionEmp = false;

  constructor(
    private usuariosService: UsuariosService,
    private citasServices: CitasService,
    private empleadosService: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.empleadosService
      .obtenerEmpresasEmpleado()
      .subscribe((resp: EmpresaModel[]) => {
        this.empresas = resp;
        this.cargandoEmp = false;
      });
  }

  obtenerCitas() {
    this.seleccionEmp = true;
    this.cargandoCitas = true;
    this.citas = [];
    this.citasServices.obtenerCitas(this.idEmpresa).subscribe((resp: any[]) => {
      if (resp.length == 0) {
        this.cargandoCitas = false;
        return;
      }
      resp.forEach((cita) => {
        console.log(cita);
        this.usuariosService
          .obtenerUsuario(cita.idUsuario)
          .subscribe((usuario: UsuarioModel) => {
            console.log(usuario);
            this.citas.push({
              ...cita,
              nombreUsuario:
                usuario.primerNombre + ' ' + usuario.primerApellido,
            });
            this.cargandoCitas = false;
          });
      });
    });
  }

  eliminarCita(cita) {
    Swal.fire({
      icon: 'question',
      title: 'Confirmar',
      text: '¿Estás seguro(a) de que quieres eliminar esta cita?',
      showCancelButton: true,
    }).then((confirmar) => {
      if (confirmar.isConfirmed) {
        this.citas = this.citas.filter((citaArr) => citaArr.id != cita.id);
        this.citasServices.eliminarCita(cita.id).subscribe();
        //window.location.reload();
      }
    });
  }

  get getCargandoEmp(): boolean {
    return this.cargandoEmp;
  }

  get getCargandoCitas(): boolean {
    return this.cargandoCitas;
  }

  get existenRegistros(): boolean {
    return this.citas.length != 0;
  }

  get getSeleccionEmp(): boolean {
    return this.seleccionEmp;
  }

  obtenerNombreEmpresa(idEmpresa: string) {
    return this.empresas.find((empresa) => empresa.id == idEmpresa).nombre;
  }
}
