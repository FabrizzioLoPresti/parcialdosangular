import { Especialidad } from "./especialidad.model";

export interface Medico {
  id: string;
  nombre: string;
  especialidadId: string;
  especialidad: Especialidad;
}
