import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../constants/app.const';
import { Factura } from '../models/factura';

@Injectable()
export class FacturaService {
  private servidorPath: string = AppConst.servidorPath;

  constructor(private http: Http) { }

  getFacturaLista() {
    let url = this.servidorPath + "/factura/getFacturaLista";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, { headers: tokenHeader });
  }
}
