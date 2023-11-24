import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from '../model/producto';

@Injectable({
    providedIn: 'root'
  })
  export class ProductoService {
  
    private urlEndPointListado: string = 'http://localhost:8080/api/list/products';
    private urlEndPointCreate: string = 'http://localhost:8080/api/create/product';
    private urlEndPointUpdate: string = 'http://localhost:8080/api/update/product';
    private urlEndPointDelete: string = 'http://localhost:8080/api/delete/product';

    constructor(private http: HttpClient) { }
  
    getListado(): Observable<Producto[]> {
      return this.http.get<Producto[]>(this.urlEndPointListado);
    }
  
    create(producto: Producto): Observable<Producto> {
      return this.http.post<Producto>(this.urlEndPointCreate, producto);
    }
  
    update(id: number, producto: Producto): Observable<Producto> {
      const url = `${this.urlEndPointUpdate}/${id}`;
      return this.http.put<Producto>(url, producto);
    }
  
    delete(id: number): Observable<void> {
      const url = `${this.urlEndPointDelete}/${id}`;
      return this.http.delete<void>(url);
    }
}