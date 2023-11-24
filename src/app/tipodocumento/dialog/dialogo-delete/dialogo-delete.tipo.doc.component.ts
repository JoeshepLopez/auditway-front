import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { TipoDocumento } from '../../model/tipo-documento';
import { TipoDocumentoService } from '../../services/tipo-documento.service';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteTipoDocComponent implements OnInit {


  constructor(private dialogoReferencia: MatDialogRef<DialogoDeleteTipoDocComponent>,
    @Inject(MAT_DIALOG_DATA) public tipoDocumentoData: TipoDocumento) { }

  ngOnInit() {
  }

  confirmDelete(){
    if(this.tipoDocumentoData){
      this.dialogoReferencia.close("eliminar");
    }
  }
}
