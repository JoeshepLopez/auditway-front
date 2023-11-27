import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaReporte } from './model/factura-reporte';
import { FacturaReporteService } from './services/factura-reporte.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: "app-reporte-factura",
  templateUrl: "./factura-reporte.component.html",
})
export class ReporteFacturaComponent implements AfterViewInit, OnInit {

  private displayedColumns: string[] = [
    'cliente.nombre',
    'cliente.apellido',
    'cliente.rut',
    'nombreTipoDocumento',
    'numeroFolio',
    'total',
    'estadoSii'
  ];

  private dataSource = new MatTableDataSource<FacturaReporte>();
  private facturaReporte: FacturaReporte = new FacturaReporte();
  private fechaInicio: string;
  private fechaTermino: string;

  constructor(private facturaReporteService: FacturaReporteService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getListDocument();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getListDocument() {
    this.facturaReporteService.getListado().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
      }, error: (e) => { }
    })
  }

  filtrarDocumentos(fechaInicio: Date, fechaTermino: Date) {
    const fechaInicioFormateada = this.datePipe.transform(fechaInicio, 'yyyy-MM-dd');
    const fechaTerminoFormateada = this.datePipe.transform(fechaTermino, 'yyyy-MM-dd');
    this.facturaReporteService.getListadoPorPeriodo(fechaInicioFormateada, fechaTerminoFormateada).subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
      }, error: (e) => { }
    })
  }

  exportarCsv(dataSource: any) {
    console.log('datasouce', dataSource.data);

    if(dataSource.data.lenght > 1){
      const csvContent = this.arrayToCSV(dataSource.data);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      FileSaver.saveAs(blob, 'exported_data.csv');
    }

    swal('Error', `No existen registros para descargar en formato CSV.`, 'error');
  }

  arrayToCSV(data: any[]): string {
    const csvRows = [];

    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const rowArray = [];
      for (const header of headers) {
        const fieldValue = this.processField(row, header);
        rowArray.push(`"${fieldValue}"`);
      }
      csvRows.push(rowArray.join(','));
    }

    return csvRows.join('\n');
  }

  processField(row: any, field: string): string {
    if (field === 'cliente') {
      return row.cliente ? `${row.cliente.nombre} ${row.cliente.apellido}` : '';
    } else if (field === 'items') {
      return '';
    } else {
      const value = row[field];
      return typeof value === 'object' ? JSON.stringify(value) : value;
    }
  }
}
