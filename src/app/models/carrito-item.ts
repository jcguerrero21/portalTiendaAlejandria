import { Libro } from './libro';
import { CarritoCompra } from './carrito-compra';

export class CarritoItem {
    public id: number;
    public subtotal: number;
    public libro: Libro;
    public carritoCompra: CarritoCompra;
    public actualizar: boolean;
}
