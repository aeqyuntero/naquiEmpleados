import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'naquiEmpleados';

  ngOnInit() {}

  get isVisible() {
    return (
      localStorage.getItem('token') != null &&
      localStorage.getItem('token') != undefined
    );
  }
}
