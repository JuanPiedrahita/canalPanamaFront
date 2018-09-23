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
  permitirEditarReserva: boolean;
  editandoReserva: boolean;
  verificando: boolean;
  cuposNuevaDisponibles: boolean;
  verificandoNueva: boolean;
  reservas: any[];
  buques: any[];
  reserva: any;
  cuposDisponibles: boolean;
  dateToday: string  = new Date().toJSON().split('T')[0];
  reservaTemporal: any;

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
  	  this.permitirEditarReserva = false;
  	  this.editandoReserva = false;
  	  this.cuposNuevaDisponibles = false;
  	  this.verificandoNueva = false;
  	  this.reservas = [];
  	  this.reserva = {};
  	  this.reservaTemporal = {};
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

  nuevaVerificarDisponibilidad(){
  	if(this.reservaTemporal.F_FECHA_NUEVA != this.reservaTemporal.F_FECHA){
  		this.verificandoNueva = true;
    	this.oracle.getDisponibilidad(this.reservaTemporal.N_TIPO_BUQUE,this.reservaTemporal.F_FECHA_NUEVA)
	      .toPromise()
	        .then((res:any) => {
	          console.log(res);
	          if(JSON.parse(res._body).clase == undefined){
	            //Si no hay error
	            this.verificandoNueva = false;
	            this.cuposNuevaDisponibles = JSON.parse(res._body).disponibles>0;
	            alert(JSON.stringify(JSON.parse(res._body)));
	          } else {
	            //Si hay error lo muestra
	            this.verificandoNueva = false;
	            alert(JSON.stringify(JSON.parse(res._body)));
	          }
	        })
	        .catch((error) => {
	          this.verificandoNueva = false;
	          alert(error)
	        }); 
  	} else {
  		alert("Las fechas no pueden ser iguales");
  	}
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

  	editarReserva(reserva: any){
  		this.reservaTemporal = reserva;
  		this.permitirEditarReserva = true;
  	}

  	actualizarReserva(){
  		this.editandoReserva = true;
  		this.oracle.updateReserva(this.reservaTemporal.K_NUMERO,this.reservaTemporal.F_FECHA
  			,this.reservaTemporal.F_FECHA_NUEVA,this.reservaTemporal.N_TIPO_BUQUE)
		  	.toPromise()
		        .then((res:any) => {
		          if(JSON.parse(res._body).clase == undefined){
		            //Si no hay error
		            this.editandoReserva = false;
		            this.ngOnInit();
		          } else {
		            //Si hay error lo muestra
		            this.editandoReserva = false;
		          }
		          alert(JSON.stringify(JSON.parse(res._body)));
		        })
		        .catch((error) => {
		          this.editandoReserva = false;
		          alert(error)
		        }); 
  	}

  	
}
