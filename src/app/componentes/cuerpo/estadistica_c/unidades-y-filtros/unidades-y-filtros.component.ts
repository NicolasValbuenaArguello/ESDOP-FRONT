import { Component } from '@angular/core';
import { CdkDragDrop, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

interface Item {
  nombre: string;
  tipo: 'Departamento' | 'Municipio';
}

@Component({
  selector: 'app-unidades-y-filtros',
  templateUrl: './unidades-y-filtros.component.html',
  styleUrls: ['./unidades-y-filtros.component.css']
})
export class UnidadesYFiltrosComponent {
  disponibles: Item[] = [
    { nombre: 'Antioquia', tipo: 'Departamento' },
    { nombre: 'Medellín', tipo: 'Municipio' },
    { nombre: 'Bogotá', tipo: 'Municipio' },
    { nombre: 'Cundinamarca', tipo: 'Departamento' },
    { nombre: 'Cali', tipo: 'Municipio' },
  ];

  seleccionados: Item[] = [];

  filtroDisponibles: string = 'Todos';
  filtroSeleccionados: string = 'Todos';

  get disponiblesFiltrados(): Item[] {
    return this.filtroDisponibles === 'Todos'
      ? this.disponibles
      : this.disponibles.filter((i) => i.tipo === this.filtroDisponibles);
  }

  get seleccionadosFiltrados(): Item[] {
    return this.filtroSeleccionados === 'Todos'
      ? this.seleccionados
      : this.seleccionados.filter((i) => i.tipo === this.filtroSeleccionados);
  }

  onDrop(event: CdkDragDrop<Item[]>) {
    const copia = { ...event.item.data };
    const existe = this.seleccionados.some(
      (item) => item.nombre === copia.nombre && item.tipo === copia.tipo
    );
    if (!existe) {
      this.seleccionados.push(copia);
    }
  }

  public permitirEntrada: (drag: CdkDrag<Item>, drop: CdkDropList<Item[]>) => boolean =
    (drag: CdkDrag<Item>, drop: CdkDropList<Item[]>) => {
      const item = drag.data;
      return item?.tipo === 'Municipio';
    };
}
