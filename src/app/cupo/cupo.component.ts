import { Component, OnInit } from '@angular/core';
import { OracleService } from '../oracle.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cupo',
  templateUrl: './cupo.component.html',
  styleUrls: ['./cupo.component.scss']
})
export class CupoComponent implements OnInit {

  mostrarCupo: boolean;
  registrandoCupo: boolean;
  formAgregarCupo: boolean;
  cupos: any[];
  cupo: any;

  constructor(private oracle: OracleService, private router: Router) { }

  ngOnInit() {
  	if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
    } else {
      this.mostrarCupo = false;
  	  this.formAgregarCupo = false;
  	  this.registrandoCupo = false;
  	  this.cupo = {};
  	  this.cupos = [];
  	  this.oracle.getCupos()
  	  	.toPromise()
  	  		.then((res: any) => {
	            if(JSON.parse(res._body).clase == undefined){
	              //Si no hay error
	              this.cupos = JSON.parse(res._body).response;
	              this.mostrarCupo = true;
	            } else {
	              //Si hay error lo muestra
	              this.mostrarCupo = true;
	              alert(JSON.stringify(JSON.parse(res._body)));
	            }
          	})
  	  		.catch((error) => {
  	  			this.mostrarCupo = false;
            	alert(error)
          	});
    }
  }

  crearCupo(){
  	this.registrandoCupo = true;
    this.oracle.insertCupo(this.cupo)
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.registrandoCupo = false;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.registrandoCupo = false;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.registrandoCupo = false;
          alert(error)
        });  
  }

  actualizarCupo(){
    this.mostrarCupo = false;
    this.oracle.actualizarCupo(this.cupo)
      .toPromise()
        .then((res:any) => {
          console.log(res);
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.mostrarCupo = true;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.mostrarCupo = true;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.mostrarCupo = true;
          alert(error)
        }); 
  }

}
