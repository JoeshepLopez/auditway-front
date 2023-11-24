import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import { TipoDocumento } from './model/tipo-documento';
import { TipoDocumentoService } from './services/tipo-documento.service';
import { MatDialog} from '@angular/material/dialog';
import { DialogAddEditComponent } from './dialog/dialog-add-edit/dialog-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteTipoDocComponent } from './dialog/dialogo-delete/dialogo-delete.tipo.doc.component';

@Component({
  selector: "app-tipo-documento",
  templateUrl: "./tipo-documento.component.html",
})
export class TipoDocumentoComponent implements AfterViewInit, OnInit {

  private displayedColumns: string[] = ['id', 'numeroDocumento', 'tipoDocumento', 'acciones'];
  private dataSource = new MatTableDataSource<TipoDocumento>();
  private tipoDocumento: TipoDocumento = new TipoDocumento();

  constructor(private tipoDocumentoService: TipoDocumentoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getListDocument();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  dialogoNuevoTipoDocumento(): void {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true, 
      width: "450px",
      height: "35%"
    }).afterClosed().subscribe(resultado => {
      if(resultado === 'creado'){
        this.getListDocument();
      }
    });
  }


  dialogoEditarTipoDocumento(tipoDocumentoData: TipoDocumento): void {

    this.dialog.open(DialogAddEditComponent, {
      disableClose: true, 
      width: "450px",
      height: "35%",
      data: tipoDocumentoData
    }).afterClosed().subscribe(resultado => {
      if(resultado === 'editado'){
        this.getListDocument();
      }
    });
  }

  dialogoEliminarTipoDocumento(tipoDocumentoData: TipoDocumento){
    this.dialog.open(DialogoDeleteTipoDocComponent, {
      disableClose: true, 
      data: tipoDocumentoData
    }).afterClosed().subscribe(resultado => {
      if(resultado === 'eliminar'){
        this.tipoDocumentoService.delete(tipoDocumentoData.id).subscribe({
            next:(data) => {
              this.mostrarAlerta("Tipo de documento fue eliminado", "listo");
              this.getListDocument();
            }, error: (e) => {
              this.mostrarAlerta("No se pudo tipo de documento, esta siendo utilizado en algún documento", "error");
            }
          })
      }
    });
  }
  
  mostrarAlerta(mensaje: string, accion: string){
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 3000
    });
  }

  getListDocument(){
    this.tipoDocumentoService.getListado().subscribe({
      next:(data) => {
        console.log(data);
        this.dataSource.data = data;
      }, error: (e) => {}
    })
  }
}
