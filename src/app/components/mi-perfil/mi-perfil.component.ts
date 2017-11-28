import { Component, OnInit, HostBinding } from '@angular/core';
import { AppConst } from '../../constants/app.const';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from '../../services/login.service';
import { PagoService } from '../../services/pago.service';
import { EnvioService } from '../../services/envio.service';
import { Router } from '@angular/router';
import { UsuarioPago } from '../../models/usuario-pago';
import { UsuarioFacturacion } from '../../models/usuario-facturacion';
import { UsuarioEnvio } from '../../models/usuario-envio';
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
  private tabUsuarioEnvioSeleccionada: number = 0;

  private usuarioPago: UsuarioPago = new UsuarioPago();
  private usuarioFacturacion: UsuarioFacturacion = new UsuarioFacturacion();
  private usuarioPagoLista: UsuarioPago[] = [];
  private pagoPredeterminado: boolean;
  private usuarioPagoInfo: boolean;
  private usuarioPagoPredeterminadoId: number;
  private listaProvincias: string[] = [];

  private usuarioEnvio: UsuarioEnvio = new UsuarioEnvio();
  private usuarioEnvioList: UsuarioEnvio[] = [];
  private usuarioPredeterminadoEnvioId: number;
  private envioPredeterminado: boolean;
  private usuarioEnvioInfo: boolean;
  private borrarEnvioInfo: boolean;

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private pagoService: PagoService,
    private envioService: EnvioService,
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

  // ngAfterViewChecked() {
  //   Materialize.updateTextFields();
  // }

  onNuevoPago() {
    this.pagoService.nuevoPago(this.usuarioPago).subscribe(
      res => {
        this.getUsuarioActual();
        this.usuarioPagoInfo = true;
        this.usuarioPago = new UsuarioPago();
        this.usuarioFacturacion = new UsuarioFacturacion();
      },
      error => {
        console.log(error.text());
      }
    );
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

  onNuevoEnvio() {
    this.envioService.nuevoEnvio(this.usuarioEnvio).subscribe(
      res => {
        this.getUsuarioActual();
        this.usuarioEnvioInfo = true;
        this.usuarioEnvio = new UsuarioEnvio();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  onActualizarEnvio(envio: UsuarioEnvio) {
    this.usuarioEnvio = envio;
    this.tabUsuarioEnvioSeleccionada = 1;
  }

  onBorrarEnvio(id: number) {
    this.envioService.borrarEnvio(id).subscribe(
      res => {
        this.getUsuarioActual();
        this.borrarEnvioInfo = true;
      },
      error => {
        this.loggedIn = false;
        console.log("sesión inactiva");
        this.router.navigate(['/miCuenta']);
      }
    );
  }

  setEnvioPredeterminado() {
    this.envioPredeterminado = false;
    this.envioService.establacerEnvioDeterminado(this.usuarioPredeterminadoEnvioId).subscribe(
      res => {
        this.getUsuarioActual();
        this.envioPredeterminado = true;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  getUsuarioActual() {
    this.usuarioService.getUsuarioActual().subscribe(
      res => {
        this.usuario = res.json();
        this.usuarioPagoLista = this.usuario.usuarioPagoList;
        this.usuarioEnvioList = this.usuario.usuarioEnvioList;

        for (let usuarioPago in this.usuarioPagoLista) {
          if (this.usuarioPagoLista[usuarioPago].pagoPredeterminado) {
            this.usuarioPagoPredeterminadoId = this.usuarioPagoLista[usuarioPago].id;
            break;
          }
        }

        for (let usuarioEnvio in this.usuarioEnvioList) {
          if (this.usuarioEnvioList[usuarioEnvio].usuarioEnvioPredeterminado) {
            this.usuarioPredeterminadoEnvioId = this.usuarioEnvioList[usuarioEnvio].id;
            break;
          }
        }

        this.datosObtenidos = true;
      },
      error => {
        console.log(error);
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

    //inicialización facturacion
    this.usuarioFacturacion.usuarioFacturacionProvincia = "";
    this.usuarioPago.tipo = "";
    this.usuarioPago.mesExpiracion = "";
    this.usuarioPago.anioExpiracion = "";
    this.usuarioPago.usuarioFacturacion = this.usuarioFacturacion;
    this.pagoPredeterminado = false;

    //inicialización envio
    this.usuarioEnvio.usuarioEnvioProvincia = "";
    this.envioPredeterminado = false;
  }

}
