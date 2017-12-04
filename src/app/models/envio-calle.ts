import {Factura} from './factura';

export class EnvioCalle {
    public id: number;
    public envioCalleNombre: string;
    public envioCalleCalle: string;
    public envioCalleCiudad: string;
    public envioCalleProvincia: string;
    public envioCallePais: string;
    public envioCalleCodigoPostal: string;
    public envioCallePredeterminado: boolean;
    public factura: Factura;
}
