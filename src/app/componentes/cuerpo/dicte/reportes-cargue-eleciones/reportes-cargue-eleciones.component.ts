import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportes-cargue-eleciones',
  templateUrl: './reportes-cargue-eleciones.component.html',
  styleUrls: ['./reportes-cargue-eleciones.component.css']
})
export class ReportesCargueElecionesComponent {

  constructor(private http: HttpClient) {
     
  }
  
  // ✅ Control de vista
  activeSection: 'reporte'  | 'cargue'  | 'formatos' = 'formatos';
  isPanelOpen = false;

  // ✅ Variables de datos
  fechaReporte: string = '';
  archivoExcelPrincipal?: File;
  archivoExcel1?: File;
  archivoExcel2?: File;
  archivoExcel3?: File;
  archivoExcel4?: File;

  // ✅ Estados de carga
  cargandoReporte = false;
  cargandoCargue = false;
  cargandoCargue1 = false;
  cargandoCargue2 = false;
  cargandoCargue3 = false;
  cargandoCargue4 = false;

  // ✅ URLs de la API
  private apiReporte = 'http://172.22.2.36:5011/reporte_eleciones';
  private apiGuardar = 'http://172.22.2.36:5011/guaradar_eleciones';
  private apiGuardarArchivo1 = 'http://172.22.2.36:5011/cargar_mesas';
  private apiGuardarArchivo2 = 'http://172.22.2.36:5011/cargar_reservas';
  private apiGuardarArchivo3 = 'http://172.22.2.36:5011/avance_cumplimiento';
  private apiGuardarArchivo4 = 'http://172.22.2.36:5011/cargue_divipol';
  actualizarMapas = false;
mostrarAdvertencia = false;

archivos = [
  {
    titulo: 'Informe PDF',
    descripcion: 'Documento en formato PDF con la información consolidada.',
    ruta: 'https://172.22.2.36:5194/descargar/mesas_de_votacion.pdf',
    icono: 'bi bi-file-earmark-pdf',
    color: 'text-danger',
    botonClase: 'btn-outline-danger',
    nombre:'mesas_de_votacion.pdf'
  },

  {
    titulo: 'Formato Unidades',
    descripcion: 'Plantilla Excel para registrar cobertura de puestos de votación. No cambiar nombres de columnas.',
    ruta: 'https://172.22.2.36:5194/descargar/mesas_de_votacion.xlsx',
    icono: 'bi bi-file-earmark-excel',
    color: 'text-success',
    botonClase: 'btn-outline-success',
    nombre: 'mesas_de_votacion.xlsx'
  },


  {
    titulo: 'Formato Unidades Reserva',
    descripcion: 'Plantilla Excel para registrar las unidades de reserva. No cambiar nombres de columnas.',
    ruta: 'https://172.22.2.36:5194/descargar/unidade_de_reserva.xlsx',
    icono: 'bi bi-file-earmark-excel',
    color: 'text-success',
    botonClase: 'btn-outline-success',
    nombre:'unidade_de_reserva.xlsx'
  },
  {
    titulo: 'Notas',
    descripcion: 'Plantilla Excel para registrar el avance del cubrimiento de los puestos de votacion. No cambiar nombres de columnas.',
    ruta: 'https://172.22.2.36:5194/descargar/avance_unidades_puestos.xlsx',
    icono: 'bi bi-file-earmark-text',
    color: 'text-warning',
    botonClase: 'btn-outline-warning text-light',
    nombre:'avance_unidades_puestos.xlsx'
  },
  {
    titulo: 'Paquete ZIP',
    descripcion: 'Formato DIVIPOL.',
    ruta: 'https://172.22.2.36:5194/descargar/divipol.xlsx',
    icono: 'bi bi-archive',
    color: 'text-secondary',
    botonClase: 'btn-outline-light',
    nombre:'divipol.xlsx'
  }
];



  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  setActiveSection(section: 'reporte' | 'cargue' | 'formatos') {
    this.activeSection = section;
    this.isPanelOpen = false;
  }

  // ✅ Generar reporte
  generarReporte() {
    if (!this.fechaReporte) {
      alert('Por favor seleccione una fecha para el reporte');
      return;
    }

    this.cargandoReporte = true;

    const formData = new FormData();
    formData.append('fecha', this.fechaReporte);
    formData.append('actualizarMapas', String(this.actualizarMapas));
    

    this.http.post<any>(this.apiReporte, formData).subscribe({
      next: (response) => {
        const nombreArchivo = response.nombre || `reporte_${this.fechaReporte}.pdf`;
        const urlArchivo = response.link;

        if (urlArchivo) {
          const a = document.createElement('a');
          a.href = urlArchivo;
          a.download = nombreArchivo;
          a.target = "_blank";
          a.click();
        } else {
          alert("El servidor no envió un link válido para el reporte");
        }
      },
      error: (err) => {
        console.error('❌ Error al generar reporte:', err);
        alert('Error al generar reporte');
      },
      complete: () => {
        this.cargandoReporte = false;
      }
    });
  }

  // ✅ Selección de archivos
  onFileSelected(event: Event, tipo: 'principal' | 'archivo1' | 'archivo2' | 'archivo3' | 'archivo4') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (tipo === 'principal') this.archivoExcelPrincipal = file;
      if (tipo === 'archivo1') this.archivoExcel1 = file;
      if (tipo === 'archivo2') this.archivoExcel2 = file;
      if (tipo === 'archivo3') this.archivoExcel3 = file;
      if (tipo === 'archivo4') this.archivoExcel4 = file;
      console.log(`📂 Archivo seleccionado (${tipo}):`, file.name);
    }
  }

  // ✅ Guardar según el tipo
  guardar(tipo: 'principal' | 'archivo1' | 'archivo2' | 'archivo3' | 'archivo4') {
    let archivo: File | undefined;
    let apiUrl = '';
    let cargandoProp: keyof this;

    if (tipo === 'principal') {
      archivo = this.archivoExcelPrincipal;
      apiUrl = this.apiGuardar;
      cargandoProp = 'cargandoCargue';
    } else if (tipo === 'archivo1') {
      archivo = this.archivoExcel1;
      apiUrl = this.apiGuardarArchivo1;
      cargandoProp = 'cargandoCargue1';
    } else if (tipo === 'archivo2') {
      archivo = this.archivoExcel2;
      apiUrl = this.apiGuardarArchivo2;
      cargandoProp = 'cargandoCargue2';
    } else if (tipo === 'archivo3') {
      archivo = this.archivoExcel3;
      apiUrl = this.apiGuardarArchivo3;
      cargandoProp = 'cargandoCargue3';
    }
    else {
      archivo = this.archivoExcel4;
      apiUrl = this.apiGuardarArchivo4;
      cargandoProp = 'cargandoCargue4';
    }

    if (!archivo) {
      alert(`Debe seleccionar un archivo Excel (${tipo}) antes de guardar`);
      return;
    }

    (this as any)[cargandoProp] = true;

    const formData = new FormData();
    formData.append('file', archivo, archivo.name);

    this.http.post(apiUrl, formData).subscribe({
      next: (response) => {
        console.log(`💾 Archivo (${tipo}) guardado con éxito:`, response);
        alert(`Archivo (${tipo}) cargado correctamente`);
      },
      error: (err) => {
        console.error(`❌ Error al guardar archivo (${tipo}):`, err);
        alert(`Error al guardar archivo (${tipo})`);
      },
      complete: () => {
        (this as any)[cargandoProp] = false;
      }
    });
  }
}
