import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../constants/app.const';

@Injectable()
export class CarritoService {
  private servidorPath: string = AppConst.servidorPath;

  constructor(private http: Http) { }

  addItem(id: number, cantidad: number) {
    let url = this.servidorPath + '/carrito/add';
    let carritoItemInfo = {
      'libroId': id,
      'cantidad': cantidad
    }
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, carritoItemInfo, { headers: tokenHeader });
  }

  getCarritoListaItem() {
    let url = this.servidorPath + '/carrito/getCarritoListaItem';

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, { headers: tokenHeader });
  }

  getCarritoCompra() {
    let url = this.servidorPath + '/carrito/getCarritoCompra';

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, { headers: tokenHeader });
  }

  actualizarCarritoItem(carritoItemId: number, cantidad: number) {
    let url = this.servidorPath + '/carrito/actualizarCarritoItem';
    let carritoItemInfo = {
      'carritoItemId': carritoItemId,
      'cantidad': cantidad
    }
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, carritoItemInfo, { headers: tokenHeader });
  }

  borrarCarritoItem(id: number) {
    let url = this.servidorPath + '/carrito/borrarCarritoItem';

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, id, { headers: tokenHeader });
  }
}
