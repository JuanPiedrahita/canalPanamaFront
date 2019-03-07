import { Component, OnInit } from '@angular/core';
import { OracleService } from '../oracle.service';
import { Router } from '@angular/router';
import { BancoService } from '../services/banco.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {

	mostrarPagos: boolean;
	pagos: any[];

  constructor(private router: Router, private oracle:  OracleService, private banco: BancoService) { }

  ngOnInit() {
  	if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
  	} else {
  	  this.mostrarPagos = false;
  	  this.buscarPagos();
  	}
	}
	
	registrarPago(pago: any){
  	this.mostrarPagos = false;
		this.banco.Post("postPago",{
			idPago: pago.K_PAGO,
			date: "2019-03-07 08:24:00",
			value: pago.V_TOTAL_PAGO,
			cuenta: 1
		}).toPromise()
			.then((res:any)=>{
				this.oracle.postPago(pago)
					.toPromise()
						.then((res:any) => {
							if(JSON.parse(res._body).clase == undefined){
								//Si no hay error
								this.mostrarPagos = true;
								this.ngOnInit();
							} else {
								//Si hay error lo muestra
								this.mostrarPagos = true;
							}
							alert(JSON.stringify(JSON.parse(res._body)));
						})
						.catch((error) => {
							this.mostrarPagos = true;
							alert(error)
						});  
			})
			.catch((error) => {
				this.mostrarPagos = true;
				alert(error)
			}); 
  }

  buscarPagos(){
  	this.mostrarPagos = false;
  	 this.oracle.getPagosUsuario(localStorage.getItem("user"))
	    .toPromise()
	      .then((res: any) => {
	          if(JSON.parse(res._body).clase == undefined){
	            //Si no hay error
	            this.pagos = JSON.parse(res._body).response;
	            this.mostrarPagos = true;
	          } else {
	            //Si hay error lo muestra
	            this.mostrarPagos = true;
	            alert(JSON.stringify(JSON.parse(res._body)));
	          }
	        })
	      .catch((error) => {
	        this.mostrarPagos = true;
	          alert(error)
	        });  
  }


}
