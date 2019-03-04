import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OracleService } from '../oracle.service';

@Component({
  selector: 'app-buque',
  templateUrl: './buque.component.html',
  styleUrls: ['./buque.component.scss']
})
export class BuqueComponent implements OnInit {

  mostrarBuques: boolean;
  registrandoBuque: boolean;
  formAgregarBuque: boolean;
  buques: any[];
  buque: any;
  tiposBuque: any[];

  constructor(private router: Router, private oracle:  OracleService) { }

  ngOnInit() {
  	if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
  	} else {
  	  this.mostrarBuques = false;
  	  this.formAgregarBuque = false;
  	  this.registrandoBuque = false;
  	  this.buque = {};
      this.getTiposBuque();
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

  getTiposBuque(){
    this.oracle.getTipoBuque()
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.tiposBuque = JSON.parse(res._body).response;
          } else {
            //Si hay error lo muestra
            alert(JSON.stringify(JSON.parse(res._body)));
          }
        })
        .catch((error) => {
          alert(error)
        }); 
  }

  crearBuque(){
  	this.registrandoBuque = true;
  	this.buque.username = localStorage.getItem("user");
    this.oracle.postBuque(this.buque)
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.registrandoBuque = false;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.registrandoBuque = false;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.registrandoBuque = false;
          alert(error)
        });  
  }

  borrarBuque(K_SIN: number){
    this.mostrarBuques = false;
    this.oracle.borrarBuque(K_SIN)
      .toPromise()
        .then((res:any) => {
          console.log(res);
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.mostrarBuques = true;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.mostrarBuques = true;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.mostrarBuques = true;
          alert(error)
        }); 
  }

}
