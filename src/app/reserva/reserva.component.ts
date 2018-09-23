import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OracleService } from '../oracle.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  mostrarReservas: boolean;
  registrandoReserva: boolean;
  formAgregarReserva: boolean;
  verificando: boolean;
  reservas: any[];
  buques: any[];
  reserva: any;
  cuposDisponibles: boolean;
  dateToday: string  = new Date().toJSON().split('T')[0];

  constructor(private router: Router, private oracle:  OracleService) { }

  ngOnInit() {
  	if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
  	} else {
  	  this.mostrarReservas = false;
  	  this.registrandoReserva = false;
  	  this.formAgregarReserva = false;
  	  this.cuposDisponibles = false;
  	  this.verificando = false;
  	  this.reservas = [];
  	  this.reserva = {};
  	  //Obtener reservas
  	  this.oracle.getReservas(localStorage.getItem("user"))
  	  	.toPromise()
  	  		.then((resReservas: any) => {
	            if(JSON.parse(resReservas._body).clase == undefined){
	              //Si no hay error
	              this.reservas = JSON.parse(resReservas._body).response;
	              //Obtener buques
			  	  this.oracle.getBuques(localStorage.getItem("user"))
			  	  	.toPromise()
			  	  		.then((resBuques: any) => {
				            if(JSON.parse(resBuques._body).clase == undefined){
				              //Si no hay error
				              this.buques = JSON.parse(resBuques._body).response;
				              this.mostrarReservas = true;
				            } else {
				              //Si hay error lo muestra
				              this.mostrarReservas = true;
				              alert(JSON.stringify(JSON.parse(resBuques._body)));
				            }
			          	})
			  	  		.catch((error) => {
			  	  			this.mostrarReservas = true;
			            	alert(error)
          				});	
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
  }

  verificarDisponibilidad(){
  	this.verificando = true;
    this.oracle.getDisponibilidad(this.reserva.buque.N_TIPO_BUQUE,this.reserva.F_FECHA)
      .toPromise()
        .then((res:any) => {
          console.log(res);
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.verificando = false;
            this.cuposDisponibles = JSON.parse(res._body).disponibles>0;
            alert(JSON.stringify(JSON.parse(res._body)));
          } else {
            //Si hay error lo muestra
            this.verificando = false;
            alert(JSON.stringify(JSON.parse(res._body)));
          }
        })
        .catch((error) => {
          this.verificando = false;
          alert(error)
        }); 
  }

  crearReserva(){
  	this.reserva.K_BUQUE = this.reserva.buque.K_SIN;
  	this.reserva.tipoBuque = this.reserva.buque.N_TIPO_BUQUE;
  	this.registrandoReserva = true;
  	this.oracle.postReserva(this.reserva)
	  	.toPromise()
	        .then((res:any) => {
	          if(JSON.parse(res._body).clase == undefined){
	            //Si no hay error
	            this.registrandoReserva = false;
	            this.ngOnInit();
	          } else {
	            //Si hay error lo muestra
	            this.registrandoReserva = false;
	          }
	          alert(JSON.stringify(JSON.parse(res._body)));
	        })
	        .catch((error) => {
	          this.registrandoReserva = false;
	          alert(error)
	        });  
  	}

	eliminarReserva(reserva: any){
  	this.mostrarReservas = false;
  	this.oracle.deleteReserva(reserva.K_NUMERO,reserva.F_FECHA,reserva.N_TIPO_BUQUE)
	  	.toPromise()
	        .then((res:any) => {
	          if(JSON.parse(res._body).clase == undefined){
	            //Si no hay error
	            this.mostrarReservas = true;
	            this.ngOnInit();
	          } else {
	            //Si hay error lo muestra
	            this.mostrarReservas = true;
	          }
	          alert(JSON.stringify(JSON.parse(res._body)));
	        })
	        .catch((error) => {
	          this.mostrarReservas = true;
	          alert(error)
	        });  
  	}  

}
