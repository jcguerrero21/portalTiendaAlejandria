import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

declare var $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn = false;
  private url = "http://localhost:4200/inicio";

  constructor(private loginService:LoginService) { }

  logout() {
    this.loginService.logout().subscribe(
      res => {
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    $(".button-collapse").sideNav();

    this.loginService.verificarSesion().subscribe(
      res => {
        this.loggedIn = true;
      },
      erro => {
        this.loggedIn = false;
      }
    );
  }

}
