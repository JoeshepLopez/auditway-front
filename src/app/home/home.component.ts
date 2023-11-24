import { Component } from "@angular/core";
import { ContactoService } from "./services/contacto.service";
import { Contacto } from "./model/contacto";
import swal from 'sweetalert2';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {

  private contacto: Contacto = new Contacto();

  constructor(private contactoService: ContactoService) {}

  guardar(): void {

    console.log( this.contacto );



    if( this.contacto.email == undefined || this.contacto.perfilContacto == undefined){


      swal('Solicitud de contacto', `¡Debe ingresar todos los campos del formulario!`, 'error');
    } else {

      this.contactoService.create(this.contacto).subscribe(
        (response) => {
          console.log('Formulario enviado con éxito:', response);
          swal('Solicitud de contacto', `¡Formulario enviado con éxito!`, 'success');
          this.contacto = new Contacto();
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

}
