import { Component, OnInit } from '@angular/core';
import { EmpleadoModel } from '../../models/empleado.model';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';
import { EmpresasEmpleadoModel } from 'src/app/models/empresas.empleado.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = this.fb.group({
    usuario: [, Validators.required],
    contrasena: [, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private empleadosService: EmpleadosService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();

      return;
    }

    const empleado: EmpleadoModel = {
      id: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      cedula: '',
      direccion: '',
      correo: '',
      telefono: 0,
      edad: 0,
      genero: '',
      ocupacion: '',
      activo: true,
      usuario: this.formulario.controls['usuario'].value,
      contrasena: this.formulario.controls['contrasena'].value,
      fecha: '',
      empresas: [],
    };

    console.log(empleado.usuario);

    this.empleadosService
      .obtenerEmpleado(empleado)
      .subscribe((resp: EmpleadoModel) => {
        if (resp) {
          Swal.fire({
            icon: 'success',
            title: 'Login Exitoso',
          }).then(() => {
            localStorage.setItem('usuario', resp.usuario);
            localStorage.setItem('token', resp.id);

            this.router.navigate(['home']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login no válido',
            text: 'El usuario o la contraseña deben ser incorrectos',
          }).then(() => {
            this.formulario.reset();
          });
        }
      });
  }

  campoNoValido(campo: string) {
    return (
      this.formulario.controls[campo].errors &&
      this.formulario.controls[campo].touched
    );
  }
}
