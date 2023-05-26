import { Pipe, PipeTransform } from '@angular/core';
import { Evaluacion } from './interfaces';

@Pipe({
  name: 'filterByTipo'
})
export class FilterByTipoPipe implements PipeTransform {
  transform(items: Evaluacion[], tipo: string): Evaluacion[] {
    if (!items) {
      return [];
    }
    if (!tipo) {
      return items;
    }
    return items.filter(item => item.tipo === tipo);
  }
}
