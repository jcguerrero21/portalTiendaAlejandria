import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsuarioService } from '../../services/usuario.service';
import { AppConst } from '../../constants/app.const';
import { slide } from '../../animations/animations';
declare var $: any;

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css'],
  animations: [slide]
})
export class MiCuentaComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  private servidorPath = AppConst.servidorPath;
  private loginError: boolean = false;
  private loggedIn = false;
  private credenciales = { 'username': '', 'password': '' };

  private emailEnviado: boolean = false;
  private usernameExiste: boolean = false;
  private emailExiste: boolean = false;
  private username: string;
  private email: string;

  private emailNoExiste: boolean = false;
  private olvidePasswordCorreoEnviado: boolean = false;
  private recuperarEmail: string;


  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  onLogin() {
    this.loginService.enviarCredenciales(this.credenciales.username, this.credenciales.password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("xAuthToken", res.json().token);
        this.loggedIn = true;
        location.reload();
        this.router.navigate(['/inicio']);
      },
      error => {
        this.loggedIn = false;
        this.loginError = true;
      }
    );
  }

  onNuevaCuenta() {
    this.usernameExiste = false;
    this.emailExiste = false;
    this.emailEnviado = false;

    this.usuarioService.nuevoUsuario(this.username, this.email).subscribe(
      res => {
        console.log(res);
        this.emailEnviado = true;
        this.usernameExiste = false;
        this.emailExiste = false;
        this.emailEnviado = false;
        this.olvidePasswordCorreoEnviado = false;
      },
      error => {
        console.log(error.text());
        let errorMessage = error.text();
        if (errorMessage === "usernameExiste") this.usernameExiste = true;
        if (errorMessage === "emailExiste") this.emailExiste = true;
      }
    );
  }

  onOlvidastePassword() {
    this.olvidePasswordCorreoEnviado = false;
    this.emailNoExiste = false;

    this.usuarioService.recuperarPassword(this.recuperarEmail).subscribe(
      res => {
        console.log(res);
        this.olvidePasswordCorreoEnviado = true;
        this.usernameExiste = false;
        this.emailExiste = false;
        this.emailEnviado = false;
      },
      error => {
        console.log(error.text());
        let errorMessage = error.text();
        if (errorMessage === "Email no encontrado") this.emailNoExiste = true;
      }
    );
  }

  ngOnInit() {
    this.loginService.verificarSesion().subscribe(
      res => {
        this.loggedIn = true;
      },
      error => {
        this.loggedIn = false;
      }
    );
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'tab_id');
  }

}
