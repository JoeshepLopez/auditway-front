import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FacturaReporte } from '../model/factura-reporte';

@Injectable({
    providedIn: 'root'
  })
  export class FacturaReporteService {
  
    private urlEndPointListado: string = 'http://localhost:8080/api/facturas';
    private urlEndPointListadoPorPeriodo: string = 'http://localhost:8080/api/facturas-by-periodo';
    constructor(private http: HttpClient) { }
  
    getListado(): Observable<FacturaReporte[]> {
      return this.http.get<FacturaReporte[]>(this.urlEndPointListado);
    }

      
    getListadoPorPeriodo(fechaInicio: string, fechaFin: string): Observable<FacturaReporte[]> {
      const url = `${this.urlEndPointListadoPorPeriodo}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
      return this.http.get<FacturaReporte[]>(url);
    }
}