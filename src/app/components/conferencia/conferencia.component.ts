import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ConferenciaModel } from 'src/app/models/conferencia.model';
import { EmpresaModel } from 'src/app/models/empresa.model';
import { ConferenciasService } from 'src/app/services/conferencias.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conferencia',
  templateUrl: './conferencia.component.html',
  styleUrls: ['./conferencia.component.css'],
})
export class ConferenciaComponent implements OnInit {
  conferencia = new ConferenciaModel();

  constructor(
    private empleadosService: EmpleadosService,
    private conferenciasService: ConferenciasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.conferenciasService
        .obtenerConferencia(id)
        .subscribe((resp: ConferenciaModel) => {
          this.conferencia = resp;
          this.conferencia.id = id;
        });
    } else {
      this.empleadosService.obtenerEmpresasEmpleado().subscribe((resp) => {
        this.conferencia.empresas = resp;
        this.conferencia.idEmp = localStorage.getItem('token');
      });
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

    if (
      this.conferencia.id != '' &&
      this.conferencia.id != null &&
      this.conferencia.id != undefined
    ) {
      peticion = this.conferenciasService.actualizarConferencia(
        this.conferencia
      );
    } else {
      peticion = this.conferenciasService.crearConferencia(this.conferencia);
    }

    peticion.subscribe(() => {
      Swal.fire({
        text: 'Se actualizó correctamente',
        icon: 'success',
      });
    });
  }

  get urlYoutube() {
    return (
      this.conferencia.url.includes('https://www.youtube.com/embed/') ||
      this.conferencia.url.includes('http://www.youtube.com/embed/')
    );
  }

  get sinEmpresas() {
    return this.conferencia.empresas.length == 0;
  }
}
