import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../constants/app.const';
import { EnvioCalle } from '../models/envio-calle';
import { FacturacionCalle } from '../models/facturacion-calle';
import { Pago } from '../models/pago';

@Injectable()
export class CheckoutService {
  private servidorPath: string = AppConst.servidorPath;

  constructor(private http: Http) { }

  checkOut(
    envioCalle: EnvioCalle,
    facturacionCalle: FacturacionCalle,
    pago: Pago,
    envioMetodo: string
  ) {
    let url = this.servidorPath + "/checkout/checkout";
    let factura = {
      "envioCalle": envioCalle,
      "facturacionCalle": facturacionCalle,
      "pago": pago,
      "envioMetodo": envioMetodo
    }
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, factura, { headers: tokenHeader });
  }

  getUsuarioFactura() {
    let url = this.servidorPath + "/checkout/getUsuarioFactura";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, { headers: tokenHeader });
  }
}
