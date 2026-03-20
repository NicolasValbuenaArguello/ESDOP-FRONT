import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-q5-dipse',
  templateUrl: './ingreso-q5-dipse.component.html',
  styleUrls: ['./ingreso-q5-dipse.component.css']
})
export class IngresoQ5DipseComponent {

  form!: FormGroup;

  lista: any[] = [];
  listaFiltrada: any[] = [];

  mostrarModal = false;

  modo: 'guardar' | 'editar' | 'eliminar' = 'guardar';

  indexSeleccionado: number | null = null;

  filtro: string = '';

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  // -------------------------
  crearFormulario() {
    this.form = this.fb.group({
      campo1: ['', Validators.required],
      campo2: [''],
      campo3: [''],
      campo4: [''],
      campo5: [''],
      campo6: [''],
      campo7: [''],
      campo8: [''],
      campo9: [''],
      campo10: ['']
    });
  }

  // -------------------------
  abrirModal() {
    this.modo = 'guardar';
    this.form.reset();
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  // -------------------------
  guardar() {
    if (this.form.invalid) return;

    this.lista.push(this.form.value);
    this.filtrar();

    this.cerrarModal();

    Swal.fire('Guardado', 'Registro almacenado correctamente', 'success');
  }

  editar(index: number) {
    this.indexSeleccionado = index;
    this.modo = 'editar';
    this.form.patchValue(this.lista[index]);
    this.mostrarModal = true;
  }

  actualizar() {
    if (this.indexSeleccionado !== null) {
      this.lista[this.indexSeleccionado] = this.form.value;
      this.filtrar();

      this.cerrarModal();

      Swal.fire('Actualizado', 'Registro actualizado correctamente', 'success');
    }
  }

  eliminar(index: number) {
    this.indexSeleccionado = index;
    this.modo = 'eliminar';
    this.form.patchValue(this.lista[index]);
    this.mostrarModal = true;
  }

  confirmarEliminar() {
    Swal.fire({
      title: '¿Seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed && this.indexSeleccionado !== null) {
        this.lista.splice(this.indexSeleccionado, 1);
        this.filtrar();
        this.cerrarModal();

        Swal.fire('Eliminado', 'Registro eliminado', 'success');
      }
    });
  }

  // -------------------------
  filtrar() {
    const f = this.filtro.toLowerCase();

    this.listaFiltrada = this.lista.filter(x =>
      Object.values(x).some(val =>
        val?.toString().toLowerCase().includes(f)
      )
    );
  }
  // =========================
// 🔄 PAGINACIÓN
paginaActual = 1;
registrosPorPagina = 5;

// =========================
// 🔃 ORDENAMIENTO
columnaOrden: string = '';
asc: boolean = true;

// =========================
// 📊 PAGINACIÓN DATOS
get datosPaginados() {
  const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
  return this.listaFiltrada.slice(inicio, inicio + this.registrosPorPagina);
}

totalPaginas() {
  return Math.ceil(this.listaFiltrada.length / this.registrosPorPagina);
}

cambiarPagina(p: number) {
  this.paginaActual = p;
}

// =========================
// 🔃 ORDENAR
ordenar(col: string) {
  if (this.columnaOrden === col) {
    this.asc = !this.asc;
  } else {
    this.columnaOrden = col;
    this.asc = true;
  }

  this.listaFiltrada.sort((a, b) => {
    if (a[col] < b[col]) return this.asc ? -1 : 1;
    if (a[col] > b[col]) return this.asc ? 1 : -1;
    return 0;
  });
}

// =========================
// 📥 EXPORTAR EXCEL
exportarExcel() {
  import('xlsx').then(XLSX => {
    const ws = XLSX.utils.json_to_sheet(this.listaFiltrada);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Q5');

    XLSX.writeFile(wb, 'reporte_q5.xlsx');
  });
}

// =========================
// 📄 EXPORTAR PDF
exportarPDF() {
  import('jspdf').then(jsPDF => {
    import('jspdf-autotable').then(() => {

      const doc = new jsPDF.default();

      const data = this.listaFiltrada.map(x => [
        x.campo1,
        x.campo2,
        x.estado || 'Sin estado'
      ]);

      (doc as any).autoTable({
        head: [['Campo 1', 'Campo 2', 'Estado']],
        body: data
      });

      doc.save('reporte_q5.pdf');
    });
  });
}

// =========================
// 🎯 BADGES
getClaseEstado(estado: string) {
  switch (estado) {
    case 'Activo': return 'badge bg-success';
    case 'Pendiente': return 'badge bg-warning text-dark';
    case 'Crítico': return 'badge bg-danger';
    default: return 'badge bg-secondary';
  }
}

}