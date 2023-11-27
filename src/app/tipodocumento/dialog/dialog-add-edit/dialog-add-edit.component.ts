import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { TipoDocumento } from '../../model/tipo-documento';
import { TipoDocumentoService } from '../../services/tipo-documento.service';

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditComponent implements OnInit {

  formTipoDocumento: FormGroup;
  tituloAccion: string = 'Nuevo';
  btnAccion: string = 'Guardar';
  listaTipoDocumento: TipoDocumento[] = [];

  constructor(private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private tipoDocumentoService: TipoDocumentoService,
              @Inject(MAT_DIALOG_DATA) public tipoDocumentoData: TipoDocumento) { 

                this.formTipoDocumento = this.fb.group({
                  numeroDocumento: ['', Validators.required],
                  tipoDocumento: ['', Validators.required],
                });

                this.tipoDocumentoService.getListado().subscribe({
                  next: (data) => {
                    this.listaTipoDocumento = data;
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

  addEditTipoDocumento(){

    const tipoDocumento: TipoDocumento = {
      numeroDocumento: this.formTipoDocumento.value.numeroDocumento,
      tipoDocumento: this.formTipoDocumento.value.tipoDocumento
    }

    if(this.tipoDocumentoData == null){
      this.tipoDocumentoService.create(tipoDocumento).subscribe({
        next:(data) => {
          this.mostrarAlerta("Tipo de documento fue creado con exito", "Listo");
          this.dialogoReferencia.close("creado");
        }, error: (e) => {
          this.mostrarAlerta("No se pudo crear tipo de documento", "Error");
        }
      }); 
    } else {
      this.tipoDocumentoService.update(this.tipoDocumentoData.id, tipoDocumento).subscribe({
        next:(data) => {
          this.mostrarAlerta("Tipo de documento fue editado con exito", "Listo");
          this.dialogoReferencia.close("editado");
        }, error: (e) => {
          this.mostrarAlerta("No se pudo editar tipo de documento", "Error");
        }
      }); 
    }
  }


  ngOnInit() {

    if(this.tipoDocumentoData){
      this.formTipoDocumento.patchValue({
        numeroDocumento: this.tipoDocumentoData.numeroDocumento,
        tipoDocumento: this.tipoDocumentoData.tipoDocumento
      })
    }

    this.tituloAccion = "Editar";
    this.btnAccion = "Actualizar";

  }

}
