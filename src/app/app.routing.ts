import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';

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
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);