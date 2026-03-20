import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCampos'
})
export class FiltroCamposPipe implements PipeTransform {
  transform(valores: string[], termino: string): string[] {
    if (!Array.isArray(valores) || !termino) return valores;
    termino = termino.toLowerCase();
    return valores.filter(v => v.toLowerCase().includes(termino));
  }
}
