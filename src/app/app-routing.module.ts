import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Componentes para routing
import { HomeComponent } from './home/home.component'
import { AddUserComponent } from './add-user/add-user.component'
import { BuqueComponent } from './buque/buque.component'

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
