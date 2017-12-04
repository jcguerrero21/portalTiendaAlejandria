import { CarritoItem } from './carrito-item';

export class Factura {
    public id: number;
    public fechaFactura: string;
    public fechaEnvio: string;
    public metodoEnvio: string;
    public estadoFactura: string;
    public facturaTotal: number;
    public carritoItemList: CarritoItem[];
}
