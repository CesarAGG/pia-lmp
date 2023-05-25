export interface Evaluacion {
  nombre: string;
  tipo: string;
  PO: number;
  PP: number;
}

export interface Materia {
  ID: number;
  nombre: string;
  profe: string;
  horario: string;
  evaluaciones: Evaluacion[];
}