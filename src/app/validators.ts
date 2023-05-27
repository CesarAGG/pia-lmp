import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Materia, Evaluacion } from './interfaces';

export function materiaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const materia: Materia = control.value as Materia;

        if (!materia) {
            return null; // Skip validation if no value is provided
        }

        const errors: ValidationErrors = {};

        // Validate 'id' field
        if (materia.id) {
            const idPattern = /^[0-9a-fA-F]{24}$/; // 24 character hex string pattern
            if (!idPattern.test(materia.id.toString())) {
                errors['id'] = 'ID invalido. Por favor provee una cadena de 24 caracteres hexadecimales.';
            }
        }

        // Validate 'salon' field
        if (!materia.salon || materia.salon.trim() === '') {
            errors['salon'] = 'Salon es requerido. Por favor provee una cadena no vacia.';
        }

        // Validate 'pase' field
        if (isNaN(materia.pase) || materia.pase < 0 || materia.pase > 100) {
            errors['pase'] = 'Pase invalido. Por favor provee un numero entre 0 y 100.';
        }
        if (!materia.pase && materia.pase !== 0) {
            errors['pase'] = 'Pase es requerido.';
        }

        // Validate 'nombre' field
        if (!materia.nombre || materia.nombre.trim() === '') {
            errors['nombre'] = 'Nombre es requerido. Por favor provee una cadena no vacia.';
        }

        // Validate 'profe' field
        if (!materia.profe || materia.profe.trim() === '') {
            errors['profe'] = 'Profe es requerido. Por favor provee una cadena no vacia.';
        }

        // Validate 'horario' field
        if (!materia.horario || !/^([LMXJVSD]{1,7}\s([0-1]?\d|2[0-3]):[0-5]\d)$/.test(materia.horario.trim())) {
            errors['horario'] = 'Horario es requerido. Por favor provee un formato valido (e.g., LXV 13:00).';
        }

        // Validate 'evaluaciones' field
        if (!materia.evaluaciones || !Array.isArray(materia.evaluaciones)) {
            errors['evaluaciones'] = 'Evaluaciones es requerido. Por favor provee un arreglo.';
        } else {
            const evaluacionesErrors: ValidationErrors[] = [];

            // Validate each 'Evaluacion' object
            materia.evaluaciones.forEach((evaluacion: Evaluacion, index: number) => {
                const evaluacionErrors: ValidationErrors = {};

                // Validate 'nombre' field of 'Evaluacion'
                if (!evaluacion.nombre || evaluacion.nombre.trim() === '') {
                    evaluacionErrors['nombre'] = `Evaluacion ${index + 1}: Nombre es requerido. Por favor provee una cadena no vacia.`;
                }

                // Validate 'tipo' field of 'Evaluacion'
                const tipoOptions = ['tarea', 'examen', 'proyecto', 'otro'];
                if (!evaluacion.tipo || !tipoOptions.includes(evaluacion.tipo.trim())) {
                    evaluacionErrors['tipo'] = `Evaluacion ${index + 1}: Tipo es requerido. Por favor selecciona una de las opciones: tarea, examen, proyecto, otro.`;
                }

                // Validate 'ptObtenidos' field of 'Evaluacion'
                if (isNaN(evaluacion.ptObtenidos ?? 0) || (evaluacion.ptObtenidos ?? 0) < -1 || (evaluacion.ptObtenidos ?? 0) > 100) {
                    evaluacionErrors['ptObtenidos'] = `Evaluacion ${index + 1}: PtObtenidos invalido. Por favor provee un numero entre 0 y 100.`;
                }
                if (!evaluacion.ptObtenidos && evaluacion.ptObtenidos !== 0) {
                    evaluacionErrors['ptObtenidos'] = `Evaluacion ${index + 1}: PtObtenidos es requerido.`;
                }
                if ((evaluacion.ptObtenidos ?? 0) > evaluacion.ptPosibles && evaluacion.ptPosibles) {
                    evaluacionErrors['ptObtenidos'] = `Evaluacion ${index + 1}: PtObtenidos no puede ser mayor que PtPosibles.`;
                }

                // Validate 'ptPosibles' field of 'Evaluacion'
                if (isNaN(evaluacion.ptPosibles) || evaluacion.ptPosibles < 0 || evaluacion.ptPosibles > 100) {
                    evaluacionErrors['ptPosibles'] = `Evaluacion ${index + 1}: PtPosibles invalido. Por favor provee un numero entre 0 y 100.`;
                }
                if (!evaluacion.ptPosibles && evaluacion.ptPosibles !== 0) {
                    evaluacionErrors['ptPosibles'] = `Evaluacion ${index + 1}: PtPosibles es requerido.`;
                }

                // Add 'Evaluacion' errors to the array
                if (Object.keys(evaluacionErrors).length > 0) {
                    evaluacionesErrors.push(evaluacionErrors);
                }
            });

            // Add 'evaluaciones' errors to the main 'errors' object
            if (evaluacionesErrors.length > 0) {
                errors['evaluaciones'] = evaluacionesErrors;
            }
        }

        return Object.keys(errors).length > 0 ? errors : null;
    };
}

export function ptPosiblesSumValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const evaluaciones: Evaluacion[] = control.value;
        let sum = 0;
        for (const evaluacion of evaluaciones) {
            sum += evaluacion.ptPosibles;
        }
        if (sum > 100) {
            return { 'ptPosiblesSum': 'La suma de puntos posibles en todas las evaluaciones no debe exceder 100.' };
        }
        return null;
    };
}
