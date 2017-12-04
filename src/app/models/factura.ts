import { CarritoItem } from './carrito-item';
import { Pago } from './pago';

export class Factura {
    public id: number;
    public fechaFactura: string;
    public fechaEnvio: string;
    public metodoEnvio: string;
    public estadoFactura: string;
    public facturaTotal: number;
    public carritoItemList: CarritoItem[];
    public pago: Pago;
}
