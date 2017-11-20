import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConst } from '../constants/app.const';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  private servidorPath: string = AppConst.servidorPath;

  constructor(private http: Http, private router: Router) { }

  enviarCredenciales(username: string, password: string) {
    let url = this.servidorPath + '/token';
    let encodedCredenciales = btoa(username + ":" + password);
    let basicHeader = "Basic " + encodedCredenciales;
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });

    return this.http.get(url, { headers: headers });
  }

  verificarSesion() {
    let url = this.servidorPath + '/verificarSesion';
    let headers = new Headers({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, { headers: headers });
  }

  logout() {
    let url = this.servidorPath + '/usuario/logout';
    let headers = new Headers({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, '', { headers: headers });
  }
}
