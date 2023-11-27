import { Cliente } from "./cliente";
import { ItemFactura } from "./item-factura";

export class FacturaReporte {
  id: number;
  descripcion: string;
  observacion: string;
  items: Array<ItemFactura> = [];
  cliente: Cliente;
  total: number;
  createAt: string;
  tipoDocumento: string;
  facturaEnviadaSii: boolean;
  estadoEnvioSii: number;
  estadoSii: string;
  numeroFolio: number;
  nombreTipoDocumento: string;
}