import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app.const';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { Factura } from '../../models/factura';
import { CarritoItem } from '../../models/carrito-item';

@Component({
  selector: 'app-resumen-factura',
  templateUrl: './resumen-factura.component.html',
  styleUrls: ['./resumen-factura.component.css']
})
export class ResumenFacturaComponent implements OnInit {
  private servidorPath = AppConst.servidorPath;
  private factura: Factura = new Factura();
  private fechaEstimadaEntrega: string;
  private carritoItemLista: CarritoItem[] = [];

  constructor(
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.factura = JSON.parse(params['factura']);

      let fechaEstimada = new Date();

      if (this.factura.metodoEnvio == "metodoEnvioNormal") {
        fechaEstimada.setDate(fechaEstimada.getDate() + 5);
      } else {
        fechaEstimada.setDate(fechaEstimada.getDate() + 1);
      }

      this.fechaEstimadaEntrega = fechaEstimada.getDate() +'/'+ fechaEstimada.getMonth() +'/' + fechaEstimada.getFullYear();

      this.carritoItemLista = this.factura.carritoItemList;
    });
  }

}
