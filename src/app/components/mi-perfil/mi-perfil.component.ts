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
import { Factura } from '../../models/factura';
import { FacturaService } from '../../services/factura.service';
import { CarritoItem } from '../../models/carrito-item';

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
  private actualizadoExito: boolean = false;
  private nuevaPassword: string;
  private incorrectPassword: boolean = false;
  private passwordActual: string;

  private usuarioPago: UsuarioPago = new UsuarioPago();
  private usuarioFacturacion: UsuarioFacturacion = new UsuarioFacturacion();
  private usuarioPagoLista: UsuarioPago[] = [];
  private pagoPredeterminado: boolean = false;
  private borrarTarjetaOk: boolean = false;
  private usuarioPagoInfo: boolean = false;
  private usuarioPagoPredeterminadoId: number;
  private listaProvincias: string[] = [];

  private usuarioEnvio: UsuarioEnvio = new UsuarioEnvio();
  private usuarioEnvioList: UsuarioEnvio[] = [];
  private usuarioPredeterminadoEnvioId: number;
  private envioPredeterminado: boolean = false;
  private usuarioEnvioInfo: boolean = false;
  private borrarEnvioInfo: boolean = false;

  private facturaLista: Factura[] = [];
  private factura: Factura = new Factura();
  private mostrarDetalleFactura: boolean;

  private carritoItemLista: CarritoItem[] = [];

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private pagoService: PagoService,
    private envioService: EnvioService,
    private facturaService: FacturaService,
    private router: Router
  ) { }

  onActualizarInfoUsuario() {
    this.usuarioService.actualizarUsuarioInfo(this.usuario, this.nuevaPassword, this.passwordActual).subscribe(
      res => {
        console.log(res.text());
        this.actualizadoExito = true;
        this.incorrectPassword = false;
        this.borrarEnvioInfo = true;
        this.envioPredeterminado = false;
        this.borrarTarjetaOk = false;
        this.pagoPredeterminado = false;
        this.usuarioEnvioInfo = false;
        this.usuarioPagoInfo = false;
      },
      error => {
        console.log(error.text());
        let mensajeError = error.text();
        if (mensajeError === "Contraseña actual incorrecta") this.incorrectPassword = true;
      }
    );
  }

  onNuevoPago() {
    this.pagoService.nuevoPago(this.usuarioPago).subscribe(
      res => {
        this.getUsuarioActual();
        this.usuarioPagoInfo = true;
        this.borrarEnvioInfo = true;
        this.envioPredeterminado = false;
        this.borrarTarjetaOk = false;
        this.actualizadoExito = false;
        this.pagoPredeterminado = false;
        this.usuarioEnvioInfo = false;
        this.incorrectPassword = false;
        this.usuarioPago = new UsuarioPago();
        this.usuarioFacturacion = new UsuarioFacturacion();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  onBorrarPago(id: number) {
    this.pagoService.borrarPago(id).subscribe(
      res => {
        this.pagoPredeterminado = false;
        this.borrarTarjetaOk = true;
        this.borrarEnvioInfo = true;
        this.envioPredeterminado = false;
        this.actualizadoExito = false;
        this.usuarioEnvioInfo = false;
        this.usuarioPagoInfo = false;
        this.incorrectPassword = false;
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
        this.borrarEnvioInfo = true;
        this.envioPredeterminado = false;
        this.borrarTarjetaOk = false;
        this.actualizadoExito = false;
        this.usuarioEnvioInfo = false;
        this.usuarioPagoInfo = false;
        this.incorrectPassword = false;
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
        this.borrarEnvioInfo = false;
        this.envioPredeterminado = false;
        this.borrarTarjetaOk = false;
        this.actualizadoExito = false;
        this.pagoPredeterminado = false;
        this.usuarioPagoInfo = false;
        this.incorrectPassword = false;
        this.usuarioEnvio = new UsuarioEnvio();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  onBorrarEnvio(id: number) {
    this.envioService.borrarEnvio(id).subscribe(
      res => {
        this.borrarEnvioInfo = true;
        this.envioPredeterminado = false;
        this.borrarTarjetaOk = false;
        this.actualizadoExito = false;
        this.pagoPredeterminado = false;
        this.usuarioEnvioInfo = false;
        this.usuarioPagoInfo = false;
        this.incorrectPassword = false;
        this.getUsuarioActual();
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
        this.borrarEnvioInfo = false;
        this.borrarTarjetaOk = false;
        this.actualizadoExito = false;
        this.pagoPredeterminado = false;
        this.usuarioEnvioInfo = false;
        this.usuarioPagoInfo = false;
        this.incorrectPassword = false;
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

  onMostrarDetalleFactura(factura: Factura) {
    this.envioPredeterminado = false;
    this.borrarEnvioInfo = false;
    this.borrarTarjetaOk = false;
    this.actualizadoExito = false;
    this.pagoPredeterminado = false;
    this.usuarioEnvioInfo = false;
    this.usuarioPagoInfo = false;
    this.incorrectPassword = false;
    console.log(factura);
    this.factura = factura;
    this.carritoItemLista = this.factura.carritoItemList;
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
    );

    this.getUsuarioActual();

    this.facturaService.getFacturaLista().subscribe(
      res => {
        this.facturaLista = res.json();
      },
      error => {
        console.log(error.text());
      }
    );

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
