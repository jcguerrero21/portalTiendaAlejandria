import { UsuarioFacturacion } from './usuario-facturacion';

export class UsuarioPago {
    public id: number;
    public tipo: string;
    public nombreTarjeta: string;
    public numeroTarjeta: string;
    public mesExpiracion: string;
    public anioExpiracion: string;
    public cvc: number;
    public nombreTitular: string; 
    public pagoPredeterminado: boolean;
    public usuarioFacturacion: UsuarioFacturacion;
}
