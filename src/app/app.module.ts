import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CitasComponent } from './components/citas/citas.component';
import { ConferenciasComponent } from './components/conferencias/conferencias.component';
import { CitaComponent } from './components/cita/cita.component';
import { ConferenciaComponent } from './components/conferencia/conferencia.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ObtenerUsuariosComponent } from './components/obtener-usuarios/obtener-usuarios.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CitasComponent,
    ConferenciasComponent,
    CitaComponent,
    ConferenciaComponent,
    UsuariosComponent,
    UsuarioComponent,
    ObtenerUsuariosComponent,
    NavbarComponent,
    FechaPipe,
    DomseguroPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
