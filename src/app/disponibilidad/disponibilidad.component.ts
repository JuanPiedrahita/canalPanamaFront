import { Component, OnInit } from '@angular/core';
import { OracleService } from '../oracle.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.scss']
})
export class DisponibilidadComponent implements OnInit {

  mostrarBuques: boolean;
  verificando: boolean;
  fecha: Date;
  tipoBuque: string;
  buques: any[];

  constructor(private oracle: OracleService, private router: Router) { }

  ngOnInit() {
  	if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
    } else {
    	this.mostrarBuques = false;
    	this.verificando = false;
    	this.fecha = undefined;
    	this.tipoBuque = "";
    	this.buques = [];

    	this.mostrarBuques = true;
    	this.oracle.getBuques(localStorage.getItem("user"))
  	  	.toPromise()
  	  		.then((res: any) => {
	            if(JSON.parse(res._body).clase == undefined){
	              //Si no hay error
	              this.buques = JSON.parse(res._body).response;
	              this.mostrarBuques = true;
	            } else {
	              //Si hay error lo muestra
	              this.mostrarBuques = true;
	              alert(JSON.stringify(JSON.parse(res._body)));
	            }
          	})
  	  		.catch((error) => {
  	  			this.mostrarBuques = false;
            	alert(error)
          	});
    }
  }

  verificarDisponibilidad(){
  	this.verificando = true;
    this.oracle.getDisponibilidad(this.tipoBuque,this.fecha)
      .toPromise()
        .then((res:any) => {
          console.log(res);
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.verificando = false;
            alert(JSON.stringify(JSON.parse(res._body)));
          } else {
            //Si hay error lo muestra
            this.verificando = false;
            alert(JSON.stringify(JSON.parse(res._body)));
          }
        })
        .catch((error) => {
          this.mostrarBuques = true;
          alert(error)
        }); 
  }

}
