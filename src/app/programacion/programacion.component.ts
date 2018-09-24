import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OracleService } from '../oracle.service';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.scss']
})
export class ProgramacionComponent implements OnInit {

  mostrarReservas: boolean;
  reservas: any[];

  constructor(private router: Router, private oracle:  OracleService) { }

  ngOnInit() {
  	this.mostrarReservas = false;
  	this.reservas = [];
  	if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
  	} else {
  	  this.mostrarReservas = false;
  	  this.oracle.getReservasPaso()
  	  	.toPromise()
  	  		.then((res: any)=>{
  	  			if(JSON.parse(res._body).clase == undefined){
  	  				this.mostrarReservas = true;
  	  				this.reservas = JSON.parse(res._body).response;
  	  			} else {
  	  				this.mostrarReservas = true;
				    alert(JSON.stringify(JSON.parse(res._body)));
  	  			}
  	  		})
  	  		.catch((error)=>{
  	  			this.mostrarReservas = true;
  	  			alert(error);
  	  		});
  	}
  }

}
