import { Component, OnInit } from '@angular/core';
import { OracleService } from '../oracle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso',
  templateUrl: './paso.component.html',
  styleUrls: ['./paso.component.scss']
})
export class PasoComponent implements OnInit {

	paso: any;
	mostrarReservas: boolean;
	reservas: any[];
	fechaSeleccionada: boolean;
	pasos: any[];
	mostrarPasos: boolean;
	reserva: any;
	permitirRegistrarPaso: boolean;
	registrandoPaso: boolean;
	clientes: any[];
	tiposCarga: any[];
	permitirVerTripulacion: boolean;
	mostrarTripulantes: boolean;
	tripulantes: any[];
	tripulante: any;
	permitirAgregarTripulante: boolean;
	registrandoTripulante: boolean;

  constructor(private router: Router, private oracle:  OracleService) { }

  ngOnInit() {
  	if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
  	} else {
  	  this.registrandoTripulante = false;
  	  this.permitirAgregarTripulante = false;
  	  this.mostrarTripulantes = false;
  	  this.permitirVerTripulacion = false;
  	  this.mostrarReservas = false;
  	  this.fechaSeleccionada = false;
  	  this.permitirRegistrarPaso = false;
  	  this.paso = {};
  	  this.getClientes();
  	  this.getTiposCarga();
  	}
  }

  crearTripulante(){
  	this.registrandoTripulante = true;
    this.oracle.postTripulantePaso(this.tripulante)
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.registrandoTripulante = false;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.registrandoTripulante = false;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.registrandoTripulante = false;
          alert(error)
        });  
  }

  agregarTripulante(paso: any){
  	this.tripulante = {
  		K_ID: paso.K_ID,
  	}
  	this.permitirAgregarTripulante = true;
  }

  verTripulacion(paso: any){
    //Obtener reservas
    this.permitirVerTripulacion = true;
    this.mostrarTripulantes = false;
	  this.oracle.getTripulantesPaso(paso)
	    .toPromise()
	      .then((resReservas: any) => {
	          if(JSON.parse(resReservas._body).clase == undefined){
	            //Si no hay error
	            this.tripulantes = JSON.parse(resReservas._body).response;
	            this.mostrarTripulantes = true;
	          } else {
	            //Si hay error lo muestra
	            this.mostrarTripulantes = true;
	            alert(JSON.stringify(JSON.parse(resReservas._body)));
	          }
	        })
	      .catch((error) => {
	        this.mostrarTripulantes = true;
	          alert(error)
	        });  
  }

  getClientes(){
  	this.oracle.getClientes()
      .toPromise()
        .then((res: any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.clientes = JSON.parse(res._body).response;
          } else {
            //Si hay error lo muestra
            alert(JSON.stringify(JSON.parse(res._body)));
          }
        })
        .catch((error) => {
          alert(error)
        });
  }

  getTiposCarga(){
  	this.oracle.getTipoCarga()
      .toPromise()
        .then((res: any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.tiposCarga = JSON.parse(res._body).response;            
          } else {
            //Si hay error lo muestra
            alert(JSON.stringify(JSON.parse(res._body)));
          }
        })
        .catch((error) => {
          alert(error)
        });
  }

  registrarPaso(reserva: any){
  	this.paso = {
  		N_SENTIDO: reserva.N_SENTIDO,
  		K_BUQUE: reserva.K_SIN,
  		N_USUARIO: localStorage.getItem("user"),
  		K_RESERVA: reserva.K_NUMERO_RESERVA,
  		F_PASO: reserva.F_RESERVA
  	}
  	this.permitirRegistrarPaso = true;
  }

  crearPaso(){
  	this.registrandoPaso = true;
    this.oracle.postPaso(this.paso)
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.registrandoPaso = false;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.registrandoPaso = false;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.registrandoPaso = false;
          alert(error)
        });  
  }

  buscarReservas(){
    //Obtener reservas
    this.fechaSeleccionada = true;
    this.mostrarReservas = false;
	  this.oracle.getReservasFecha(this.paso.F_PASO_TEMPORAL)
	    .toPromise()
	      .then((resReservas: any) => {
	          if(JSON.parse(resReservas._body).clase == undefined){
	            //Si no hay error
	            this.reservas = JSON.parse(resReservas._body).response;
	            this.mostrarReservas = true;
	          } else {
	            //Si hay error lo muestra
	            this.mostrarReservas = true;
	            alert(JSON.stringify(JSON.parse(resReservas._body)));
	          }
	        })
	      .catch((error) => {
	        this.mostrarReservas = true;
	          alert(error)
	        });  
  }

  buscarPasos(){
  	this.fechaSeleccionada = true;
  	this.mostrarPasos = false;
  	 this.oracle.getPasosFecha(this.paso.F_PASO_TEMPORAL)
	    .toPromise()
	      .then((resReservas: any) => {
	          if(JSON.parse(resReservas._body).clase == undefined){
	            //Si no hay error
	            this.pasos = JSON.parse(resReservas._body).response;
	            this.mostrarPasos = true;
	          } else {
	            //Si hay error lo muestra
	            this.mostrarPasos = true;
	            alert(JSON.stringify(JSON.parse(resReservas._body)));
	          }
	        })
	      .catch((error) => {
	        this.mostrarPasos = true;
	          alert(error)
	        });  
  }

}
