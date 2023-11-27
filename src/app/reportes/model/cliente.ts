import { FacturaReporte } from "./factura-reporte";
import { Region } from "./region";


export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  rut: string;
  createAt: string;
  email: string;
  foto: string;
  region: Region;
  facturas: Array<FacturaReporte> = [];
}
