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
  constructor(private selector: SelectoresService, private menu_service: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService) { }
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
    this.eventoSeleccionado = evento;
    this.organizarEvento(evento); // 🔥 IMPORTANTE
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
secciones: any[] = [];

organizarEvento(e: any) {

  this.secciones = [
    

    {
      titulo: '🧾 GENERAL',
      data: [
        { label: 'Boletín', value: e.res_boletin },
        { label: 'Fecha', value: e.hop_fecha_hecho },
        { label: 'Hora', value: e.hop_hora_hecho },
        { label: 'HR', value: e.hr }
      ]
    },

    {
      titulo: '⚔️ OPERACIÓN',
      data: [
        { label: 'Comandante', value: e.hop_comandante },
        { label: 'Operación', value: e.hop_operacion },
        { label: 'Orden', value: e.hop_ordop },
        { label: 'Tipo Operación', value: e.tipo_operacion }
      ]
    },

    {
      titulo: '⚖️ JUDICIAL',
      data: [
        { label: 'Fecha Judicial', value: e.res_fecha_judic },
        { label: 'Judicial', value: e.res_judic },
        { label: 'SPOA', value: e.res_spoa }
      ]
    },

    {
      titulo: '👤 ACTORES',
      data: [
        { label: 'Enemigo', value: e.hop_enemigo },
        { label: 'Estructura', value: e.hop_cuadrilla },
        { label: 'Fenómeno', value: e.fenomeno_de_criminalidad }
      ]
    },

    {
      titulo: '💥 EVENTO',
      data: [
        { label: 'Acción', value: e.res_accion },
        { label: 'Cantidad', value: e.cantidad },
        { label: 'Clase', value: e.res_clase },
        { label: 'Subtipo', value: e.res_subtipo },
        { label: 'Tipo', value: e.res_tipo }
      ]
    },

    {
      titulo: '📍 UBICACIÓN',
      data: [
        { label: 'Departamento', value: e.hop_depto },
        { label: 'Municipio', value: e.hop_mpio },
        { label: 'Lugar', value: e.hop_lugar },
        { label: 'Sitio', value: e.hop_sitio },
        { label: 'Latitud', value: e.hop_lat },
        { label: 'Longitud', value: e.hop_lon }
      ]
    },

    {
      titulo: '🛡️ APOYOS',
      data: [
        { label: 'Apoyo Aéreo', value: e.hop_apoyo_aereo },
        { label: 'Apoyo Art', value: e.hop_apoyo_art },
        { label: 'Apoyo BAFUR', value: e.hop_apoyo_bafur },
        { label: 'Apoyo BRCMI', value: e.hop_apoyo_brcmi },
        { label: 'Apoyo BRCOM', value: e.hop_apoyo_brcom },
        { label: 'Apoyo DIVFE', value: e.hop_apoyo_divfe }
      ]
    }

  ];
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
            ...e   // 🔥 TRAE TODO AUTOMÁTICO
          }));

          this.eventosFiltrados = [...this.eventos];
this.departamentos = [...new Set(this.eventos.map(e => e.hop_depto))];
this.municipios = [...new Set(this.eventos.map(e => e.hop_mpio))];

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