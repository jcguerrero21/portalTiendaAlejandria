import {UsuarioPago} from './usuario-pago';
import {UsuarioEnvio} from './usuario-envio';

export class Usuario {
    public id: number;
    public nombre: string;
    public apellidos: string;
    public username: string;
    public password: string;
    public email: string;
    public telefono: string;
    public activo: boolean;
    public usuarioPagoList: UsuarioPago[];
    public usuarioEnvioList: UsuarioEnvio[];
}
