import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componentes para routing
import { HomeComponent } from './home/home.component'
import { AddUserComponent } from './add-user/add-user.component'
import { BuqueComponent } from './buque/buque.component'
import { ClienteComponent } from './cliente/cliente.component'
import { CupoComponent } from './cupo/cupo.component'
import { DisponibilidadComponent } from './disponibilidad/disponibilidad.component'
import { ReservaComponent } from './reserva/reserva.component'
import { ProgramacionComponent } from './programacion/programacion.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'addUser',
    component: AddUserComponent
  },
  {
    path: 'buque',
    component: BuqueComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'cupo',
    component: CupoComponent
  },
  {
    path: 'disponibilidad',
    component: DisponibilidadComponent
  },
  {
    path: 'reserva',
    component: ReservaComponent
  },
  {
    path: 'programacion',
    component: ProgramacionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
