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
  url: string = "http://localhost:8080/canalPanamaBack/rest/";
  login: string = "login"

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
    return this.oracleGet("logout", null);
  }

}
