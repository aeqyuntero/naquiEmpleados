import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuario = new UsuarioModel();

  constructor(
    private usuariosService: UsuariosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    const idEmpresa: string = this.route.snapshot.paramMap.get('idEmpresa');

    if (id !== 'nuevo') {
      this.usuariosService
        .obtenerUsuario(id)
        .subscribe((resp: UsuarioModel) => {
          this.usuario = resp;
          this.usuario.id = id;
        });
    } else {
      this.usuario.idEmpresa = idEmpresa;
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        title: 'Formulario Inválido',
        text: 'Por favor vuelva a corroborar la información',
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: 'Espere por favor',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.usuario.id) {
      peticion = this.usuariosService.actualizarUsuario(this.usuario);
    } else {
      peticion = this.usuariosService.crearUsuario(this.usuario);
    }

    peticion.subscribe(() => {
      Swal.fire({
        title: this.usuario.primerNombre + ' ' + this.usuario.primerApellido,
        text: 'Se actualizó correctamente',
        icon: 'success',
      });
    });
  }
}
