import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { routing } from './app.routing';

import { DataTableModule } from 'angular2-datatable';

import { LoginService } from './services/login.service';
import { UsuarioService } from './services/usuario.service';
import { PagoService } from './services/pago.service';
import { EnvioService } from './services/envio.service';
import { LibroService } from './services/libro.service';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavBarComponent,
    MiCuentaComponent,
    MiPerfilComponent,
    ListaLibrosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    routing,
    DataTableModule
  ],
  providers: [
    LoginService,
    UsuarioService,
    PagoService,
    EnvioService,
    LibroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
