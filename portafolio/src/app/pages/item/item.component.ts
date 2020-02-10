import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../interfaces/productoDescripcion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  productoId: string;
  constructor( private route: ActivatedRoute,
              public productoService: ProductosService) { }

  ngOnInit() {
    this.route.params
      .subscribe( parametros => {
        this.productoService.getProducto(parametros['id'])
          .subscribe ((producto: ProductoDescripcion) => {
            this.producto = producto;
            this.productoId = parametros['id'];
          });
      });
  }

}
