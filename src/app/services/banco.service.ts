import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

 //Cabeceras de las peticiones
  headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
  });

  //Urls
  url: string = "http://localhost:8088/";

   //Para hacer posts
   Post(tabla, parametros){
    //let body = new URLSearchParams(parametros).toString();
    return this.http.post(this.url+tabla,parametros,{
      headers: this.headers,
      params: new URLSearchParams(parametros).toString()
    });
    //}).toPromise();
  }

  constructor(private http: Http) { }
}
