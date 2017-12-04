import { FacturacionCalle } from "app/models/facturacion-calle";

export class Pago {
    public id: number;
    public tipo: string;
    public nombreTarjeta: string;
    public numeroTarjeta: string;
    public mesExpiracion: string;
    public anioExpiracion: string;
    public cvc: number;
    public nombreTitular: string;
    public pagoPredeterminado: boolean;
    public facturacionCalle: FacturacionCalle;
}
