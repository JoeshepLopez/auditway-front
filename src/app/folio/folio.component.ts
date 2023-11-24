import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Folio } from './model/folio';
import { FolioService } from './services/folio.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddEditFolioComponent } from './dialog/dialog-add-edit/dialog-add-edit.folio.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteFolioComponent } from './dialog/dialogo-delete/dialogo-delete.folio.component';

@Component({
  selector: "app-folio",
  templateUrl: "./folio.component.html",
})
export class FolioComponent implements AfterViewInit, OnInit {

  private displayedColumns: string[] = ['id', 'tipoDocumento', 'folioDesde', 'folioHasta', 'acciones'];
  private dataSource = new MatTableDataSource<Folio>();
  private folio: Folio = new Folio();

  constructor(private folioService: FolioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getListFolios();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  dialogoNuevoFolio(): void {
    this.dialog.open(DialogAddEditFolioComponent, {
      disableClose: true, 
      width: "550px",
      height: "50%"
    }).afterClosed().subscribe(resultado => {
      if(resultado === 'creado'){
        this.getListFolios();
      }
    });
  }


  dialogoEditarFolio(folioData: Folio): void {
    this.dialog.open(DialogAddEditFolioComponent, {
      disableClose: true, 
      width: "550px",
      height: "50%",
      data: folioData
    }).afterClosed().subscribe(resultado => {
      if(resultado === 'editado'){
        this.getListFolios();
      }
    });
  }

  dialogoEliminarFolio(folioData: Folio){
    this.dialog.open(DialogoDeleteFolioComponent, {
      disableClose: true, 
      data: folioData  
    }).afterClosed().subscribe(resultado => {
      if(resultado === 'eliminar'){
        this.folioService.delete(folioData.id).subscribe({
            next:(data) => {
              this.mostrarAlerta("Folio fue eliminado", "listo");
              this.getListFolios();
            }, error: (e) => {
              this.mostrarAlerta("No se pudo eliminar folio, esta siendo utilizado en algún documento", "error");
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

  getListFolios(){
    this.folioService.getListado().subscribe({
      next:(data) => {
        console.log(data);
        this.dataSource.data = data;
      }, error: (e) => {}
    })
  }
}
