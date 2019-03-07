import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class OracleService {

  //Cabeceras de las peticiones
  headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
  });

  //Urls
  url: string = "http://localhost:8081/canalPanamaBack/rest/";
  login: string = "login";
  logout: string = "logout";
  usuarios: string = "usuario/all";
  permisos: string = "usuario/permisos";
  postUser: string = "usuario/new"
  deleteUser: string = "usuario/delete";
  buques: string = "buque/all";
  newBuque: string = "buque/new";
  tipoBuque: string = "buque/tipo_buque";
  deleteBuque: string = "buque/delete";
  Clientes: string = "cliente/all";
  newCliente:string= "cliente/new"; 
  deleteCliente:string="cliente/delete";
  newCupo: string = "cupo/post";
  updateCupo: string = "cupo/update";
  cupos: string = "cupo/get";
  disponibilidad: string = "disponibilidad";
  obtenerReservas: string = "reserva/all";
  insertarReserva: string = "reserva/new";
  eliminarReserva: string = "reserva/delete";
  modificarReserva: string = "reserva/update";
  obtenerReservasPaso: string = "reserva/paso";
  reservasFecha: string = "reserva/allFechas";
  puerto: string = "general/getPuerto";
  tipoCarga: string = "general/getTipoCarga";
  roles: string = "usuario/roles"; 
  subasta: string = "subasta/allSubastas";
  pujar: string = "subasta/pujar";
  closeSubasta: string = "subasta/cerrar";
  pujas: string = "subasta/allPujas";
  pasosFecha: string = "paso/allFechas";
  newPaso: string = "paso/new";
  newTripulante: string = "paso/tripulanteNew";
  tripulantesPaso: string  = "paso/tripulantesPaso";
  pagosUsario: string = "pago/allPagos";
  pagarPago: string = "pago/pagar";


  constructor(private http: Http) { }

  addUserParams(parametros: any) {
    if (parametros == null) {
      parametros = {};
    }
    //parametros['user'] = {};
    //parametros['pass'] = {};
    //parametros.user = localStorage.getItem('user');
    //parametros.pass = localStorage.getItem('pass');
    return parametros;
  }

  //Para hacer gets
  oracleGet(tabla: string,parametros: any){
    return this.http.get(this.url+tabla,{
      headers: this.headers,
      //params: (parametros!=null)?new URLSearchParams(this.addUserParams(parametros)).toString():'',
      params: new URLSearchParams(this.addUserParams(parametros)).toString(),
    });
    //}).toPromise();   
  }

  //Para hacer posts
  oraclePost(tabla, parametros){
    //let body = new URLSearchParams(parametros).toString();
    return this.http.post(this.url+tabla,parametros,{
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString()
    });
    //}).toPromise();
  }

  getLogin(user:string, pass: string){
    return this.oracleGet(this.login, {'user':user,'password':pass});
  }

  getLogout(){
    return this.oracleGet(this.logout, null);
  }

  getUsuarios(){
    return this.oracleGet(this.usuarios,null);
  }

  getUsuario(username: string){
    return this.oracleGet(this.permisos,{'username':username});
  }

  postUsuario(user: any){
    return this.oraclePost(this.postUser,user);
  }

  deleteUsuario(username: string){
    return this.oraclePost(this.deleteUser,{"username":username})
  }

  getPermisos(username: string){
    return this.oracleGet(this.permisos,{"username":username});
  }

  getRoles(){
    return this.oracleGet(this.roles, null);
  }

  getBuques(username: string){
    return this.oracleGet(this.buques,{"username":username});
  }

  postBuque(buque: any){
    return this.oraclePost(this.newBuque,buque);
  }

  borrarBuque(K_SIN: number){
    return this.oraclePost(this.deleteBuque,{"K_SIN":K_SIN});
  }

  getClientes(){
    return this.oracleGet(this.Clientes,null)
  }

  postClientes(cliente: any){
    return this.oraclePost(this.newCliente,cliente)
  }
  
  borrarCliente(K_CLIENTE:number){
    return this.oraclePost(this.deleteCliente,{"K_CLIENTE":K_CLIENTE})
  }

  getCupos(){
    return this.oracleGet(this.cupos, null);
  }

  actualizarCupo(cupo: any){
    return this.oraclePost(this.updateCupo,cupo);
  }

  insertCupo(cupo: any){
    return this.oraclePost(this.newCupo,cupo);
  }

  getDisponibilidad(tipoBuque: string, fecha: Date){
    return this.oracleGet(this.disponibilidad, {"tipoBuque":tipoBuque,"fecha":fecha});
  }

  getReservas(username: string){
    return this.oracleGet(this.obtenerReservas,{"username":username});
  };

  postReserva(reserva: any){
    return this.oraclePost(this.insertarReserva,reserva);
  }

  deleteReserva(reserva: any){
    return this.oraclePost(this.eliminarReserva, reserva);
  }

  updateReserva(k_numero: number, f_fecha_antigua: Date, f_fecha_nueva: Date,tipoBuque:string){
    return this.oraclePost(this.modificarReserva,{
      "k_numero":k_numero,
      "f_fecha_antigua":f_fecha_antigua,
      "f_fecha_nueva":f_fecha_nueva,
      "tipoBuque":tipoBuque
    });
  }

  getReservasPaso(){
    return this.oracleGet(this.obtenerReservasPaso,null);
  }

  getTipoBuque(){
    return this.oracleGet(this.tipoBuque,null);
  }

  getPuertos(){
    return this.oracleGet(this.puerto,null);
  }

  getTipoCarga(){
    return this.oracleGet(this.tipoCarga,null);
  }

  getSubastas(){
    return this.oracleGet(this.subasta,null);
  };

  getPujas(subasta:any){
    return this.oracleGet(this.pujas,subasta);
  };

  postPuja(puja: any){
    return this.oraclePost(this.pujar,puja);
  }

  cerrarSubasta(subasta: any){
    return this.oraclePost(this.closeSubasta,subasta);
  }

  getReservasFecha(f_fecha: any){
    return this.oracleGet(this.reservasFecha,{"f_paso":f_fecha});
  }

  getPasosFecha(f_fecha: any){
    return this.oracleGet(this.pasosFecha,{"f_paso":f_fecha});
  }

  postPaso(paso: any){
    return this.oraclePost(this.newPaso,paso);
  }

  postTripulantePaso(tripulante: any){
    return this.oraclePost(this.newTripulante,tripulante);
  }

  getTripulantesPaso(paso: any){
    return this.oracleGet(this.tripulantesPaso,paso);
  }

  getPagosUsuario(username: string){
    return this.oracleGet(this.pagosUsario, {"N_USER":username});
  }

  postPago(pago: any){
    return this.oraclePost(this.pagarPago,pago);
  }


}
