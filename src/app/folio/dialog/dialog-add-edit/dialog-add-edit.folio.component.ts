import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Folio } from '../../model/folio';
import { FolioService } from '../../services/folio.service';
import { TipoDocumento } from '../../model/tipo-documento';

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditFolioComponent implements OnInit {

  formFolio: FormGroup;
  listaFolio: Folio[] = [];
  listTipoDocumentos: TipoDocumento[] = [];
  tituloAccion: string = 'Nuevo';
  btnAccion: string = 'Guardar';

  constructor(private dialogoReferencia: MatDialogRef<DialogAddEditFolioComponent>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private folioService: FolioService,
              @Inject(MAT_DIALOG_DATA) public folioData: Folio) { 

                this.formFolio = this.fb.group({
                  tipoDocumento: ['', Validators.required],
                  folioDesde: ['', Validators.required],
                  folioHasta: ['', Validators.required],
                });

                this.folioService.getListado().subscribe({
                  next: (data) => {
                    this.listaFolio = data;
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

  addEditFolio(){
    const folio: Folio = {
      tipoDocumento: this.formFolio.value.tipoDocumento,
      folioDesde: this.formFolio.value.folioDesde,
      folioHasta: this.formFolio.value.folioHasta,
    }

    if(this.folioData == null){
      this.folioService.create(folio).subscribe({
        next:(data) => {
          this.mostrarAlerta("Folio fue creado con exito", "Listo");
          this.dialogoReferencia.close("creado");
        }, error: (e) => {
          this.mostrarAlerta("No se pudo crear folio", "Error");
        }
      }); 
    } else {
      this.folioService.update(this.folioData.id, folio).subscribe({
        next:(data) => {
          this.mostrarAlerta("Folio fue editado con exito", "Listo");
          this.dialogoReferencia.close("editado");
        }, error: (e) => {
          this.mostrarAlerta("No se pudo editar folio", "Error");
        }
      }); 
    }
  }

  ngOnInit() {
      this.folioService.getListadoFolios().subscribe({
        next:(data) => {
          this.listTipoDocumentos = data;
        }, error: (e) => {}
      })

    if(this.folioData){
      this.formFolio.patchValue({
        tipoDocumento: this.folioData.tipoDocumento,
        folioDesde: this.folioData.folioDesde,
        folioHasta: this.folioData.folioHasta,
      })
    }
    this.tituloAccion = "Editar";
    this.btnAccion = "Actualizar";
  }

}
