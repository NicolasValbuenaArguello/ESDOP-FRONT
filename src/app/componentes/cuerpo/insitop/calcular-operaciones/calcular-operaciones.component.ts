import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

interface InsitopData {
  division: string;
  brigada: string;
  unidad: string; // batallón
  linea: string;
  orden: string;
  code: string;
  operacion: string;
  tarea: string;
  departamento: string;
}
interface DepartamentoConMunicipios {
  nombre: string;
  municipios: string[];
}

@Component({
  selector: 'app-calcular-operaciones',
  templateUrl: './calcular-operaciones.component.html',
  styleUrls: ['./calcular-operaciones.component.css']
})
export class CalcularOperacionesComponent {
  departamentos: DepartamentoConMunicipios[] = [];
  fechaInicio = '';
  fechaFin = '';
  mensaje = '';
  cargando = false;

  datos: InsitopData[] = [];

  divisionActiva: string | null = null;
  brigadaActiva: { [division: string]: string } = {};
  batallonActivo: { [clave: string]: string } = {}; // clave = `${division}-${brigada}`
  mostrarResumenGeneral: boolean = false;

  constructor(private api_serve: ServiceConecionService, private selector: SelectoresService,) {}
mostrarVentanaResumen: boolean = false;

 departamentos_filtrados = this.selector.departamentos_unicos()
  departamentos_filtrado: string[] = []
  unidad_selecionada_municipios: string[] = []
  aler_p_datos: boolean = false
  datos_municipios: string[] = []
  divisiones_filtrar: string[] = ["DIV01", "DIV02", "DIV03", "DIV04", "DIV05", "DIV06", "DIV07", "DIV08", "FUTOM", "DAVAA", "CAAID", "CAOCC", "TREJC"]

  divisiones_filtrados: string[] = []

  unidad_selecionada_batallones: string[] = ["Descanso", "Entrenamiento", "Novedades", "Operaciones"]
  subregionSeleccionada: any = null;
  subregiones: any[] = [];
  ventana_activa: 'divisiones' | 'departamentos' | 'municipios' | null = null;

mostrarFiltros: boolean = false;


  ngOnInit(): void {

    this.actualizarListaSubregiones();
    this.api_serve.getDepartamentosConMunicipios().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (err) => {
        console.error('Error cargando departamentos:', err);
      }
    });
  }

  calcular(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      this.mensaje = 'Debes seleccionar ambas fechas.';
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    this.datos = [];

    const formData = new FormData();
    formData.append('fechaInicio', this.fechaInicio);
    formData.append('fechaFin', this.fechaFin);
    formData.append("subregion", JSON.stringify(this.subregionSeleccionada!));
    this.departamentos_filtrado.sort()
    formData.append("dpto", String(this.departamentos_filtrado));
    this.datos_municipios.sort()
    formData.append("mpio", String(this.datos_municipios));

    this.divisiones_filtrados.sort()
    formData.append("divisiones_filtrados", String(this.divisiones_filtrados));

    this.api_serve.Cargar_insitop_calculo(formData).subscribe({
      next: (result: any) => {
        const info = result?.informacion_insitop_calculo;
        if (info && typeof info === 'object') {
          const nuevosDatos: InsitopData[] = [];

          for (const division in info) {
            const brigadas = info[division];
            for (const brigada in brigadas) {
              const unidades = brigadas[brigada];
              for (const unidad in unidades) {
                const detalles = unidades[unidad];
                for (const det of detalles) {
                  nuevosDatos.push({
                    division,
                    brigada,
                    unidad,
                    linea: det.linea,
                    orden: det.orden,
                    code: det.code,
                    operacion: det.operacion,
                    tarea: det.tarea,
                    departamento: det.departamento,
                  });
                }
              }
            }
          }

          this.datos = nuevosDatos;
          this.mensaje = this.datos.length > 0
            ? 'Cálculo completado con éxito.'
            : 'No se encontró información.';
        } else {
          this.mensaje = 'No se encontró información.';
        }

        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error en la petición:', err.message);
        this.mensaje = 'Error al calcular.';
        this.cargando = false;
      },
    });
  }

  toggleDivision(division: string): void {
    this.divisionActiva = this.divisionActiva === division ? null : division;
  }

  toggleBrigada(division: string, brigada: string): void {
    this.brigadaActiva[division] =
      this.brigadaActiva[division] === brigada ? '' : brigada;
  }

  toggleBatallon(division: string, brigada: string, batallon: string): void {
    const clave = `${division}-${brigada}`;
    this.batallonActivo[clave] =
      this.batallonActivo[clave] === batallon ? '' : batallon;
  }

  getDivisiones(): string[] {
    return Array.from(new Set(this.datos.map(d => d.division)));
  }

  getBrigadas(division: string): string[] {
    return Array.from(
      new Set(this.datos.filter(d => d.division === division).map(d => d.brigada))
    );
  }

  getBatallones(division: string, brigada: string): string[] {
    return Array.from(
      new Set(
        this.datos
          .filter(d => d.division === division && d.brigada === brigada)
          .map(d => d.unidad)
      )
    );
  }

  getResumenPorDivision(division: string): any {
    const dataFiltrada = this.datos.filter(d => d.division === division);
    return this.generarResumen(dataFiltrada);
  }

  getResumenPorBrigada(division: string, brigada: string): any {
    const dataFiltrada = this.datos.filter(
      d => d.division === division && d.brigada === brigada
    );
    return this.generarResumen(dataFiltrada);
  }

  getResumenPorBatallon(division: string, brigada: string, batallon: string): any {
    const dataFiltrada = this.datos.filter(
      d =>
        d.division === division &&
        d.brigada === brigada &&
        d.unidad === batallon
    );
    return this.generarResumen(dataFiltrada);
  }

  generarResumen(dataFiltrada: InsitopData[]): any {
    return {
      total: dataFiltrada.length,
      porLinea: this.contarPorCampo(dataFiltrada, 'linea'),
      porOrden: this.contarPorCampo(dataFiltrada, 'orden'),
      porCode: this.contarPorCampo(dataFiltrada, 'code'),
      porOperacion: this.contarPorCampo(dataFiltrada, 'operacion'),
      porTarea: this.contarPorCampo(dataFiltrada, 'tarea'),
      porDepartamento: this.contarPorCampo(dataFiltrada, 'departamento'),
    };
  }

  contarPorCampo(data: InsitopData[], campo: keyof InsitopData): Record<string, number> {
    return data.reduce((acc, item) => {
      const valor = item[campo] || 'Sin dato';
      acc[valor] = (acc[valor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
  getResumenGeneral(): any {
  return this.generarResumen(this.datos);
}
getResumenTablaPorDivision() {
  const resumen: any = {};
  for (const item of this.datos) {
    const division = item.division;

    if (!resumen[division]) {
      resumen[division] = {
        porLinea: {},
        porCode: {},
        porOperacion: {},
        porTarea: {}
      };
    }

    const r = resumen[division];

    r.porLinea[item.linea] = (r.porLinea[item.linea] || 0) + 1;
    r.porCode[item.code] = (r.porCode[item.code] || 0) + 1;
    r.porOperacion[item.operacion] = (r.porOperacion[item.operacion] || 0) + 1;
    r.porTarea[item.tarea] = (r.porTarea[item.tarea] || 0) + 1;
  }
  return resumen;
}

exportarExcel() {
  const resumen = this.getResumenTablaPorDivision();
  const rows = [];

  for (const division of Object.keys(resumen)) {
    const data = resumen[division];
    const maxLen = Math.max(
      Object.keys(data.porLinea).length,
      Object.keys(data.porCode).length,
      Object.keys(data.porOperacion).length,
      Object.keys(data.porTarea).length
    );

    for (let i = 0; i < maxLen; i++) {
      rows.push({
        División: i === 0 ? division : '',
        Línea: Object.keys(data.porLinea)[i] ? `${Object.keys(data.porLinea)[i]}: ${data.porLinea[Object.keys(data.porLinea)[i]]}` : '',
        Code: Object.keys(data.porCode)[i] ? `${Object.keys(data.porCode)[i]}: ${data.porCode[Object.keys(data.porCode)[i]]}` : '',
        Operación: Object.keys(data.porOperacion)[i] ? `${Object.keys(data.porOperacion)[i]}: ${data.porOperacion[Object.keys(data.porOperacion)[i]]}` : '',
        Tarea: Object.keys(data.porTarea)[i] ? `${Object.keys(data.porTarea)[i]}: ${data.porTarea[Object.keys(data.porTarea)[i]]}` : '',
      });
    }
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(blob, 'resumen_divisiones.xlsx');
}

exportarPDF() {
  const input = document.querySelector('.resumen-tabla') as HTMLElement;
  html2canvas(input).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape' });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save('resumen_divisiones.pdf');
  });
}
mostrar_divisiones() {
    this.ventana_activa = 'divisiones';
  }

  mostrar_dpto() {
    this.ventana_activa = 'departamentos';
  }

  mostrar_mpio() {
    this.ventana_activa = 'municipios';
  }

  cerrar_ventana() {
    this.ventana_activa = null;
  }


  unidad_selecionados(item: string, i: number) {
    const municipios = item
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(i + item)

    this.aler_p_datos = true
    console.log(item)


    if (!this.divisiones_filtrados.includes(item)) {
      this.divisiones_filtrados.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.divisiones_filtrados.indexOf(item); // obtenemos el indice
      this.divisiones_filtrados = this.divisiones_filtrados.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    console.log(this.divisiones_filtrados)

  }
  municipios_selecionados(item: string, i: number) {
    const municipios = item
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(i + item)

    this.aler_p_datos = true
    console.log(item)


    if (!this.datos_municipios.includes(item)) {
      this.datos_municipios.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.datos_municipios.indexOf(item); // obtenemos el indice
      this.datos_municipios = this.datos_municipios.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    console.log(this.datos_municipios)

  }
  departamentos_selecionar(evaluar: number, respuesta: number, item: string) {

    const departamento = item
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)

    this.aler_p_datos = true
    this.unidad_selecionada_municipios = []

    if (!this.departamentos_filtrado.includes(item)) {
      this.departamentos_filtrado.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.departamentos_filtrado.indexOf(item); // obtenemos el indice
      this.departamentos_filtrado = this.departamentos_filtrado.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    for (let x in this.departamentos_filtrado) {
      var unidad_selecionada_municipios = this.selector.unidades_filtradas(this.departamentos_filtrado[x], evaluar, respuesta)
      for (let y in unidad_selecionada_municipios) {
        this.unidad_selecionada_municipios.push(unidad_selecionada_municipios[y])

      }

    }

    this.aler_p_datos = true

    for (let i in this.datos_municipios) {
      this.datos_municipios.splice(parseInt(i))
    }
    this.unidad_selecionada_municipios.sort()
  }

  actualizarListaSubregiones() {
    this.api_serve.obtenerSubregiones().subscribe({
      next: data => {
        this.subregiones = data;
        console.log("🔁 Lista actualizada");
      },
      error: err => console.error("Error al cargar subregiones", err)
    });
  }
  ventanaVisible = false;
  subregionDetalleVisible: string | null = null;

  // Aquí defines tus datos reales desde la API o backend


  subregionSeleccionEmergente: string | null = null; // Solo para ventana emergente

  subregionSeleccionadaId: string | null = null;


  toggleDetalleSubregion(id: string) {
    if (this.subregionDetalleVisible === id) {
      this.subregionDetalleVisible = null;
    } else {
      this.subregionDetalleVisible = id;
    }
  }
  contarMunicipios(subregion: any): number {
    return subregion.departamentos.reduce((acc: number, dep: any) => acc + dep.municipios.length, 0);
  }
  abrirVentanaSubregiones() {
    this.ventanaVisible = true;
    this.subregionSeleccionEmergente = null;
    this.subregionDetalleVisible = null;
  }


  subregionSeleccionadaNombre: string | null = null;



  confirmarSeleccion() {
    const sub = this.subregiones.find(s => s.id === this.subregionSeleccionadaId);
    if (!sub) {
      alert("Debe seleccionar una subregión");
      return;
    }
    this.subregionSeleccionadaNombre = sub.nombre;
    this.subregionSeleccionadaId = sub.id;
    this.subregionSeleccionada = sub
    this.ventanaVisible = false;
  }
  limpiarSubregion() {
    this.subregionSeleccionadaNombre = null;
    this.subregionSeleccionadaId = null;
    this.subregionSeleccionada = null;
  }


  quitarSeleccion() {
    this.subregionSeleccionEmergente = null;
    this.subregionDetalleVisible = null;

  }
limpiarDepartamentos() {
  this.departamentos_filtrado = [];
}

limpiarMunicipios() {
  this.datos_municipios = [];
}

limpiarDivisiones() {
  this.divisiones_filtrados = [];
}
limpiarTodo() {
  this.datos_municipios = [];
  this.departamentos_filtrado = [];
  this.divisiones_filtrados = [];
}


}
