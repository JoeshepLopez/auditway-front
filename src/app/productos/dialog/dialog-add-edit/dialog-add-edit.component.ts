import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditProductoComponent implements OnInit {

  formProducto: FormGroup;
  tituloAccion: string = 'Nuevo';
  btnAccion: string = 'Guardar';
  listaProducto: Producto[] = [];

  constructor(private dialogoReferencia: MatDialogRef<DialogAddEditProductoComponent>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private productoService: ProductoService,
              @Inject(MAT_DIALOG_DATA) public productoData: Producto) { 

                this.formProducto = this.fb.group({
                  nombre: ['', Validators.required],
                  precio: ['', Validators.required],
                  stock: ['', Validators.required],
                });

                this.productoService.getListado().subscribe({
                  next: (data) => {
                    this.listaProducto = data;
                  }, error: (e) => {}
                })
              }

  mostrarAlerta(mensaje: string, accion: string){
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 3000
    });
  }

  addEditProducto(){

    const producto: Producto = {
      nombre: this.formProducto.value.nombre,
      precio: this.formProducto.value.precio,
      stock: this.formProducto.value.stock,
    }

    if(this.productoData == null){
      this.productoService.create(producto).subscribe({
        next:(data) => {
          this.mostrarAlerta("Producto fue creado con exito", "Listo");
          this.dialogoReferencia.close("creado");
        }, error: (e) => {
          this.mostrarAlerta("No se pudo crear producto", "Error");
        }
      }); 
    } else {
      this.productoService.update(this.productoData.id, producto).subscribe({
        next:(data) => {
          this.mostrarAlerta("Producto fue editado con exito", "Listo");
          this.dialogoReferencia.close("editado");
        }, error: (e) => {
          this.mostrarAlerta("No se pudo editar producto", "Error");
        }
      }); 
    }
  }

  ngOnInit() {
    if(this.productoData){
      this.formProducto.patchValue({
        nombre: this.productoData.nombre,
        precio: this.productoData.precio,
        stock: this.productoData.stock,
      })
    }
    this.tituloAccion = "Editar";
    this.btnAccion = "Actualizar";
  }

}
