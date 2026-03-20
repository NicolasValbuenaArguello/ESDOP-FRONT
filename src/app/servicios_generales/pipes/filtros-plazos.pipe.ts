import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrosPlazos'
})
export class FiltroPlazosPipe implements PipeTransform {
  transform(items: any[], busqueda: string): any[] {
    if (!items) return [];
    if (!busqueda) return items;

    const texto = busqueda.toLowerCase();

    return items.filter(item =>
      (item[1] && item[1].toString().toLowerCase().includes(texto)) || // N° Orfeo
      (item[2] && item[2].toString().toLowerCase().includes(texto)) || // Funcionario
      (item[3] && item[3].toString().toLowerCase().includes(texto)) || // Unidad
      (item[53] && item[53].toString().toLowerCase().includes(texto)) || // Asunto
      (item[54] && item[54].toString().toLowerCase().includes(texto))   // Otro campo
    );
  }
}
