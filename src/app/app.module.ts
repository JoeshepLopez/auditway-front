import { DirectivaComponent } from "./directiva/directiva.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { FormComponent } from "./clientes/form.component";
import { Routes } from "@angular/router";

import { registerLocaleData } from "@angular/common";
import localeES from "@angular/common/locales/es";

import { LoginComponent } from "./usuarios/login.component";
import { AuthGuard } from "./usuarios/guards/auth.guard";
import { RoleGuard } from "./usuarios/guards/role.guard";
import { DetalleFacturaComponent } from "./facturas/detalle-factura.component";
import { FacturasComponent } from "./facturas/facturas.component";

import { HomeComponent } from "./home/home.component";
import { TipoDocumentoComponent } from "./tipodocumento/tipo-documento.component";
import { ProductoComponent } from "./productos/producto.component";
import { FolioComponent } from "./folio/folio.component";
import { ReporteFacturaComponent } from "./reportes/factura-reporte.component";

registerLocaleData(localeES, "es");

export const routes: Routes = [
  { path: "", redirectTo: "/clientes", pathMatch: "full" },
  { path: "directivas", component: DirectivaComponent },
  { path: "home", component: HomeComponent },
  { path: "clientes", component: ClientesComponent },
  { path: "clientes/page/:page", component: ClientesComponent },
  {
    path: "clientes/form",
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_ADMIN" },
  },
  {
    path: "clientes/form/:id",
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_ADMIN" },
  },
  { path: "login", component: LoginComponent },
  {
    path: "facturas/:id",
    component: DetalleFacturaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_USER" },
  },
  {
    path: "facturas/form/:clienteId",
    component: FacturasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_ADMIN" },
  },
  {
    path: "tipo-documento",
    component: TipoDocumentoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_ADMIN" },
  },
  {
    path: "productos",
    component: ProductoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_ADMIN" },
  },
  {
    path: "folios",
    component: FolioComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_ADMIN" },
  },
  {
    path: "reportes",
    component: ReporteFacturaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_ADMIN" },
  },
  {
    path: "directiva",
    component: DirectivaComponent,
    children: [
      { path: "clientes", component: ClientesComponent },
      { path: "facturas", component: FacturasComponent },
      { path: "", redirectTo: "clientes", pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: "/directiva", pathMatch: "full" },
];
