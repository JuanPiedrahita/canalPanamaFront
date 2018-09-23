import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Componentes
import { HomeComponent } from './home/home.component';

//Modulos
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Servicios
import { HttpModule } from '@angular/http'
import { OracleService } from './oracle.service';
import { AddUserComponent } from './add-user/add-user.component';
import { BuqueComponent } from './buque/buque.component';
import { ClienteComponent } from './cliente/cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    BuqueComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [
      OracleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
