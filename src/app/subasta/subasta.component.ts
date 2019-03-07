import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OracleService } from '../oracle.service';

@Component({
  selector: 'app-subasta',
  templateUrl: './subasta.component.html',
  styleUrls: ['./subasta.component.scss']
})
export class SubastaComponent implements OnInit {

  buques: any[];
  subastas: any[];
  mostrarSubastas: boolean;
  reserva: any;
  permitirPujar: boolean = false;
  puja: any;
  registrandoPuja: boolean = false;
  pujas: any[];
  mostrarPujas: boolean;

  constructor(private router: Router, private oracle:  OracleService) { }

  ngOnInit() {
  	if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
  	} else {
  	  this.obtenerBuques();
      this.obtenerSubastas();
  	}
  }

  cerrarSubasta(subasta: any){
  	this.mostrarSubastas = false;
    this.oracle.cerrarSubasta(subasta)
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.mostrarSubastas = true;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.mostrarSubastas = true;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.mostrarSubastas = true;
          alert(error)
        }); 
  }

  crearPuja(){
  	this.registrandoPuja = true;
    this.oracle.postPuja(this.puja)
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.registrandoPuja = false;
            this.permitirPujar = false;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.registrandoPuja = false;
            this.permitirPujar = false;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          	this.registrandoPuja = false;
            this.permitirPujar = false;
          	alert(error)
        }); 
  }

  getPujas(subasta: any){
  	this.mostrarPujas = false;
  	this.pujas = [];
    this.oracle.getPujas(subasta)
	  	.toPromise()
	  		.then((res: any) => {
            if(JSON.parse(res._body).clase == undefined){
              //Si no hay error
              this.pujas = JSON.parse(res._body).response;
              this.mostrarPujas = true;
            } else {
              //Si hay error lo muestra
              this.mostrarPujas = true;
              alert(JSON.stringify(JSON.parse(res._body)));
            }
      	})
	  	.catch((error) => {
	  			this.mostrarPujas = true;
        	alert(error)
      	});
  }

  pujar(subasta: any){
  	this.puja = {
  		K_SUBASTA: subasta.K_SUBASTA
  	};
  	this.permitirPujar = true;
  }

  obtenerSubastas(){
  	this.mostrarSubastas = false;
  	this.subastas = [];
    this.oracle.getSubastas()
	  	.toPromise()
	  		.then((res: any) => {
            if(JSON.parse(res._body).clase == undefined){
              //Si no hay error
              this.subastas = JSON.parse(res._body).response;
              this.mostrarSubastas = true;
            } else {
              //Si hay error lo muestra
              this.mostrarSubastas = true;
              alert(JSON.stringify(JSON.parse(res._body)));
            }
      	})
	  		.catch((error) => {
	  			this.mostrarSubastas = true;
        	alert(error)
      	});
  }

  obtenerBuques(){
    //Obtener buques
    this.oracle.getBuques(localStorage.getItem("user"))
      .toPromise()
        .then((resBuques: any) => {
            if(JSON.parse(resBuques._body).clase == undefined){
              //Si no hay error
              this.buques = JSON.parse(resBuques._body).response;
            } else {
              //Si hay error lo muestra
              alert(JSON.stringify(JSON.parse(resBuques._body)));
            }
          })
        .catch((error) => {
            alert(error)
          });  
  }

}
