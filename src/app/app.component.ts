import { Component } from '@angular/core';
import { OracleService } from './oracle.service'
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'canalPanamaFront';
  user = {
    name: "",
    pass: "",
  };
  logged = false;

  constructor(private oracle: OracleService, private router: Router) { }

  login() {
    this.oracle.getLogin(this.user.name, this.user.pass)
        .toPromise()
          .then((res: any) => {
            if(JSON.parse(res._body).clase == undefined){
              //Si no hay error
              localStorage.setItem('user', this.user.name);
              localStorage.setItem('pass', this.user.pass);
              this.logged = true;
              this.router.navigate(['/home']);
            } else {
              //Si hay error lo muestra
              alert(JSON.stringify(JSON.parse(res._body)));
            }
          })
          .catch((error) => {
            alert(error);
          });
    this.user.name = "";
    this.user.pass = "";
  }

  logout(){
    this.oracle.getLogout()
      .toPromise()
        .then( (res:any) => {
          if(JSON.parse(res._body).clase == undefined){
            //Si no hay error
            localStorage.removeItem("user");
            localStorage.removeItem("pass");
            this.logged = false;
            this.router.navigate([""]);
          } else {
            //Si hay error lo muestra
            alert(JSON.stringify(JSON.parse(res._body)));
          }
        })
        .catch( error => {
          alert(error);
        });
  }

}
