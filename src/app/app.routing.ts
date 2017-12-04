import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';
import { DetalleLibroComponent } from './components/detalle-libro/detalle-libro.component';
import { CarritoCompraComponent } from './components/carrito-compra/carrito-compra.component';
import { FacturaComponent } from './components/factura/factura.component';
import { ResumenFacturaComponent } from './components/resumen-factura/resumen-factura.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        component: InicioComponent
    },
    {
        path: 'miCuenta',
        component: MiCuentaComponent
    },
    {
        path: 'miPerfil',
        component: MiPerfilComponent
    },
    {
        path: 'listaLibros',
        component: ListaLibrosComponent
    },
    {
        path: 'libroDetalle/:id',
        component: DetalleLibroComponent
    },
    {
        path: 'carritoCompra',
        component: CarritoCompraComponent
    },
    {
        path: 'pedido',
        component: FacturaComponent
    },
    {
        path: 'resumenFactura',
        component: ResumenFacturaComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);