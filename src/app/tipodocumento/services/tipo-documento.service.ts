import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoDocumento } from '../model/tipo-documento';

@Injectable({
    providedIn: 'root'
  })
  export class TipoDocumentoService {
  
    private urlEndPointListado: string = 'http://localhost:8080/api/list/available/documents';
    private urlEndPointCreate: string = 'http://localhost:8080/api/create/tipo/documento';
    private urlEndPointUpdate: string = 'http://localhost:8080/api/update/tipo_document';
    private urlEndPointDelete: string = 'http://localhost:8080/api/delete/tipo_document';

    constructor(private http: HttpClient) { }
  
    getListado(): Observable<TipoDocumento[]> {
      return this.http.get<TipoDocumento[]>(this.urlEndPointListado);
    }
  
    create(tipoDocumento: TipoDocumento): Observable<TipoDocumento> {
      return this.http.post<TipoDocumento>(this.urlEndPointCreate, tipoDocumento);
    }
  
    update(tipoDocumento: TipoDocumento): Observable<TipoDocumento> {
      const url = `${this.urlEndPointUpdate}/${tipoDocumento.id}`;
      return this.http.put<TipoDocumento>(url, tipoDocumento);
    }
  
    delete(id: number): Observable<void> {
      const url = `${this.urlEndPointDelete}/${id}`;
      return this.http.delete<void>(url);
    }
}