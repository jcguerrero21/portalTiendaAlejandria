import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app.const';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  private servidorPath = AppConst.servidorPath;
  private datosObtenidos = false;
  private loginError: boolean;
  private loggedIn: boolean;
  private credenciales = {'username':'', 'password':''};

  private usuario: Usuario = new Usuario();
  private actualizadoExito: boolean;
  private nuevaPassword: string;
  private incorrectPassword: boolean;

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  onActualizarInfoUsuario() {
    this.usuarioService.actualizarUsuarioInfo(this.usuario, this.nuevaPassword).subscribe(
      res => {
        console.log(res.text());
        this.actualizadoExito=true;
      },
      error => {
        console.log(error.text());
        let mensajeError = error.text();
        if(mensajeError === "Contraseña actual incorrecta") this.incorrectPassword=true;
      }
    );
  }

  getUsuarioActual(){
    this.usuarioService.getUsuarioActual().subscribe(
      res => {
        this.usuario = res.json();
        this.datosObtenidos = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.loginService.verificarSesion().subscribe(
      res => {
        this.loggedIn = true;
      },
      error => {
        this.loggedIn = false;
        console.log("sesión inactiva");
        this.router.navigate(['/miCuenta'])
      }
    )

    this.getUsuarioActual();

    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'tab_id');

  }

}
