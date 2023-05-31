import { Component, OnInit } from '@angular/core';
import { ConferenciaModel } from 'src/app/models/conferencia.model';
import { ConferenciasService } from 'src/app/services/conferencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.component.html',
  styleUrls: ['./conferencias.component.css'],
})
export class ConferenciasComponent implements OnInit {
  conferencias: ConferenciaModel[];
  cargando = true;

  constructor(private conferenciasServices: ConferenciasService) {}

  ngOnInit(): void {
    this.conferenciasServices.obtenerConferencias().subscribe((resp) => {
      this.conferencias = resp;
      this.cargando = false;
    });
  }

  get getCargandoConferencias() {
    return this.cargando;
  }

  get existenRegistros() {
    return this.conferencias.length != 0;
  }

  eliminarConferencia(conferencia: ConferenciaModel) {
    Swal.fire({
      icon: 'question',
      title: 'Confirmar',
      text: '¿Estás seguro(a) de que quieres eliminar esta conferencia?',
      showCancelButton: true,
    }).then((confirmar) => {
      if (confirmar.isConfirmed) {
        this.conferencias = this.conferencias.filter(
          (conferenciaArr) => conferenciaArr.id != conferencia.id
        );
        this.conferenciasServices
          .eliminarConferencia(conferencia.id)
          .subscribe();
        //window.location.reload();
      }
    });
  }
}
