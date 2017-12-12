import { Component, OnInit, HostBinding } from '@angular/core';
import { AppConst } from '../../constants/app.const';
import { Router, NavigationExtras } from '@angular/router';
import { Libro } from '../../models/libro';
import { CarritoService } from '../../services/carrito.service';
import { EnvioService } from '../../services/envio.service';
import { PagoService } from '../../services/pago.service';
import { CheckoutService } from '../../services/checkout.service';
import { CarritoItem } from '../../models/carrito-item';
import { CarritoCompra } from '../../models/carrito-compra';
import { EnvioCalle } from '../../models/envio-calle';
import { FacturacionCalle } from '../../models/facturacion-calle';
import { UsuarioPago } from '../../models/usuario-pago';
import { UsuarioFacturacion } from '../../models/usuario-facturacion';
import { UsuarioEnvio } from '../../models/usuario-envio';
import { Pago } from '../../models/pago';
import { Factura } from '../../models/factura';
import { slide } from '../../animations/animations';

declare var $: any;

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  animations: [slide]
})
export class FacturaComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  private servidorPath = AppConst.servidorPath;
  private libroSeleccionado: Libro;
  private carritoItemLista: CarritoItem[] = [];
  private carritoItemNumero: number;
  private carritoCompra: CarritoCompra = new CarritoCompra();
  private carritoItemActualizado: boolean;
  private envioCalle: EnvioCalle = new EnvioCalle();
  private facturacionCalle: FacturacionCalle = new FacturacionCalle();
  private usuarioPago: UsuarioPago = new UsuarioPago();
  private usuarioEnvio: UsuarioEnvio = new UsuarioEnvio();
  private usuarioFacturacion: UsuarioFacturacion = new UsuarioFacturacion();

  private usuarioEnvioLista: UsuarioEnvio[] = [];
  private usuarioPagoLista: UsuarioPago[] = [];
  private pago: Pago = new Pago();
  private emptyEnvioLista: boolean = true;
  private emptyPagoLista: boolean = true;
  private provinciaLista: string[] = [];
  private metodoEnvio: string;
  private factura: Factura = new Factura();


  constructor(
    private router: Router,
    private carritoService: CarritoService,
    private envioService: EnvioService,
    private pagoService: PagoService,
    private checkoutService: CheckoutService
  ) { }

  onSelect(libro: Libro) {
    this.libroSeleccionado = libro;
    this.router.navigate(['/libroDetalle', this.libroSeleccionado.id]);
  }

  getCarritoItemLista() {
    this.carritoService.getCarritoListaItem().subscribe(
      res => {
        this.carritoItemLista = res.json();
        this.carritoItemNumero = this.carritoItemLista.length;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  setCalleEnvio(usuarioEnvio: UsuarioEnvio) {
    this.envioCalle.envioCalleNombre = usuarioEnvio.usuarioEnvioNombre;
    this.envioCalle.envioCalleCalle = usuarioEnvio.usuarioEnvioCalle;
    this.envioCalle.envioCalleCiudad = usuarioEnvio.usuarioEnvioCiudad;
    this.envioCalle.envioCalleProvincia = usuarioEnvio.usuarioEnvioProvincia;
    this.envioCalle.envioCallePais = usuarioEnvio.usuarioEnvioPais;
    this.envioCalle.envioCalleCodigoPostal = usuarioEnvio.usuarioEnvioCodigoPostal;
  }

  setMetodoPago(usuarioPago: UsuarioPago) {
    this.pago.tipo = usuarioPago.tipo;
    this.pago.numeroTarjeta = usuarioPago.numeroTarjeta;
    this.pago.mesExpiracion = usuarioPago.mesExpiracion;
    this.pago.anioExpiracion = usuarioPago.anioExpiracion;
    this.pago.cvc = usuarioPago.cvc;
    this.pago.nombreTitular = usuarioPago.nombreTitular;
    this.pago.pagoPredeterminado = usuarioPago.pagoPredeterminado;

    this.facturacionCalle.facturacionCalleNombre = usuarioPago.usuarioFacturacion.usuarioFacturacionNombre;
    this.facturacionCalle.facturacionCalleCalle = usuarioPago.usuarioFacturacion.usuarioFacturacionCalle;
    this.facturacionCalle.facturacionCalleCiudad = usuarioPago.usuarioFacturacion.usuarioFacturacionCiudad;
    this.facturacionCalle.facturacionCalleProvincia = usuarioPago.usuarioFacturacion.usuarioFacturacionProvincia;
    this.facturacionCalle.facturacionCallePais = usuarioPago.usuarioFacturacion.usuarioFacturacionPais;
    this.facturacionCalle.facturacionCalleCodigoPostal = usuarioPago.usuarioFacturacion.usuarioFacturacionCodigoPostal;
  }

  setFacturacionIgualEnvio(checked: boolean) {
    console.log("el mismo que el envio");

    if (checked) {
      this.facturacionCalle.facturacionCalleNombre = this.envioCalle.envioCalleNombre;
      this.facturacionCalle.facturacionCalleCalle = this.envioCalle.envioCalleCalle;
      this.facturacionCalle.facturacionCalleCiudad = this.envioCalle.envioCalleCiudad;
      this.facturacionCalle.facturacionCalleProvincia = this.envioCalle.envioCalleProvincia;
      this.facturacionCalle.facturacionCallePais = this.envioCalle.envioCallePais;
      this.facturacionCalle.facturacionCalleCodigoPostal = this.envioCalle.envioCalleCodigoPostal;
    } else {
      this.facturacionCalle.facturacionCalleNombre = "";
      this.facturacionCalle.facturacionCalleCalle = "";
      this.facturacionCalle.facturacionCalleCiudad = "";
      this.facturacionCalle.facturacionCalleProvincia = "";
      this.facturacionCalle.facturacionCallePais = "";
      this.facturacionCalle.facturacionCalleCodigoPostal = "";
    }
  }

  onSubmit() {
    this.checkoutService.checkOut(
      this.envioCalle,
      this.facturacionCalle,
      this.pago,
      this.metodoEnvio
    ).subscribe(
      res => {
        this.factura = res.json();
        console.log(this.factura);

        let navigationExtras: NavigationExtras = {
          queryParams: {
            "factura": JSON.stringify(this.factura)
          }
        };
        this.router.navigate(['/resumenFactura'], navigationExtras);
      },
      error => {
        console.log(error.text());
      }
      );
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.collapsible').collapsible();
    });

    this.getCarritoItemLista();

    this.carritoService.getCarritoCompra().subscribe(
      res => {
        this.carritoCompra = res.json();
      },
      error => {
        console.log(error.text());
      }
    );

    this.envioService.getUsuarioEnvioList().subscribe(
      res => {
        this.usuarioEnvioLista = res.json();
        if (this.usuarioEnvioLista.length) {
          this.emptyEnvioLista = false;

          for (let usuarioenvio of this.usuarioEnvioLista) {
            if (usuarioenvio.usuarioEnvioPredeterminado) {
              this.setCalleEnvio(usuarioenvio);
              return;
            }
          }
        }
      },
      error => {
        console.log(error.text());
      }
    );

    this.pagoService.getUsuarioPagoLista().subscribe(
      res => {
        this.usuarioPagoLista = res.json();
        if (this.usuarioPagoLista.length) {
          this.emptyPagoLista = false;

          for (let usuariopago of this.usuarioPagoLista) {
            if (usuariopago.pagoPredeterminado) {
              this.setMetodoPago(usuariopago);
              return;
            }
          }
        }
      },
      error => {
        console.log(error.text());
      }
    );

    for (let p in AppConst.provincias) {
      this.provinciaLista.push(p);
    }

    this.pago.tipo = "";
    this.pago.mesExpiracion = "";
    this.pago.anioExpiracion = "";
    this.facturacionCalle.facturacionCalleProvincia = "";
    this.envioCalle.envioCalleProvincia = "";
    this.metodoEnvio = "metodoEnvioNormal";
  }


}
