import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { CitasComponent } from './components/citas/citas.component';
import { ConferenciasComponent } from './components/conferencias/conferencias.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ObtenerUsuariosComponent } from './components/obtener-usuarios/obtener-usuarios.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AutenticacionGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'citas',
    component: CitasComponent,
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'conferencias',
    component: ConferenciasComponent,
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'obtener-usuarios',
    component: ObtenerUsuariosComponent,
    canActivate: [AutenticacionGuard],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
