import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contacto } from "../model/contacto";

@Injectable({
    providedIn: 'root'
  })
  export class ContactoService {
  
    private urlEndPoint: string = 'http://localhost:8080/api/new/contact';
  
    constructor(private http: HttpClient) { }
  
    create(contacto: Contacto): Observable<Contacto> {
      return this.http.post<Contacto>(this.urlEndPoint, contacto);
    }
}