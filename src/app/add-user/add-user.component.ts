import { Component, OnInit } from '@angular/core';
import { OracleService } from '../oracle.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  usuarios: any[];
  permisos: any[];
  selectedUser: any;
  mostrarUsuarios: boolean;
  formAgregarUsuario:boolean;
  registrnadoUsuario: boolean;
  usuario : any;
  mostrarPermisos: boolean;
  cargandoPermisos: boolean;

  constructor(private oracle: OracleService) { }

  ngOnInit() {
    this.usuarios = [];
    this.mostrarUsuarios = false;
    this.formAgregarUsuario = false;
    this.registrnadoUsuario = false;
    this.mostrarPermisos = false;
    this.cargandoPermisos = false;
    this.selectedUser = undefined;
    this.permisos = [];
    this.usuario = {
      username : "",
      password: "",
      role: "",
      nombre:"",
      apellido:"",
      id:"",
      roleBuque:"",
    };
    this.oracle.getUsuarios()
      .toPromise()
        .then((res: any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.usuarios = JSON.parse(res._body).response;
            this.mostrarUsuarios = true;
          } else {
            //Si hay error lo muestra
            this.mostrarUsuarios = true;
            alert(JSON.stringify(JSON.parse(res._body)));
          }
        })
        .catch((error) => {
          alert(error)
        });
  }

  crearUsuario(){
    this.registrnadoUsuario = true;
    this.oracle.postUsuario(this.usuario)
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.usuarios = JSON.parse(res._body).response;
            this.registrnadoUsuario = false;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.registrnadoUsuario = false;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.registrnadoUsuario = false;
          alert(error)
        });     
  }

  verPermisos(username: string){
    this.mostrarPermisos = true;
    this.cargandoPermisos = true;
    this.oracle.getPermisos(username)
      .toPromise()
        .then((res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.permisos = JSON.parse(res._body).response;
            console.log(this.permisos);
            this.selectedUser = username;
            this.cargandoPermisos = false;
          } else {
            //Si hay error lo muestra
            this.mostrarPermisos = false;
            this.cargandoPermisos = false;
            alert(JSON.stringify(JSON.parse(res._body)));
          }
        })
        .catch((error) => {
          this.mostrarPermisos = false;
          this.cargandoPermisos = false;
          alert(error)
        }); 
  }

  borrarUsuario(username: string){
    this.mostrarUsuarios = false;
    this.oracle.deleteUsuario(username)
      .toPromise()
        .then((res:any) => {
          console.log(res);
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            this.usuarios = JSON.parse(res._body).response;
            this.mostrarUsuarios = true;
            this.ngOnInit();
          } else {
            //Si hay error lo muestra
            this.mostrarUsuarios = true;
          }
          alert(JSON.stringify(JSON.parse(res._body)));
        })
        .catch((error) => {
          this.mostrarUsuarios = true;
          alert(error)
        }); 
  }

}
