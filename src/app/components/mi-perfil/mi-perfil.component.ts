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

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
  animations: [slide]
})
export class MiPerfilComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

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

  private tabPerfilSeleccionada: number = 0;
  private tabFacturacionSeleccionada: number = 0;

  private usuarioPago: UsuarioPago = new UsuarioPago();
  private usuarioFacturacion: UsuarioFacturacion = new UsuarioFacturacion();
  private usuarioPagoLista: UsuarioPago[] = [];
  private pagoPredeterminado: boolean;
  private usuarioPagoPredeterminadoId: number;
  private listaProvincias: string[] = [];

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router,
    private pagoService: PagoService
  ) { }

  cambioFacturacionSeleccionado(val: number) {
    this.tabFacturacionSeleccionada = val;
  }

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

  onNuevoPago() {
    this.pagoService.nuevoPago(this.usuarioPago).subscribe(
      res => {
        this.getUsuarioActual();
        this.tabFacturacionSeleccionada = 0;
      },
      error => {
        console.log(error.text());
      }
    )
  }

  onActualizarPago(pago: UsuarioPago) {
    this.usuarioPago = pago;
    this.usuarioFacturacion = pago.usuarioFacturacion;
    this.tabFacturacionSeleccionada = 1;
  }

  onBorrarPago(id: number) {
    this.pagoService.borrarPago(id).subscribe(
      res => {
        this.getUsuarioActual();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  setPagoPredeterminado() {
    this.pagoPredeterminado = false;
    this.pagoService.establacerPagoDeterminado(this.usuarioPagoPredeterminadoId).subscribe(
      res => {
        this.getUsuarioActual();
        this.pagoPredeterminado = true;
      },
      error => {
        console.log(error.text());
      }
    );
  }

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

    for (let provincias in AppConst.provincias) {
      this.listaProvincias.push(provincias);
    }

    this.usuarioFacturacion.usuarioFacturacionProvincia = "";
    this.usuarioPago.tipo = "";
    this.usuarioPago.mesExpiracion = "";
    this.usuarioPago.anioExpiracion = "";
    this.usuarioPago.usuarioFacturacion = this.usuarioFacturacion;
    this.pagoPredeterminado = false;
  }

}
