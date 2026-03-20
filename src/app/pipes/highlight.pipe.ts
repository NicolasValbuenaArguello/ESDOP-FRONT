import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(texto: string, termino: string): string {
    if (!termino || !texto) return texto;
    const regex = new RegExp(`(${termino})`, 'gi');
    return texto.replace(regex, `<mark>$1</mark>`);
  }
}
