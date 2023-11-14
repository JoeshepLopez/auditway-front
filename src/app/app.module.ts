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
/* import { SuperAdminGuard } from './usuarios/guards/super-admin.guard;*/

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
  /*{ path: 'ruta-para-super-admin', component: SuperAdminComponent, canActivate: [AuthGuard, SuperAdminGuard], data: { role: 'ROLE_SUPER_ADMIN' } }*/
];
