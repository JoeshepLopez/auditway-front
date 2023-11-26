import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';
import { TipoDocumento } from '../models/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint: string = 'http://localhost:8080/api/facturas';
  private urlEndPointListado: string = 'http://localhost:8080/api/list/available/documents';
  private urlEndPointById: string = 'http://localhost:8080/api/get/type-document';

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }
  
  getListado(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.urlEndPointListado);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filtrarProductos(term: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`);
  }

  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.urlEndPoint, factura);
  }

  getTipoDocumentoById(id: string){
    return this.http.get<TipoDocumento>(`${this.urlEndPointById}/${id}`)
  }

}
