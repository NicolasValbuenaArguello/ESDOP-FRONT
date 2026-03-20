import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';

@Component({
  selector: 'app-listado-eventos-cenm-diate',
  templateUrl: './listado-eventos-cenm-diate.component.html',
  styleUrls: ['./listado-eventos-cenm-diate.component.css']
})
export class ListadoEventosCenmDiateComponent implements OnInit {
 constructor(private selector: SelectoresService, private menu_service :  SelectoresService,  private cookie: CookieService, private api_serve: ServiceConecionService){}
  eventos: any[] = [];
  eventosFiltrados: any[] = [];

  busqueda: string = '';
  filtroDepartamento: string = '';
  filtroMunicipio: string = '';

  // 🔥 MODAL
  mostrarModal: boolean = false;
  eventoSeleccionado: any = null;

  fechaInicio: string = '';
  fechaFin: string = '';
  cargando: boolean = false;
  
departamentos: string[] = [];
municipios: string[] = [];
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.eventos = [
      {
        evento: 1,
        boletin: 11309,
        dia: 5,
        mes: 1,
        anio: 2026,
        departamento: 'ANTIOQUIA',
        municipio: 'SEGOVIA',
        vereda: 'MONTE FRIO',
        batallon: 'BASJA',
        enemigo: 'CLAN DEL GOLFO',
        tipo_explosivo: 'INDUGEL',
        cantidad: 1
      }
    ];

    this.eventosFiltrados = [...this.eventos];
  }

  aplicarFiltros() {
    this.eventosFiltrados = this.eventos.filter(e => {
      const coincideBusqueda =
        JSON.stringify(e).toLowerCase().includes(this.busqueda.toLowerCase());

      const coincideDepartamento =
        this.filtroDepartamento === '' || e.departamento === this.filtroDepartamento;

      const coincideMunicipio =
        this.filtroMunicipio === '' || e.municipio === this.filtroMunicipio;

      return coincideBusqueda && coincideDepartamento && coincideMunicipio;
    });
  }

  // 🔥 ABRIR MODAL
  editar(evento: any) {
    this.eventoSeleccionado = { ...evento }; // copia
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarCambios() {
    const index = this.eventos.findIndex(e => e.evento === this.eventoSeleccionado.evento);
    if (index !== -1) {
      this.eventos[index] = this.eventoSeleccionado;
    }

    this.aplicarFiltros();
    this.cerrarModal();
  }

  // 📥 EXPORTAR EXCEL
  exportarExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.eventosFiltrados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Eventos');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream'
    });

    saveAs(blob, 'eventos_filtrados.xlsx');
  }
cargarDesdeBackend() {

  const formData = new FormData();
  formData.append('fecha_inicio', this.fechaInicio || '');
  formData.append('fecha_fin', this.fechaFin || '');

  this.cargando = true;

  this.api_serve.buscar_datos_cenam_diate(formData).subscribe({
    next: (resp: any) => {

      if (resp && resp.status === "ok") {

        // 🔥 MAPEO AQUÍ
        this.eventos = (resp.data || []).map((e: any, index: number) => ({
          evento: index + 1,
          boletin: e.res_boletin,
          departamento: e.hop_depto,
          municipio: e.hop_mpio,
          tipo_explosivo: e.res_accion,
          cantidad: e.cantidad,
          fecha: e.hop_fecha_hecho,
          hora: e.hop_hora_hecho,
          enemigo: e.hop_enemigo,
          unidad: e.hop_unidad
        }));

        this.eventosFiltrados = [...this.eventos];
        this.departamentos = [...new Set(this.eventos.map(e => e.departamento))];
this.municipios = [...new Set(this.eventos.map(e => e.municipio))];

      } else {
        this.eventos = [];
        this.eventosFiltrados = [];
      }

      this.cargando = false;
    },

    error: (err: HttpErrorResponse) => {
      console.error("Error backend:", err);
      this.cargando = false;
    }
  });
}
}