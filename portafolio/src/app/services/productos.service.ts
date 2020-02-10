import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../pages/interfaces/info-producto_idx.interface copy';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  prodcutosFiltrado: Producto[] = [];
  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( ( resolve , reject ) => {
      this.http.get('https://angular-html-ba590.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  public getProducto(id: string) {
    return this.http.get(`https://angular-html-ba590.firebaseio.com/productos/${id}.json`);
  }

  public buscarProducto( termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.prodcutosFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach ( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ) {
        this.prodcutosFiltrado.push(prod);
      }
    });
  }
}
