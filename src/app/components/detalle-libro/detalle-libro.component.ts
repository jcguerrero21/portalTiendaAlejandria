import { Component, OnInit, HostBinding } from '@angular/core';
import { AppConst } from 'app/constants/app.const';
import { Libro } from '../../models/libro';
import { LibroService } from '../../services/libro.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { slide } from '../../animations/animations';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css'],
  animations: [slide]
})
export class DetalleLibroComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  private libroId: number;
  private libro: Libro = new Libro();
  private servidorPath = AppConst.servidorPath;
  private numeroList: number[] = [1,2,3,4,5,6,7,8,9];
  private qty: number;

  private addLibroCorrectamente: boolean = false;
  private noHayStock: boolean = false;

  constructor(
    private libroService: LibroService,
    private router: Router,
    private http: Http,
    private route: ActivatedRoute
  ) { }

  onAddAlCarrito(){
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.libroId = Number.parseInt(params['id']);
    });

    this.libroService.getLibro(this.libroId).subscribe(
      res => {
        this.libro = res.json();
      },
      error => {
        console.log(error);
      }
    );

    this.qty = 1;
  }

}