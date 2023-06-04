import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CitaModel } from 'src/app/models/cita.model';
import { CitasService } from 'src/app/services/citas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
})
export class CitaComponent implements OnInit {
  cita = new CitaModel();
  currentDate: string;
  horas: string[] = [
    '08:00 am',
    '09:00 am',
    '10:00 am',
    '11:00 am',
    '12:00 pm',
    '01:00 pm',
    '02:00 pm',
    '03:00 pm',
    '04:00 pm',
    '05:00 pm',
    '06:00 pm',
  ];

  constructor(
    private citasService: CitasService,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.currentDate = today.toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    const idEmp: string = localStorage.getItem('token');
    const idEmpresa = this.route.snapshot.paramMap.get('idEmpresa');

    if (id !== 'nuevo') {
      this.citasService.obtenerCita(id).subscribe((resp: CitaModel) => {
        this.cita = resp;
        this.cita.idEmp = idEmp;
        this.cita.idEmpresa = idEmpresa;
        this.cita.id = id;
      });
    } else {
      this.cita.idEmp = idEmp;
      this.cita.idEmpresa = idEmpresa;
      this.cita.tipoCita = localStorage.getItem('ocupacion');
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

    if (this.cita.id) {
      peticion = this.citasService.actualizarCita(this.cita);
    } else {
      peticion = this.citasService.crearCita(this.cita);
    }

    peticion.subscribe(() => {
      Swal.fire({
        text: 'Se actualizó correctamente',
        icon: 'success',
      });
    });
  }
}
