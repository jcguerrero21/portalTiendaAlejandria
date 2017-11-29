import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app.const';
import { Router } from '@angular/router';
import { Libro } from '../../models/libro';
import { CarritoService } from '../../services/carrito.service';
import { CarritoCompra } from '../../models/carrito-compra';
import { CarritoItem } from '../../models/carrito-item';
 
@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
