import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Unidad {
  division: string;
  brigada: string;
  unidad: string;
  compania: string;
  peloton: string;
  comandante: string;
  tarea: string;
  aisladas: number;
  sin_movimiento: number;
  efectivos_disminuidos: number;
  movimiento_0: number;
  resumen: string;
}

@Component({
  selector: 'app-unidades-resumen',
  templateUrl: './unidades-resumen.component.html',
  styleUrls: ['./unidades-resumen.component.css']
})
export class UnidadesResumenComponent implements AfterViewInit {

  fechaInicio: any = ''; // puede ser Date o string
  fechaFin: any = '';
  distanciaAisladas: number = 5000;
  distanciaMovimiento: number = 999;

  displayedColumns: string[] = ['division', 'brigada', 'unidad', 'compania', 'peloton', 'comandante', 'tarea', 'aisladas', 'sin_movimiento', 'efectivos_disminuidos', 'movimiento_0', 'resumen'];
  dataSource: MatTableDataSource<Unidad> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  cargando: boolean = false;
  filtroBusqueda: string = '';

  constructor(private http: HttpClient) {}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

  private formatDateToYMD(d: any): string {
    if (!d) return '';
    if (typeof d === 'string') return d; // asume ya en YYYY-MM-DD
    const date = new Date(d);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  }

  buscarUnidades() {
    const inicioStr = this.formatDateToYMD(this.fechaInicio);
    const finStr = this.formatDateToYMD(this.fechaFin);

    if (!inicioStr || !finStr) {
      alert('Seleccione fechas válidas de inicio y fin (YYYY-MM-DD)');
      return;
    }

    this.cargando = true;

    const payloadObj = {
      fecha_inicio: inicioStr,
      fecha_fin: finStr,
      distancia_aisladas: this.distanciaAisladas,
      distancia_movimiento: this.distanciaMovimiento
    };

    // Mostrar lo que vamos a enviar (útil para debug)
    console.log('Payload que se enviará:', payloadObj);

    const formData = new FormData();
    formData.append('fecha_inicio', payloadObj.fecha_inicio);
    formData.append('fecha_fin', payloadObj.fecha_fin);
    formData.append('distancia_aisladas', String(payloadObj.distancia_aisladas));
    formData.append('distancia_movimiento', String(payloadObj.distancia_movimiento));

    this.http.post<any>('http://172.22.2.36:5010/unidades_resumen_completo', formData, { observe: 'response' })
      .subscribe({
        next: (httpResponse) => {
          const res = httpResponse.body;
          console.log('HTTP status:', httpResponse.status);
          console.log('Respuesta completa:', res);

          if (res && Array.isArray(res.unidades)) {
            // Mapear por si vienen claves distintas (sigla_..., tareas_accion...)
            const mapped: Unidad[] = res.unidades.map((u: any) => ({
              division: u.division || u.sigla_division || u.SIGLA_DIVISION || '',
              brigada: u.brigada || u.sigla_brigada || u.SIGLA_BRIGADA || '',
              unidad: u.unidad || u.sigla_unidd || u.SIGLA_UNIDD || '',
              compania: u.compania || u.COMPANIA || '',
              peloton: u.peloton || u.PELOTON || (u.peloton ? u.peloton : ''),
              comandante: u.comandante || u.COMANDANTE || '',
              tarea: u.tarea || u.TAREAS_ACCION_DECISIVA_TTF || u.tareas_accion_decisiva_ttf || '',
              aisladas: Number(u.aisladas || u.AISLADAS || 0),
              sin_movimiento: Number(u.sin_movimiento || u.SIN_MOVIMIENTO || 0),
              efectivos_disminuidos: Number(u.efectivos_disminuidos || u.TOTAL_SOLDADOS || 0),
              movimiento_0: Number(u.movimiento_0 || u.MOVIMIENTO_0 || 0),
              resumen: u.resumen || ''
            }));
            this.dataSource.data = mapped;
          } else if (res && res.mensaje) {
            this.dataSource.data = [];
            alert(res.mensaje);
          } else {
            this.dataSource.data = [];
            alert('Respuesta inesperada del servidor (ver consola)');
            console.log('Respuesta inesperada:', res);
          }

          this.cargando = false;
        },
        error: (err) => {
          console.error('Error HTTP:', err);
          this.cargando = false;
          alert('Error al cargar datos (ver consola)');
        }
      });
  }

  aplicarFiltro() {
    this.dataSource.filter = this.filtroBusqueda.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportarExcel() {
    if (!this.dataSource.data.length) {
      alert('No hay datos para exportar');
      return;
    }
    const sheetData = this.dataSource.filteredData.length ? this.dataSource.filteredData : this.dataSource.data;
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Unidades');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `unidades_resumen_${this.formatDateToYMD(this.fechaInicio)}_a_${this.formatDateToYMD(this.fechaFin)}.xlsx`);
  }
  descargarReporteExcel() {
  const inicioStr = this.formatDateToYMD(this.fechaInicio);
  const finStr = this.formatDateToYMD(this.fechaFin);

  if (!inicioStr || !finStr) {
    alert('Seleccione fechas válidas de inicio y fin (YYYY-MM-DD)');
    return;
  }

  const formData = new FormData();
  formData.append('fecha_inicio', inicioStr);
  formData.append('fecha_fin', finStr);
  formData.append('distancia_aisladas', String(this.distanciaAisladas));
  formData.append('distancia_movimiento', String(this.distanciaMovimiento));

  this.cargando = true;

  this.http.post('http://172.22.2.36:5010/descargar_reporte_excel', formData, { responseType: 'blob' })
    .subscribe({
      next: (blob: Blob) => {
        const file = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fechaHoy = new Date().toISOString().split('T')[0];
        saveAs(file, `resumen_unidades_${inicioStr}_a_${finStr}_${fechaHoy}.xlsx`);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error descargando Excel:', err);
        alert('Error al generar el reporte Excel (ver consola).');
        this.cargando = false;
      }
    });
}

}
