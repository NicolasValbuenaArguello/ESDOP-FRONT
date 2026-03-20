import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsuarios'
})
export class FilterUsuariosPipe implements PipeTransform {
  transform(usuarios: any[], busqueda: string): any[] {
    if (!usuarios) return [];
    if (!busqueda) return usuarios;

    busqueda = busqueda.toLowerCase();

    return usuarios.filter((item) =>
      (item[1] && item[1].toLowerCase().includes(busqueda)) ||
      (item[2] && item[2].toLowerCase().includes(busqueda)) ||
      (item[54] && item[54].toLowerCase().includes(busqueda))
    );
  }
}
