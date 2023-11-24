import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { DirectivaComponent } from "./directiva/directiva.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { FormComponent } from "./clientes/form.component";
import { PaginatorComponent } from "./paginator/paginator.component";
import { ClienteService } from "./clientes/cliente.service";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatSnackBarModule, MatTableModule } from "@angular/material";
import { MatMomentDateModule, MomentDateModule } from "@angular/material-moment-adapter";
import { DetalleComponent } from "./clientes/detalle/detalle.component";
import { LoginComponent } from "./usuarios/login.component";
import { TokenInterceptor } from "./usuarios/interceptors/token.interceptor";
import { AuthInterceptor } from "./usuarios/interceptors/auth.interceptor";
import { DetalleFacturaComponent } from "./facturas/detalle-factura.component";
import { FacturasComponent } from "./facturas/facturas.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { HomeComponent } from "./home/home.component";
import { routes } from "./app.module";

import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TipoDocumentoComponent } from "./tipodocumento/tipo-documento.component";
import { MatButtonModule } from "@angular/material/button";
import { DialogAddEditComponent } from "./tipodocumento/dialog/dialog-add-edit/dialog-add-edit.component";
import { ProductoComponent } from "./productos/producto.component";
import { DialogAddEditProductoComponent } from "./productos/dialog/dialog-add-edit/dialog-add-edit.component";
import { DialogoDeleteComponent } from "./productos/dialog/dialogo-delete/dialogo-delete.component";
import { DialogoDeleteTipoDocComponent } from "./tipodocumento/dialog/dialogo-delete/dialogo-delete.tipo.doc.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent,
    HomeComponent,
    TipoDocumentoComponent,
    DialogAddEditComponent,
    ProductoComponent,
    DialogAddEditProductoComponent,
    DialogoDeleteComponent,
    DialogoDeleteTipoDocComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    NgbModule,
    NgbCarouselModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule, 
    MatButtonModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule, 
    MatDialogModule,
    MatGridListModule,
  ],

  providers: [
    ClienteService,
    { provide: LOCALE_ID, useValue: "es" },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  entryComponents:
    [DialogAddEditComponent, DialogAddEditProductoComponent, DialogoDeleteComponent, DialogoDeleteTipoDocComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
