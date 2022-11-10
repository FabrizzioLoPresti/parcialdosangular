import { Especialidad } from "./especialidad.model";
import { Medico } from "./medico.model";

export interface Atencion {
  id: string;
  paciente: string;
  documento: number;
  especialidadId: string;
  subEspecialidadId: string;
  medicoId: string;
  costo: number;
  fecha: Date;

  especialidad: Especialidad;
  medico: Medico;
}
