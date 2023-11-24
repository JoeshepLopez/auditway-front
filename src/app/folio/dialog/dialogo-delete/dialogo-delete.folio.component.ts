import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Folio } from '../../model/folio';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteFolioComponent implements OnInit {

  constructor(private dialogoReferencia: MatDialogRef<DialogoDeleteFolioComponent>,
    @Inject(MAT_DIALOG_DATA) public folioData: Folio) { }

  ngOnInit() {
  }

  confirmDelete(){
    if(this.folioData){
      this.dialogoReferencia.close("eliminar");
    }
  }
}
