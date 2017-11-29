import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../constants/app.const';

@Injectable()
export class LibroService {
  private serverPath: string = AppConst.servidorPath;

  constructor(private http: Http) { }

  getListaLibros() {
    let url = this.serverPath + "/libro/listaLibros";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, { headers: tokenHeader });
  }

  getLibro(id: number) {
    let url = this.serverPath + "/libro/" + id;

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.get(url, { headers: tokenHeader });
  }

  buscarLibro(palabraClave: string) {
    let url = this.serverPath + "/libro/buscarLibro";

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, palabraClave, { headers: tokenHeader });
  }

}