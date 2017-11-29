import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { AppConst } from '../../constants/app.const';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {

  public filtroConsulta = "";
  public rowsOnPage = 5;

  private seleccionarLibro: Libro;
  private listaLibros: Libro[];
  private servidorPath = AppConst.servidorPath;

  constructor(
    private libroService: LibroService,
    private router: Router,
    private http: Http,
    private route: ActivatedRoute
  ) { }

  onSelect(libro: Libro) {
    this.seleccionarLibro = libro;
    this.router.navigate(['/libroDetalle', this.seleccionarLibro.id]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['libroList']) {
        console.log("Lista de libros filtrada");
        this.listaLibros = JSON.parse(params['libroList']);
      } else {
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
    );

  }

}
