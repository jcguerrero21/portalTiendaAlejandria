import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UsuarioService } from '../../services/usuario.service';
import { AppConst } from '../../constants/app.const';

declare var $:any;

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  private servidorPath = AppConst.servidorPath;
  private loginError:boolean = false;
  private loggedIn = false;
  private credenciales = {'username':'', 'password':''};

  private emailEnviado: boolean = false;
  private usernameExiste:boolean;
  private emailExiste:boolean;
  private username:string;
  private email:string;

  private emailNoExiste: boolean = false;
  private olvideContraseñaCorreoEnviado: boolean;
  private recuperarEmail: string;


  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

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

  onNewAccount() {
    this.usernameExiste = false;
    this.emailExiste = false;
    this.emailEnviado = false;
    
    this.usuarioService.nuevoUsuario(this.username, this.email).subscribe(
      res => {
        console.log(res);
        this.emailEnviado = true;
      },
      error => {
        console.log(error.text());
        let errorMessage = error.text();
        if(errorMessage==="usernameExiste") this.usernameExiste=true;
        if(errorMessage==="emailExiste") this.emailExiste=true;     
      }
    );
  }

  onOlvidasteContraseña(){
    this.olvideContraseñaCorreoEnviado = false;
    this.emailNoExiste = false;

    this.usuarioService.recuperarPassword(this.recuperarEmail).subscribe(
      res => {
        console.log(res);
        this.emailEnviado = true;
      },
      error => {
        console.log(error.text());
        let errorMessage = error.text();
        if(errorMessage==="emailExiste") this.emailExiste=true;     
      }
    );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
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
