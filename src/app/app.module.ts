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
import { CupoComponent } from './cupo/cupo.component';
import { DisponibilidadComponent } from './disponibilidad/disponibilidad.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { SubastaComponent } from './subasta/subasta.component';
import { PasoComponent } from './paso/paso.component';
import { PagoComponent } from './pago/pago.component';
import { BancoService } from './services/banco.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    BuqueComponent,
    ClienteComponent,
    CupoComponent,
    DisponibilidadComponent,
    ReservaComponent,
    ProgramacionComponent,
    SubastaComponent,
    PasoComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [
      OracleService,
      BancoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
