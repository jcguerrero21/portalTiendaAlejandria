import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app.const';
import { Http, Headers } from '@angular/http';
import { UsuarioPago } from '../models/usuario-pago';

@Injectable()
export class PagoService {
  private servidorPath: string = AppConst.servidorPath;

  constructor(private http: Http) { }

  nuevoPago(pago: UsuarioPago) {
    let url = this.servidorPath + "/pago/add";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, JSON.stringify(pago), { headers: tokenHeader });
  }

  getUsuarioPagoLista() {
    let url = this.servidorPath + "/pago/getUsuarioPagoLista";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, { headers: tokenHeader });
  }

  borrarPago(id: number) {
    let url = this.servidorPath + "/pago/borrar";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, id, { headers: tokenHeader });
  }

  establacerPagoDeterminado(id: number) {
    let url = this.servidorPath + "/pago/establecerPagoDeterminado";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    }); 
    return this.http.post(url, id, { headers: tokenHeader });
  }


}
