export interface Evaluacion {
  nombre: string;
  tipo: string;
  ptObtenidos: string | number | null;
  ptPosibles: number;
  completado: boolean;
}

export interface Materia {
  userId?: string;
  id?: string;
  salon: string;
  pase: number;
  nombre: string;
  profe: string;
  horario: string;
  evaluaciones: Evaluacion[];
}
