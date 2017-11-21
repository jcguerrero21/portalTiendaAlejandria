import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../constants/app.const';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService {
  private servidorPath: string = AppConst.servidorPath;

  constructor(private http: Http) { }

  nuevoUsuario(username: string, email: string) {
    let url = this.servidorPath + '/usuario/nuevoUsuario';
    let usuarioInfo = {
      "username": username,
      "email": email
    }
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(usuarioInfo), { headers: tokenHeader });
  }

  recuperarPassword(email: string) {
    let url = this.servidorPath + '/usuario/olvidarPassword';
    let usuarioInfo = {
      "email": email
    }
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(usuarioInfo), { headers: tokenHeader });
  }

  actualizarUsuarioInfo(usuario: Usuario, nuevaPassword: string) {
    let url = this.servidorPath + "/usuario/actualizarUsuarioInfo";
    let usuarioInfo = {
      "id": usuario.id,
      "nombre": usuario.nombre,
      "apellidos": usuario.apellidos,
      "username": usuario.username,
      "passwordActual": usuario.password,
      "email": usuario.email,
      "nuevaPassword": "nuevaPassword"
    };

    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem("xAuthToken")
    });
    return this.http.post(url, JSON.stringify(usuarioInfo), { headers: tokenHeader });
  }

  getUsuarioActual() {
    let url = this.servidorPath + '/usuario/getUsuarioActual';
    
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, { headers: tokenHeader });
  }

}
