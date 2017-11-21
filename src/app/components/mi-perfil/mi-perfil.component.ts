import { Component, OnInit, HostBinding } from '@angular/core';
import { AppConst } from '../../constants/app.const';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { PagoService } from '../../services/pago.service';
import { UsuarioPago } from '../../models/usuario-pago';
import { UsuarioFacturacion } from '../../models/usuario-facturacion';
import { slide } from '../../animations/animations';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  model: any;
  

  private servidorPath = AppConst.servidorPath;
  private datosObtenidos = false;
  private loginError: boolean;
  private loggedIn: boolean;
  private credenciales = { 'username': '', 'password': '' };

  private usuario: Usuario = new Usuario();
  private actualizadoExito: boolean;
  private nuevaPassword: string;
  private incorrectPassword: boolean;
  private passwordActual: string;

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  onActualizarInfoUsuario() {
    this.usuarioService.actualizarUsuarioInfo(this.usuario, this.nuevaPassword, this.passwordActual).subscribe(
      res => {
        console.log(res.text());
        this.actualizadoExito = true;
      },
      error => {
        console.log(error.text());
        let mensajeError = error.text();
        if (mensajeError === "Contraseña actual incorrecta") this.incorrectPassword = true;
      }
    );
  }

  getUsuarioActual() {
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

  // ngAfterViewChecked() {
  //   Materialize.updateTextFields();
  // }

  ngOnInit() {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'tab_id');
    // this.ngAfterViewChecked();

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
  }

  // onNuevoPago() {
  //   this.pagoService.nuevoPago(this.usuarioPago).subscribe(
  //     res => {
  //       this.getUsuarioActual();
  //       this.etiquetaFacturacionSeleccionada = 0;
  //     },
  //     error => {
  //       console.log(error.text());
  //     }
  //   )
  // }

}
