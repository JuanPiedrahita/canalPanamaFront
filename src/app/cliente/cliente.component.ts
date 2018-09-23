import { Component, OnInit } from '@angular/core';
import { OracleService } from '../oracle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  registrandoCliente:boolean;
  mostrarClientes:boolean;
  formAgregarCliente:boolean;
  clientes : any[]; 
  cliente: any;

  constructor(private oracle: OracleService, private router:Router) { }

  ngOnInit() {
    if (localStorage.getItem("user") == null) {
      this.router.navigate([""]);
    } else{
      this.mostrarClientes=false;
      this.registrandoCliente=false;
      this.formAgregarCliente=false;
      this.cliente={}

      this.oracle.getClientes()
      .toPromise()
        .then((res: any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.clientes = JSON.parse(res._body).response;
            this.mostrarClientes = true;
            
          } else {
            //Si hay error lo muestra
            this.mostrarClientes = true;
            alert(JSON.stringify(JSON.parse(res._body)));
          }
        })
        .catch((error) => {
          alert(error)
        });
    }
  }
    
  crearCliente(){
    this.registrandoCliente = true;
    this.oracle.postClientes(this.cliente)
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.registrandoCliente = false;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.registrandoCliente = false;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
            this.registrandoCliente = false;
          alert(error)
        });     
      }
        
  borrarCliente(K_CLIENTE: number){
    this.mostrarClientes = false;
    this.oracle.borrarCliente(K_CLIENTE)
      .toPromise()
        .then((res:any) => {
          console.log(res);
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            
            this.mostrarClientes = true;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.mostrarClientes = true;
            
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.mostrarClientes = true;

          alert(error)
        }); 

    }
  }

