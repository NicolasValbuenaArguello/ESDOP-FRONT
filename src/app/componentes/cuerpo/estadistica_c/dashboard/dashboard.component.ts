import { Component, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { CookieService } from 'ngx-cookie-service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

interface HexItem {
  id: string;
  numero: string;
  cantidad: string;
  titulo: string;
  color: string;
  fila: number;
  icono?: string;       // 👈 Nuevo campo
  central?: boolean;
}
interface MineriaDato {
  icono: string;
  nombre: string;
  total2024: number | string;
  oct2024: number | string;
  oct2025: number | string;
  diarioCV: number | string;
  diarioCVUp?: boolean;   // true: flecha arriba, false: flecha abajo
  avance: number | string;
  anualCV: number | string;
  anualCVUp?: boolean;    // true: flecha arriba, false: flecha abajo
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent

  constructor(private fb: FormBuilder, private http: HttpClient, private service: ServiceConecionService, private cookie: CookieService, private selector: SelectoresService) {
    this.formColumna1 = this.fb.group({
      material: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(1)]],
    });

    this.formColumna2 = this.fb.group({
      material: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(1)]],
    });
  }

  formColumna1: FormGroup;
  formColumna2: FormGroup;

  resultados: any[] = [];
  variablesFiltradas1: string[] = []; // 🔹 variables del select dependiente (columna 1)

  lista1: { material: string; valor: number }[] = [];
  lista2: { material: string; valor: number }[] = [];
  datos: MineriaDato[] = [];
  anio_anterior: number | null = null;
  anio_actual: number | null = null;

  mesAnterior: string | null = null;
  mesActual: string | null = null;

  mostrarVentana = false;
  loading: boolean = false; // 🔹 Nueva variable
  filtros = {
    fechaInicio: '',
    fechaFin: '',
    fechaInicioAnterior: '',
    fechaFinAnterior: '',
    divi_padre: '',
    divi_hija: '',
    op_mayores: ''
  };
  datos_graficar: string[]
  // Estructura inicial vacía
  valorMaquinaria = { cop: 0, usd: 0 };
  valorMaquinariaAnterior = { cop: 0, usd: 0 };
  valorEconomia = { cop: 0, usd: 0 };
  detalles = { mercurio: 0, combustible: 0, oro: 0, hectareas: 0 };
  trm = 0;
  fechaTrm = '';

  cargando = true;
  materiales: string[] = [];
  urlMineria = this.service.urlMineria
  link: string
  nombre: string
  unidad_selecionada_div: string[] = []
  unidad_selecionada_brigada: string[] = []
  unidad_selecionada_batallones: string[] = []
  divi_padre: string = "---"
  divi_hija: string = "---"
  brigada: string = "---"
  batallon: string = "---"
  municipios: string = "---"

  departamento: string = "---"
  amenaza: string = "---"
  op_mayor: string = "---"
  division = this.selector.duplicados()
  departamentos_filtrados = this.selector.departamentos_unicos()
  aler_p_datos: boolean = false
  datos_municipios: string[] = []
  datos_resultados: string[] = []
  datos_amenaza: string[] = []
  datos_estructuras: string[] = []
  datos_bloque: string[] = []
  datos_suboestructura: string[] = []

  datos_batallones: string[] = []
  departamentos_filtrado: string[] = []
  unidad_selecionada_municipios: string[] = []

  unidad_selecionada_brigadas_filtradas: string[] = []
  unidad_selecionada_resultados: string[] = this.selector.unidad_selecionada_resultados
  unidad_selecionada_resultados_tropas: string[] = this.selector.unidad_selecionada_resultados_tropas
  unidad_selecionada_resultados_armamento: string[] = this.selector.unidad_selecionada_resultados_armamento
  comates_a_selecionar: string[] = this.selector.combates_a_selecionar
  ataque_fuerza_publica: string[] = this.selector.ataque_fuerza_publica
  material_explosivos: string[] = this.selector.material_explosivos
  narcotrafico_lista: string[] = this.selector.narcotrafico_lista
  economias_ilicitas: string[] = this.selector.economias_ilicitas
  afectaciones_oleoducto: string[] = this.selector.afectaciones_oleoducto
  afectaciones_a_la_mineria: string[] = this.selector.afectaciones_a_la_mineria
  afectaciones_al_contranando: string[] = this.selector.afectaciones_al_contranando
  loe_amazonia: string[] = this.selector.loe_amazonia

  acam_enemigo = JSON.parse(sessionStorage.getItem("acam_enemigo")!)

  acam_estructura = JSON.parse(sessionStorage.getItem("acam_estructura")!)
  ene_estructura = JSON.parse(sessionStorage.getItem("ene_estructura")!)

  otro: string[] = this.selector.otro
  ventanaVisible = false;
  subregionDetalleVisible: string | null = null;

  // Aquí defines tus datos reales desde la API o backend


  subregionSeleccionEmergente: string | null = null; // Solo para ventana emergente

  subregionSeleccionadaId: string | null = null;
  subregionSeleccionadaNombre: string | null = null;
  subregiones: any[] = [];
  subregionSeleccionada: any = null;
  amenaza_select = this.selector.amenaza_select()
  op_mayores = this.selector.op_mayores_f()

  alerta: string = ""
  ventanaApoyosVisible = false;
  apoyoSeleccionado: { [key: string]: boolean } = {};
  tiposOperacion = ['Ofensiva', 'Defensiva', 'Reconocimiento'];
  apoyosUnificados = [
    // Apoyos de unidad ya estructurados
    { id: 'sin_apoyo', valor: '', texto: 'Sin Apoyo' },
    { id: 'apoyo_davaa', valor: 'APOYO DAVAA', texto: 'Apoyo DAVAA' },
    { id: 'apoyo_conat', valor: 'APOYO CONAT', texto: 'Apoyo CONAT' },
    { id: 'apoyo_blica', valor: 'APOYO BLICA', texto: 'Apoyo BLICA' },
    // Apoyos originales como objetos
    { id: 'HOP_ACCION_CCOES', valor: 'Apoyo CCOES', texto: 'Apoyo CCOES' },
    { id: 'HOP_APOYO_AEREO_ALFA', valor: 'Apoyo AÉREO MISIÓN ALFA', texto: 'Apoyo AÉREO MISIÓN ALFA' },
    { id: 'HOP_APOYO_AEREO_BETA', valor: 'Apoyo AÉREO MISIÓN BETA', texto: 'Apoyo AÉREO MISIÓN BETA' },
    { id: 'HOP_APOYO_AEREO_CHARLIE', valor: 'Apoyo AÉREO MISIÓN CHARLIE', texto: 'Apoyo AÉREO MISIÓN CHARLIE' },
    { id: 'HOP_APOYO_ART', valor: 'Apoyo ART', texto: 'Apoyo ART' },
    { id: 'HOP_APOYO_BAFUR', valor: 'Apoyo BAFUR', texto: 'Apoyo BAFUR' },
    { id: 'HOP_APOYO_BRCMI', valor: 'Apoyo BRCMI', texto: 'Apoyo BRCMI' },
    { id: 'HOP_APOYO_BRCOM', valor: 'Apoyo BRCOM', texto: 'Apoyo BRCOM' },
    { id: 'HOP_APOYO_DIVFE', valor: 'Apoyo DIVFE', texto: 'Apoyo DIVFE' },
    { id: 'HOP_APOYO_EXDE', valor: 'Apoyo EXDE', texto: 'Apoyo EXDE' },
    { id: 'HOP_APOYO_FUDAT', valor: 'Apoyo FUDAT', texto: 'Apoyo FUDAT' },
    { id: 'HOP_APOYO_GROIC', valor: 'Apoyo GROIC', texto: 'Apoyo GROIC' },
    { id: 'HOP_APOYO_PJ', valor: 'Apoyo PJ', texto: 'Apoyo PJ' },
    { id: 'HOP_ASALTO_AEREO', valor: 'Apoyo AÉREO', texto: 'Apoyo AÉREO' },
    { id: 'apoyo_coeej', valor: 'Apoyo COEEJ', texto: 'Apoyo COEEJ' },
    { id: 'unidad_brcmi', valor: 'UNIDAD BRCMI', texto: 'UNIDAD BRCMI' }

  ];
  ngOnInit(): void {
    this.cargarResultados();
    this.cargarValores();
    this.actualizarListaSubregiones();
    this.materialesFiltrados = [...this.materiales]; // inicializa

    this.service.obtenerResultadosConVariables().subscribe({
      next: (res) => {
        this.materiales = res.res_clases;
        this.materialesFiltrados = [...this.materiales];
      },
      error: (err) => console.error('❌ Error:', err.message),
    });
  }
  tieneApoyoSeleccionado(): boolean {
    return Object.values(this.apoyoSeleccionado).some(valor => valor);
  }
  cerrarVentanaApoyos() {
    this.ventanaApoyosVisible = false;
    console.log('Apoyo disponible seleccionado:', this.apoyoSeleccionado);

  }

  actualizarListaSubregiones() {
    this.service.obtenerSubregiones().subscribe({
      next: data => {
        this.subregiones = data;
        console.log("🔁 Lista actualizada");
      },
      error: err => console.error("Error al cargar subregiones", err)
    });
  }
  div_hija(evaluar: number, respuesta: number) {
    for (let i in this.unidad_selecionada_div) {
      this.unidad_selecionada_div.splice(parseInt(i))
    }
    this.unidad_selecionada_brigada = []
    this.unidad_selecionada_batallones = []

    this.unidad_selecionada_div = this.selector.unidades_filtradas(this.filtros.divi_padre, evaluar, respuesta)

  }
  brigadas(evaluar: number, respuesta: number) {

    for (let i in this.unidad_selecionada_brigada) {
      this.unidad_selecionada_brigada.splice(parseInt(i))
    }

    this.unidad_selecionada_batallones = []
    this.unidad_selecionada_brigada = this.selector.unidades_filtradas(this.filtros.divi_hija, evaluar, respuesta)

  }
  ver_batallones() {
    var municipios_oculto = document.getElementById("ver_batallones")
    municipios_oculto?.classList.toggle("oculto")
  }
  ver_brigadas() {
    var ver_brigadas = document.getElementById("ver_brigadas")
    ver_brigadas?.classList.toggle("oculto")
  }
  departamentoos(evaluar: number, respuesta: number, item: string) {

    const departamento = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che = document.getElementById(item)

    this.aler_p_datos = true
    this.unidad_selecionada_municipios = []

    if (!this.departamentos_filtrado.includes(item)) {
      this.departamentos_filtrado.push(item)
      che?.classList.toggle("che")
    } else {
      var indice = this.departamentos_filtrado.indexOf(item); // obtenemos el indice
      this.departamentos_filtrado = this.departamentos_filtrado.filter(function (i) { return i !== item }); // filtramos

      che?.classList.toggle("che")
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
  municipios_selecionados(item: string, i: number) {
    const municipios = item
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che = document.getElementById(i + item)

    this.aler_p_datos = true


    if (!this.datos_municipios.includes(item)) {
      this.datos_municipios.push(item)
      che?.classList.toggle("che")
    } else {
      var indice = this.datos_municipios.indexOf(item); // obtenemos el indice
      this.datos_municipios = this.datos_municipios.filter(function (i) { return i !== item }); // filtramos

      che?.classList.toggle("che")
    }

    console.log(this.datos_municipios)

  }
  batallones(evaluar: number, respuesta: number, item: string, i: number) {
    const brigada = item
    var che_2 = document.getElementById(i + item)
    var che1 = document.getElementById(i + item + 1)

    this.aler_p_datos = true
    // this.unidad_selecionada_brigadas_filtradas=[]
    this.unidad_selecionada_batallones = []
    if (!this.unidad_selecionada_brigadas_filtradas.includes(item)) {
      this.unidad_selecionada_brigadas_filtradas.push(item)
      che_2?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")

    } else {
      var indice = this.unidad_selecionada_brigadas_filtradas.indexOf(item); // obtenemos el indice
      this.unidad_selecionada_brigadas_filtradas = this.unidad_selecionada_brigadas_filtradas.filter(function (i) { return i !== item }); // filtramos

      che_2?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")

    }
    for (let x in this.unidad_selecionada_brigadas_filtradas) {
      var unidad_selecionada_batallones = this.selector.unidades_filtradas(this.unidad_selecionada_brigadas_filtradas[x], evaluar, respuesta)
      for (let y in unidad_selecionada_batallones) {
        this.unidad_selecionada_batallones.push(unidad_selecionada_batallones[y])

      }

    }

    for (let i in this.datos_batallones) {
      this.datos_batallones.splice(parseInt(i))
    }

    this.unidad_selecionada_batallones.sort()
  }

  batallones_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che = document.getElementById(item)
    var che1 = document.getElementById(item + 1)

    this.aler_p_datos = true


    if (!this.datos_batallones.includes(item)) {
      this.datos_batallones.push(item)
      che?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")
    } else {
      var indice = this.datos_batallones.indexOf(item); // obtenemos el indice
      this.datos_batallones = this.datos_batallones.filter(function (i) { return i !== item }); // filtramos

      che?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")
    }

    // console.log(this.datos_municipios)

  }
  abrirVentanaSubregiones() {
    this.ventanaVisible = true;
    this.subregionSeleccionEmergente = null;
    this.subregionDetalleVisible = null;
  }

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

  ver_amenaza() {

    var municipios_oculto = document.getElementById("ver_amenzaza")
    municipios_oculto?.classList.toggle("oculto")
  }
  quitarSeleccion() {
    this.subregionSeleccionEmergente = null;
    this.subregionDetalleVisible = null;

  }
  estructura_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che = document.getElementById(item)
    var che1 = document.getElementById(item + 1)

    this.aler_p_datos = true


    if (!this.datos_estructuras.includes(item)) {
      this.datos_estructuras.push(item)
      che?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")
    } else {
      var indice = this.datos_estructuras.indexOf(item); // obtenemos el indice
      this.datos_estructuras = this.datos_estructuras.filter(function (i) { return i !== item }); // filtramos

      che?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")
    }

    // console.log(this.datos_municipios)

  }
  bloque_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che = document.getElementById(item)
    var che1 = document.getElementById(item + 1)

    this.aler_p_datos = true


    if (!this.datos_bloque.includes(item)) {
      this.datos_bloque.push(item)
      che?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")
    } else {
      var indice = this.datos_bloque.indexOf(item); // obtenemos el indice
      this.datos_bloque = this.datos_bloque.filter(function (i) { return i !== item }); // filtramos

      che?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")
    }

    // console.log(this.datos_municipios)

  }
  suboestructura_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che = document.getElementById(item)
    var che1 = document.getElementById(item + 1)

    this.aler_p_datos = true


    if (!this.datos_suboestructura.includes(item)) {
      this.datos_suboestructura.push(item)
      che?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")
    } else {
      var indice = this.datos_suboestructura.indexOf(item); // obtenemos el indice
      this.datos_suboestructura = this.datos_suboestructura.filter(function (i) { return i !== item }); // filtramos

      che?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")
    }

    // console.log(this.datos_municipios)

  }
  enemigos_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che = document.getElementById(item)
    var che1 = document.getElementById(item + 1)

    this.aler_p_datos = true


    if (!this.datos_amenaza.includes(item)) {
      this.datos_amenaza.push(item)
      che?.classList.toggle("che")
      che1?.classList.toggle("item_selecionado")

    } else {
      var indice = this.datos_amenaza.indexOf(item); // obtenemos el indice
      this.datos_amenaza = this.datos_amenaza.filter(function (i) { return i !== item }); // filtramos
      che1?.classList.toggle("item_selecionado")
      che?.classList.toggle("che")
    }

    // console.log(this.datos_municipios)

  }

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
  ngAfterViewInit(): void {
    if (this.datos_graficar) {
      this.mapa_digital.graficarEventos(this.datos_graficar);
    }
  }
  busquedaMaterial: string = '';

  materialesFiltrados: string[] = [];
  materialSeleccionado: string | null = null;
  seleccionarMaterial(mat: string) {
    this.materialSeleccionado = mat;
    // ✅ Asignar el valor al formulario correspondiente (columna 1)
    this.formColumna1.get('material')?.setValue(mat);
  }

  mostrar_dpto() {
    const mostrar_dpto = document.getElementById("mostrar_dpto")
    mostrar_dpto?.classList.toggle("oculto")
  }
  mostrar_mpio() {
    const mostrar_mpio = document.getElementById("mostrar_mpio")
    mostrar_mpio?.classList.toggle("oculto")
  }
  agregarItem(columna: number): void {
    const form = columna === 1 ? this.formColumna1 : this.formColumna2;

    if (!form.valid) {
      console.warn('⚠️ Formulario inválido, no se envía.');
      return;
    }

    const nuevoItem = { ...form.value };
    const formData = new FormData();

    formData.append('material', nuevoItem.material);
    formData.append('valor', nuevoItem.valor);
    formData.append('columna', columna.toString());

    const url = this.urlMineria + '/guardar';

    this.http.post(url, formData).subscribe({
      next: (res: any) => {
        console.log('✅ Respuesta del servidor:', res);

        // 🧾 Actualizar lista de materiales (columna 1)
        if (res.lista_material && Array.isArray(res.lista_material)) {
          this.lista1 = res.lista_material.map((item: any) => ({
            material: item.variable || item.material || '',
            valor: parseFloat(item.valor_cop || item.valor || 0)
          }));
        }

        // 💵 Actualizar lista de valores en dólar (columna 2)
        if (res.lista_dolar && Array.isArray(res.lista_dolar)) {
          this.lista2 = res.lista_dolar.map((item: any) => ({
            valor: item.fecha || '',
            material: parseFloat(item.material) || 0
          }));

        }

        // 🧹 Limpiar formulario y restablecer variables
        form.reset();
        this.materialSeleccionado = '';
        this.busquedaMaterial = '';
        this.materialesFiltrados = [...this.materiales];

        console.log('🎯 Registro actualizado correctamente.');
      },
      error: (err) => {
        console.error('❌ Error al enviar los datos:', err);
      }
    });
  }


  filtrarMateriales() {
    const filtro = this.busquedaMaterial.toLowerCase();
    this.materialesFiltrados = this.materiales.filter(m =>
      m.toLowerCase().includes(filtro)
    );
  }




  extraerAnioAntrior() {
    if (this.filtros.fechaFinAnterior) {
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      const fecha = new Date(this.filtros.fechaFinAnterior);
      this.anio_anterior = fecha.getFullYear();
      this.mesAnterior = meses[fecha.getMonth()];



    }
  }
  extraerAnioActual() {
    if (this.filtros.fechaFin) {
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      const fecha = new Date(this.filtros.fechaFin);
      this.anio_actual = fecha.getFullYear();
      this.mesActual = meses[fecha.getMonth()];
    }
  }


  cargarResultados(): void {
    this.service.obtenerResultadosConVariables().subscribe({
      next: (res) => {
        console.log('📦 Datos cargados:', res);
        this.materiales = res.res_clases; // 👈 ahora se llena el select con los nombres directamente
      },
      error: (err) => {
        console.error('❌ Error:', err.message);
      },
    });
  }


  onMaterialChange(columna: number): void {
    const form = columna === 1 ? this.formColumna1 : this.formColumna2;
    const materialSeleccionado = form.get('material')?.value;

    const materialEncontrado = this.resultados.find(
      (m) => m.nombre_parametro === materialSeleccionado
    );

    if (columna === 1) {
      this.variablesFiltradas1 = materialEncontrado?.variables_asociadas || [];
      form.get('variable')?.setValue(''); // limpiar selección anterior
    }
  }


  cargarValores(): void {
    const url = this.urlMineria + '/valores';

    this.http.get(url).subscribe({
      next: (res: any) => {
        console.log('✅ Datos obtenidos del servidor:', res);

        // 🟢 Mapear la lista de materiales
        if (res.lista_material && Array.isArray(res.lista_material)) {
          this.lista1 = res.lista_material.map((item: any) => ({
            material: item.variable || item.material || '',
            valor: parseFloat(item.valor_cop || item.valor || 0)
          }));
        }

        // 💵 Mapear la lista de valores en dólar
        if (res.lista_dolar && Array.isArray(res.lista_dolar)) {
          this.lista2 = res.lista_dolar.map((item: any) => ({
            valor: item.fecha, // mostramos la fecha como “material” (puedes cambiar el nombre)
            material: parseFloat(item.material) || 0 // el valor real del dólar está en “material”
          }));
        }

        console.log('📦 Lista Material:', this.lista1);
        console.log('💵 Lista Dólar:', this.lista2);
      },
      error: (err) => {
        console.error('❌ Error al obtener valores:', err);
      }
    });
  }
  eliminarItem(columna: number, index: number): void {
    const url = this.urlMineria + '/eliminar_valor';
    const item = columna === 1 ? this.lista1[index] : this.lista2[index];

    if (!item) {
      console.warn(`⚠️ No se encontró el elemento en la lista ${columna} (índice ${index})`);
      return;
    }

    const formData = new FormData();
    formData.append('columna', columna.toString());

    let valorFinal: number;
    let materialFinal = '';

    if (columna === 1) {
      // 🧱 Materiales normales
      materialFinal = item.material;
      valorFinal = Number(item.valor);
    } else {
      // 💵 Dólares (los campos vienen invertidos)
      valorFinal = Number(item.material); // el número real
      materialFinal = ''; // no aplica
    }

    if (isNaN(valorFinal)) {
      console.error('❌ El valor no es numérico, no se puede eliminar:', item);
      return;
    }

    formData.append('material', materialFinal);
    formData.append('valor', valorFinal.toString());

    this.http.post(url, formData).subscribe({
      next: (res: any) => {
        console.log('✅ Eliminado correctamente:', res);
        if (columna === 1) {
          this.lista1.splice(index, 1);
        } else {
          this.lista2.splice(index, 1);
        }
      },
      error: (err) => {
        console.error('❌ Error al eliminar:', err);
      }
    });
  }




  mostrarDasho: boolean = true
  mostrarVentanaTabla: boolean = false
  mostrarVentanavalores: boolean = false

  accion1() {
    this.mostrarDasho = true;
    this.mostrarVentanaTabla = false;
    this.mostrarVentanavalores = false;

    // Espera un ciclo para que Angular cree el componente de mapa
    setTimeout(() => {
      if (this.mapa_digital) {
        this.mapa_digital.graficarEventos(this.datos_graficar);
      } else {
        console.warn('⚠️ Mapa digital no disponible aún');
      }
    }, 200);
  }


  accion2() {
    this.mostrarDasho = false;
    this.mostrarVentanaTabla = true;
    this.mostrarVentanavalores = false;

  }

  accion3() {
    this.mostrarDasho = false;
    this.mostrarVentanaTabla = false;
    this.mostrarVentanavalores = true;


  }



  hexagonos: HexItem[] = [];

  // 👉 Filtrar por fila (1, 2, 3)
  getFila(num: number) {
    return this.hexagonos.filter(h => h.fila === num);
  }

  categorias = ['EJC', 'APOYO BRCMI', 'APOYO CAPC'];



  cerrarVentana(event?: MouseEvent) {
    this.mostrarVentana = false;
  }


  filtrar() {
    // ✅ Validación manual antes de enviar
    if (
      !this.filtros.fechaInicio ||
      !this.filtros.fechaFin ||
      !this.filtros.fechaInicioAnterior ||
      !this.filtros.fechaFinAnterior 
    ) {
      alert('⚠️ Debe completar todas las fechas y seleccionar una categoría antes de continuar.');
      // marca los campos como "tocados" para mostrar los mensajes
      this.marcarCamposComoTocados();
      return;
    }

    // ✅ Validar coherencia: fechaInicio <= fechaFin
    const fi = new Date(this.filtros.fechaInicio);
    const ff = new Date(this.filtros.fechaFin);
    const fia = new Date(this.filtros.fechaInicioAnterior);
    const ffa = new Date(this.filtros.fechaFinAnterior);

    if (fi > ff) {
      alert('⚠️ La fecha inicial no puede ser posterior a la fecha final.');
      return;
    }

    if (fia > ffa) {
      alert('⚠️ La fecha inicial anterior no puede ser posterior a la fecha final anterior.');
      return;
    }

    // --- tu lógica original ---
    const formData = new FormData();
    formData.append('fechaInicio', this.filtros.fechaInicio || '');
    formData.append('fechaFin', this.filtros.fechaFin || '');
    formData.append('fechaInicioAnterior', this.filtros.fechaInicioAnterior || '');
    formData.append('fechaFinAnterior', this.filtros.fechaFinAnterior || '');

    formData.append("subregion", JSON.stringify(this.subregionSeleccionada!));
    formData.append("afectacion", "");

    formData.append('permiso', this.cookie.get('permiso'));
    formData.append('unidad', this.cookie.get('unidad'));
    formData.append('fullname', this.cookie.get('fullname'));
    formData.append('tipo_titulo', 'LOGO EJC');


    formData.append("agr_div", this.filtros.divi_padre || '');
    formData.append("Div_FT", this.filtros.divi_hija || '');

    formData.append("br", String(this.unidad_selecionada_brigadas_filtradas));

    formData.append("ut", String(this.datos_batallones));

    this.departamentos_filtrado.sort()
    formData.append("dpto", String(this.departamentos_filtrado));
    this.datos_municipios.sort()
    formData.append("mpio", String(this.datos_municipios));
    formData.append("filtro", '');
    formData.append("com_metas_narcotrafico", '');

    formData.append("spoa", '');
    formData.append("delco_cap", '');

    formData.append("acam_enemigo", String(this.datos_estructuras));
    formData.append("acam_estructura", String(this.datos_bloque));
    formData.append("ene_estructura", String(this.datos_suboestructura));

    formData.append("enemigo", String(this.datos_amenaza));
    formData.append("op_mayores", this.filtros.op_mayores || '');
    formData.append("apoyo_unidad", String(this.apoyoSeleccionado));

    formData.append("afectaciones", '');
    formData.append("estrategia", '');
    formData.append("tipo_operacion", '');

    formData.append("gaulas", '');

    formData.append("coordinadas", '');
    formData.append("conjuntas", '');
    formData.append("tipo_afectaciones", '');

    formData.append("tipo_titulo", "LOGO EJC");
    formData.append("documento", '');
    formData.append("datos_resultados", String(this.datos_resultados));

    formData.append("cdte", '');
    formData.append("hechos", '');



    const url = this.urlMineria + '/filtrar_da_mapa';
    this.loading = true;

    this.http.post<any[]>(url, formData).subscribe({
      next: (res) => {
        if (Array.isArray(res) && res.length >= 2) {
          this.hexagonos = res[0];
          this.datos = res[1];
          this.valorMaquinaria = res[2].valor_maquinaria;
          this.valorEconomia = res[2].valor_economia;
          this.detalles = res[2].detalles;
          this.trm = res[2].trm.valor;
          this.fechaTrm = res[2].trm.fecha;
          this.valorMaquinariaAnterior = res[2].valor_maquinaria_anterior;
          this.datos_graficar = res[3];
          this.mapa_digital.graficarEventos(this.datos_graficar);
        } else {
          console.warn('⚠️ Respuesta inesperada del servidor:', res);
        }

        this.mostrarVentana = false;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al filtrar:', err);
        this.loading = false;
      },
    });
  }
  documento() {
    if (
      !this.filtros.fechaInicio ||
      !this.filtros.fechaFin ||
      !this.filtros.fechaInicioAnterior ||
      !this.filtros.fechaFinAnterior 
    ) {
      alert('⚠️ Debe completar todas las fechas y seleccionar una categoría antes de generar el PDF.');
      this.marcarCamposComoTocados();
      return;
    }

    const formData = new FormData();
    formData.append('fechaInicio', this.filtros.fechaInicio || '');
    formData.append('fechaFin', this.filtros.fechaFin || '');
    formData.append('fechaInicioAnterior', this.filtros.fechaInicioAnterior || '');
    formData.append('fechaFinAnterior', this.filtros.fechaFinAnterior || '');
    formData.append('permiso', this.cookie.get('permiso'));
    formData.append('unidad', this.cookie.get('unidad'));
    formData.append('fullname', this.cookie.get('fullname'));
    formData.append('tipo_titulo', 'LOGO EJC');

    formData.append("subregion", JSON.stringify(this.subregionSeleccionada!));
    formData.append("afectacion", "");

    formData.append("agr_div", this.filtros.divi_padre || '');
    formData.append("Div_FT", this.filtros.divi_hija || '');

    formData.append("br", String(this.unidad_selecionada_brigadas_filtradas));

    formData.append("ut", String(this.datos_batallones));

    this.departamentos_filtrado.sort()
    formData.append("dpto", String(this.departamentos_filtrado));
    this.datos_municipios.sort()
    formData.append("mpio", String(this.datos_municipios));
    formData.append("filtro", '');
    formData.append("com_metas_narcotrafico", '');

    formData.append("spoa", '');
    formData.append("delco_cap", '');

    formData.append("acam_enemigo", String(this.datos_estructuras));
    formData.append("acam_estructura", String(this.datos_bloque));
    formData.append("ene_estructura", String(this.datos_suboestructura));

    formData.append("enemigo", String(this.datos_amenaza));
    formData.append("op_mayores", this.filtros.op_mayores || '');
    formData.append("apoyo_unidad", String(this.apoyoSeleccionado));

    formData.append("afectaciones", '');
    formData.append("estrategia", '');
    formData.append("tipo_operacion", '');

    formData.append("gaulas", '');

    formData.append("coordinadas", '');
    formData.append("conjuntas", '');
    formData.append("tipo_afectaciones", '');

    formData.append("tipo_titulo", "LOGO EJC");
    formData.append("documento", '');
    formData.append("datos_resultados", String(this.datos_resultados));

    formData.append("cdte", '');
    formData.append("hechos", '');


    const url = this.urlMineria + '/filtrar_pdf';
    this.loading = true;

    this.http.post<any>(url, formData).subscribe({
      next: (result: HttpResponse<any>) => {
        this.conecion(result);
        const espiner = document.getElementById('espiner');
        espiner?.classList.remove('lds-spinner');
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error al generar PDF:', err);
        this.loading = false;
      },
    });
  }
  marcarCamposComoTocados() {
    const campos = document.querySelectorAll('input[required], select[required]');
    campos.forEach((campo: any) => campo.classList.add('ng-touched'));
  }

  conecion(x: {}) {


    Object.entries(x).forEach(([key, value]) => {
      var dato = value
      var key = key


      if (key === "nombre") {
        this.nombre = String(dato);

      }

      if (key === "direccion") {
        this.link = String(dato);

      }

    });
    const a_href = document.createElement('a')

    a_href.href = this.link
    a_href.download = this.nombre
    // console.log("http://172.22.2.36:5198" +this.link)


    a_href.click()
    // a_href.target = "black"
    this.loading = false;
    console.log(this.link)
    console.log(this.nombre)

  }

}
