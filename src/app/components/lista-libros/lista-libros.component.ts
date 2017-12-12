import { Component, OnInit, HostBinding } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { AppConst } from '../../constants/app.const';
import { slide } from '../../animations/animations';
import { LoginService } from '../../services/login.service';

declare var $: any;

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css'],
  animations: [slide]
})
export class ListaLibrosComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  public filtroConsulta = "";
  public rowsOnPage = 5;

  private seleccionarLibro: Libro;
  private listaLibros: Libro[];
  private servidorPath = AppConst.servidorPath;

  constructor(
    private libroService: LibroService,
    private router: Router,
    private http: Http,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { }

  onSelect(libro: Libro) {
    this.loginService.verificarSesion().subscribe(
      res => {
        this.seleccionarLibro = libro;
        this.router.navigate(['/libroDetalle', this.seleccionarLibro.id]);
      },
      error => {
        console.log("Debes estar logeado para poder comprar");
        this.router.navigate(['/miCuenta']);
      }
    );
  }

  ngOnInit() {
    
    this.libroService.getListaLibros().subscribe(
      res => {
        console.log(res.json());
        this.listaLibros = res.json();
      },
      err => {
        console.log(err);
      }
    );
  }

}
