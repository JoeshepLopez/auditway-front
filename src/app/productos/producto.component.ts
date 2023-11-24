import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import { Producto } from './model/producto';
import { ProductoService } from './services/producto.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddEditProductoComponent } from './dialog/dialog-add-edit/dialog-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from './dialog/dialogo-delete/dialogo-delete.component';

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
})
export class ProductoComponent implements AfterViewInit, OnInit {

  private displayedColumns: string[] = ['id', 'nombre', 'precio', 'stock', 'createAt', 'acciones'];
  private dataSource = new MatTableDataSource<Producto>();
  private producto: Producto = new Producto();

  constructor(private productoService: ProductoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getListProductos();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  dialogoNuevoProducto(): void {
    this.dialog.open(DialogAddEditProductoComponent, {
      disableClose: true, 
      width: "550px",
      height: "50%"
    }).afterClosed().subscribe(resultado => {
      if(resultado === 'creado'){
        this.getListProductos();
      }
    });
  }


  dialogoEditarProducto(productoData: Producto): void {
    this.dialog.open(DialogAddEditProductoComponent, {
      disableClose: true, 
      width: "550px",
      height: "50%",
      data: productoData
    }).afterClosed().subscribe(resultado => {
      if(resultado === 'editado'){
        this.getListProductos();
      }
    });
  }

  dialogoEliminarProducto(productoData: Producto){
    this.dialog.open(DialogoDeleteComponent, {
      disableClose: true, 
    }).afterClosed().subscribe(resultado => {
      if(resultado === 'creado'){
        this.getListProductos();
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

  getListProductos(){
    this.productoService.getListado().subscribe({
      next:(data) => {
        console.log(data);
        this.dataSource.data = data;
      }, error: (e) => {}
    })
  }
}
