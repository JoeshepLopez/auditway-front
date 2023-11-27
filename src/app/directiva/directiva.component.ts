import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-directiva",
  templateUrl: "./directiva.component.html",
})
export class DirectivaComponent {
  // Declara la variable para el contador
  contadorClientes = 0;

  // Utiliza ViewChild para referenciar el elemento en el HTML
  @ViewChild("contadorClientesElement", {
    read: ElementRef,
    static: false,
  } as any)
  contadorClientesElement: ElementRef | undefined;

  // Método para incrementar el contador
  incrementarContador() {
    this.contadorClientes++;
    // Verifica que contadorClientesElement no sea undefined antes de actualizar su contenido
    if (
      this.contadorClientesElement &&
      this.contadorClientesElement.nativeElement
    ) {
      this.contadorClientesElement.nativeElement.textContent =
        this.contadorClientes;
    }
  }
/*
  // Definición de la interfaz para el objeto de la tarjeta de cliente
interface ClienteCard {
  contadorClientes: number;
  incrementarContador: () => void;
}

// Implementación de la interfaz
const clienteCard: ClienteCard = {
  contadorClientes: 45,

  // Función para incrementar el contador de clientes
  incrementarContador: function () {
    this.contadorClientes++;
    // Puedes agregar aquí la lógica adicional que desees
    // Por ejemplo, actualizar la vista o enviar datos al servidor
    actualizarVista();
  },
};

// Función para actualizar la vista después de incrementar el contador
function actualizarVista() {
  const contadorClientesElement = document.getElementById('contadorClientes');
  if (contadorClientesElement) {
    contadorClientesElement.innerText = clienteCard.contadorClientes.toString();
  }
}

// Evento de carga del documento para inicializar la vista
document.addEventListener('DOMContentLoaded', function () {
  actualizarVista();
});

*/



}