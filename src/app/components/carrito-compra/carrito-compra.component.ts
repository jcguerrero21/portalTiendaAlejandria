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
  private servidorPath = AppConst.servidorPath;
  private libroSeleccionado: Libro;
  private carritoItemLista: CarritoItem[] = [];
  private carritoItemNumero: number;
  private carritoCompra: CarritoCompra = new CarritoCompra();
  private carritoItemActualizado: boolean;
  private carritoVacio: boolean;
  private NoHayStock: boolean;

  constructor(
    private router: Router,
    private carritoService: CarritoService
  ) { }

  OnSelect(libro: Libro) {
    this.libroSeleccionado = libro;
    this.router.navigate(['/libroDetalle', this.libroSeleccionado.id]);
  }

  onBorrarCarritoItem(carritoItem: CarritoItem) {
    this.carritoService.borrarCarritoItem(carritoItem.id).subscribe(
      res => {
        console.log(res.text());
        this.getCarritoListaItem();
        this.getCarritoCompra();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  onActualizarCarritoItem(carritoItem: CarritoItem) {
    this.carritoService.actualizarCarritoItem(carritoItem.id, carritoItem.cantidad).subscribe(
      res => {
        console.log(res.text());
        this.carritoItemActualizado = true;
        this.getCarritoCompra();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  getCarritoListaItem() {
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

  getCarritoCompra(){
    this.carritoService.getCarritoCompra().subscribe(
      res => {
        console.log(res.json());
        this.carritoCompra = res.json();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  onCheckOut() {
    if(this.carritoItemNumero==0){
      this.carritoVacio = true;
    } else {
      for (let item of this.carritoItemLista) {
        if (item.cantidad > item.libro.numeroDeStock) {
          console.log("no hay suficiente stock en algún artículo");
          this.NoHayStock = true;
          return;
        }
      }

      // this.router.navigate('[/order]');
    }
  }

  ngOnInit() {
    this.getCarritoListaItem();
    this.getCarritoCompra();
  }

}
