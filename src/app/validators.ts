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
                errors['id'] = 'Invalid ID. Please provide a 24 character hex string.';
            }
        }

        // Validate 'salon' field
        if (!materia.salon || materia.salon.trim() === '') {
            errors['salon'] = 'Salon is required. Please provide a non-empty string.';
        }

        // Validate 'pase' field
        if (isNaN(materia.pase) || materia.pase < 0 || materia.pase > 100) {
            errors['pase'] = 'Invalid pase. Please provide a number between 0 and 100.';
        }

        // Validate 'nombre' field
        if (!materia.nombre || materia.nombre.trim() === '') {
            errors['nombre'] = 'Nombre is required. Please provide a non-empty string.';
        }

        // Validate 'profe' field
        if (!materia.profe || materia.profe.trim() === '') {
            errors['profe'] = 'Profe is required. Please provide a non-empty string.';
        }

        // Validate 'horario' field
        if (!materia.horario || !/^([LMXJVSD]{1,7}\s\d{2}:\d{2})$/.test(materia.horario.trim())) {
            errors['horario'] = 'Horario is required. Please provide a valid format (e.g., LXV 13:00).';
        }

        // Validate 'evaluaciones' field
        if (!materia.evaluaciones || !Array.isArray(materia.evaluaciones)) {
            errors['evaluaciones'] = 'Evaluaciones is required. Please provide an array.';
        } else {
            const evaluacionesErrors: ValidationErrors[] = [];

            // Validate each 'Evaluacion' object
            materia.evaluaciones.forEach((evaluacion: Evaluacion, index: number) => {
                const evaluacionErrors: ValidationErrors = {};

                // Validate 'nombre' field of 'Evaluacion'
                if (!evaluacion.nombre || evaluacion.nombre.trim() === '') {
                    evaluacionErrors['nombre'] = `Evaluacion ${index + 1}: Nombre is required. Please provide a non-empty string.`;
                }

                // Validate 'tipo' field of 'Evaluacion'
                const tipoOptions = ['tarea', 'examen', 'proyecto', 'otro'];
                if (!evaluacion.tipo || !tipoOptions.includes(evaluacion.tipo.trim())) {
                    evaluacionErrors['tipo'] = `Evaluacion ${index + 1}: Tipo is required. Please provide one of the following options: tarea, examen, proyecto, otro.`;
                }

                // Validate 'ptObtenidos' field of 'Evaluacion'
                if (isNaN(evaluacion.ptObtenidos ?? 0) || (evaluacion.ptObtenidos ?? 0) < -1 || (evaluacion.ptObtenidos ?? 0) > 100) {
                    evaluacionErrors['ptObtenidos'] = `Evaluacion ${index + 1}: Invalid ptObtenidos. Please provide a number between 0 and 100.`;
                }

                // Validate 'ptPosibles' field of 'Evaluacion'
                if (isNaN(evaluacion.ptPosibles) || evaluacion.ptPosibles < 0 || evaluacion.ptPosibles > 100) {
                    evaluacionErrors['ptPosibles'] = `Evaluacion ${index + 1}: Invalid ptPosibles. Please provide a number between 0 and 100.`;
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
