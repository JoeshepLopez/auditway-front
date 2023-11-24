import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Folio } from '../model/folio';
import { TipoDocumento } from "../model/tipo-documento";

@Injectable({
    providedIn: 'root'
  })
  export class FolioService {
  
    private urlEndPointListado: string = 'http://localhost:8080/api/list/available/folios';
    private urlEndPointCreate: string = 'http://localhost:8080/api/create/folio';
    private urlEndPointUpdate: string = 'http://localhost:8080/api/update/folio';
    private urlEndPointDelete: string = 'http://localhost:8080/api/delete/folio';
    private urlEndPointListadoDoc: string = 'http://localhost:8080/api/list/available/documents';


    constructor(private http: HttpClient) { }
  
    getListado(): Observable<Folio[]> {
      return this.http.get<Folio[]>(this.urlEndPointListado);
    }
  
    create(folio: Folio): Observable<Folio> {
      return this.http.post<Folio>(this.urlEndPointCreate, folio);
    }
  
    update(id: number, folio: Folio): Observable<Folio> {
      const url = `${this.urlEndPointUpdate}/${id}`;
      return this.http.put<Folio>(url, Folio);
    }
  
    delete(id: number): Observable<void> {
      const url = `${this.urlEndPointDelete}/${id}`;
      return this.http.delete<void>(url);
    }

    getListadoFolios(): Observable<TipoDocumento[]> {
      return this.http.get<TipoDocumento[]>(this.urlEndPointListadoDoc);
    }
}