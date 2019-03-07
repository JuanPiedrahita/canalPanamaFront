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
  formModificarCupo: boolean;
  modificandoCupo: boolean;
  cupos: any[];
  cupo: any;
  cupoTemporal: any;
  dateToday: string  = new Date().toJSON().split('T')[0];
  tiposBuque: any[];

  constructor(private oracle: OracleService, private router: Router) { }

  ngOnInit() {
  	if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
    } else {
      this.mostrarCupo = false;
  	  this.formAgregarCupo = false;
  	  this.registrandoCupo = false;
      this.formModificarCupo = false;
      this.modificandoCupo = false;
  	  this.cupo = {};
      this.cupoTemporal = {};
  	  this.cupos = [];
      this.getTiposBuque();
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
    if(this.cupoTemporal.Q_CUPOS >= this.cupoTemporal.disponibles){
      this.modificandoCupo = true;
      this.cupoTemporal.Q_CUPOS_DISPONIBLES = this.cupoTemporal.Q_CUPOS - this.cupoTemporal.disponibles;
      this.oracle.actualizarCupo(this.cupoTemporal)
        .toPromise()
          .then((res:any) => {
            console.log(res);
            if(JSON.parse(res._body).clase == undefined){
              //Si no hay error
              this.modificandoCupo = false;
              this.ngOnInit();
            } else {
              //Si hay error lo muestra
              this.modificandoCupo = false;
            }
            alert(JSON.stringify(JSON.parse(res._body)));
          })
          .catch((error) => {
            this.modificandoCupo = false;
            alert(error)
          }); 
    } else {
      alert("el numero de cupos nuevo debe ser mayor al numero de cupos antiguo menos el ńúmero de disponibles");
    }
  }

  editarCupo(cupoSeleccionado: any){
    this.cupoTemporal = JSON.parse(JSON.stringify(cupoSeleccionado));
    this.cupoTemporal.disponibles = this.cupoTemporal.Q_CUPOS - this.cupoTemporal.Q_CUPOS_DISPONIBLES; 
    this.formModificarCupo = true;
  }

}
