import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import swal from 'sweetalert2';
import { TipoDocumento } from './model/tipo-documento';
import { TipoDocumentoService } from './services/tipo-documento.service';

@Component({
  selector: "app-tipo-documento",
  templateUrl: "./tipo-documento.component.html",
})
export class TipoDocumentoComponent implements AfterViewInit, OnInit {

  private displayedColumns: string[] = ['id', 'numeroDocumento', 'tipoDocumento'];
  private dataSource = new MatTableDataSource<TipoDocumento>();
  private tipoDocumento: TipoDocumento = new TipoDocumento();

  constructor(private tipoDocumentoService: TipoDocumentoService) {}

  ngOnInit(): void {
    this.getListDocument();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getListDocument(){
    this.tipoDocumentoService.getListado().subscribe({
      next:(data) => {
        console.log(data);
        this.dataSource.data = data;
      }, error: (e) => {}
    })
  }

  guardar(): void {

    if( this.tipoDocumento.numeroDocumento == '' && this.tipoDocumento.tipoDocumento == ''){
      swal('Solicitud de documento', `¡Debe ingresar todos los campos del formulario!`, 'error');
    } else {

      this.tipoDocumentoService.create(this.tipoDocumento).subscribe(
        (response) => {
          console.log('Formulario enviado con éxito:', response);
          swal('Solicitud de documento', `¡Formulario enviado con éxito!`, 'success');
          this.tipoDocumento = new TipoDocumento();
        },
        (error) => {
          if (error.status === 400) {
            console.error('Error al enviar el formulario. Por favor, completa todos los campos.');
          } else {
            console.error('Error al enviar el formulario:', error);
          }
        }
      );

    }
  }


  

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];