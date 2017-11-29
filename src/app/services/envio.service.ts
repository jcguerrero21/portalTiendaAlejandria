import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app.const';
import { Http, Headers } from '@angular/http';
import { UsuarioEnvio } from 'app/models/usuario-envio';

@Injectable()
export class EnvioService {
  private servidorPath: string = AppConst.servidorPath;

  constructor(private http: Http) { }

  nuevoEnvio(envio: UsuarioEnvio) {
    let url = this.servidorPath + "/envio/add";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, JSON.stringify(envio), { headers: tokenHeader });
  }

  getUsuarioEnvioList() {
    let url = this.servidorPath + "/envio/getUsuarioEnvioLista";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, { headers: tokenHeader });
  }

  borrarEnvio(id: number) {
    let url = this.servidorPath + "/envio/borrar";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, id, { headers: tokenHeader });
  }

  establacerEnvioDeterminado(id: number) {
    let url = this.servidorPath + "/envio/establecerEnvioDeterminado";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, id, { headers: tokenHeader });
  }
}
