import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { popup } from 'leaflet';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
interface DepartamentoConMunicipios {
  nombre: string;
  municipios: string[];
}

@Component({
  selector: 'app-estadistica-pdf',
  templateUrl: './estadistica-pdf.component.html',
  styleUrls: ['./estadistica-pdf.component.css'],

})
export class EstadisticaPdfComponent implements OnInit {
  departamentos: DepartamentoConMunicipios[] = [];
  boletin_coe: boolean
  boletin_cuadros_coe: boolean
  boletin_res_div: boolean
  cartilla_presidencial_larga: boolean
  cartilla_presidencial_corta: boolean
  boletin_diseo: boolean
  boletin_diseo_semanal: boolean
  comando_general: boolean
  Estadistica_resultados: boolean
  com_resultados_reducido: boolean
  narcotrafico: boolean
  narcotrafico_metas_per: boolean
  docna_semanal_per: boolean
  artemisa: boolean
  artemisa_comparativo: boolean
  contrabando: boolean
  contrabando_comparativo: boolean
  mineria: boolean
  mineria_comparativo: boolean
  comparativo_enemigo: boolean
  comparativo_mapa: boolean
  comparativo_resultados: boolean
  afectacion_a_la_amenaza: boolean
  afectacion_comparativa_p_t: boolean
  lis_afectaciones: boolean
  afectaciones_mapa: boolean
  afectaciones_cuadros: boolean
  regiones: boolean
  resaltantes: boolean
  reslatantes_divisiones: boolean
  bullets: boolean
  boltin_dirop: boolean
  boletin_mapa_comparativas: boolean
  comp_div_mapa_bal_per: boolean
  excel_ut_per: boolean

  archivo_plano_excel_per: boolean

  com_div_mapa_per: boolean

  excel_anios_permiso: boolean

  excel_amenaza_per: boolean
  resaltantes_mapa_per: boolean
  resultados_excel_tipo_operaciones_per: boolean

  archivo_spoa_per: boolean
  mapa_division_dinamico_per: boolean
  res_lineas_estrategicas_per: boolean
  configuracion_especial_res_per: boolean
  res_linea_obj_4_per: boolean
  linea_estrategica_narcotrafico_per: boolean
  ayuda_comparativa_consejos_per: boolean

  obj_1_per: boolean
  obj_2_per: boolean
  obj_3_per: boolean
  obj_4_per: boolean

  tipo_operaciones: string = "---"

  countryControl: any = new FormControl();
  subregiones: any[] = [];
  mostrarVentana: boolean = false;
  mostrarVentana_mejor: boolean = false
  afectacion: string = '';
  mensajeAfectacion: string = '';
  unidades_asc: string = 'desc';
  mensaje_asc: string = '<i class="bi bi-sort-numeric-up"></i> Las unidades se generarán de <strong>menor a mayor</strong> desempeño.';
  mensaje_asc_completa:string='<i class="bi bi-sort-numeric-up"></i>Solo se muestran las divisiones.'
  completa_und:string='solodiv'
  ventanaApoyosVisible = false;


  

  tipoOperacionSeleccionada: string = '';

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

  cerrarVentanaApoyos() {
    this.ventanaApoyosVisible = false;
    console.log('Apoyo disponible seleccionado:', this.apoyoSeleccionado);

  }


  getApoyosSeleccionados(): string[] {
    return Object.keys(this.apoyoSeleccionado).filter(key => this.apoyoSeleccionado[key]);
  }

  tieneApoyoSeleccionado(): boolean {
    return Object.values(this.apoyoSeleccionado).some(valor => valor);
  }
  constructor(private selector: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService) {
    this.boletin_coe = this.validar_estado(this.cookie.get("boletin_coe"))
    this.boletin_cuadros_coe = this.validar_estado(this.cookie.get("boletin_cuadros_coe"))
    this.boletin_res_div = this.validar_estado(this.cookie.get("boletin_res_div"))
    this.cartilla_presidencial_larga = this.validar_estado(this.cookie.get("cartilla_presidencial_larga"))
    this.cartilla_presidencial_corta = this.validar_estado(this.cookie.get("cartilla_presidencial_corta"))
    this.boletin_diseo = this.validar_estado(this.cookie.get("boletin_diseo"))
    this.boletin_diseo_semanal = this.validar_estado(this.cookie.get("boletin_diseo_semanal"))
    this.comando_general = this.validar_estado(this.cookie.get("comando_general"))
    this.Estadistica_resultados = this.validar_estado(this.cookie.get("Estadistica_resultados"))
    this.com_resultados_reducido = this.validar_estado(this.cookie.get("com_resultados_reducido"))
    this.narcotrafico = this.validar_estado(this.cookie.get("narcotrafico"))
    this.narcotrafico_metas_per = this.validar_estado(this.cookie.get("narcotrafico_metas_per"))
    this.docna_semanal_per = this.validar_estado(this.cookie.get("docna_semanal_per"))


    this.artemisa = this.validar_estado(this.cookie.get("artemisa"))
    this.artemisa_comparativo = this.validar_estado(this.cookie.get("artemisa_comparativo"))
    this.contrabando = this.validar_estado(this.cookie.get("contrabando"))
    this.contrabando_comparativo = this.validar_estado(this.cookie.get("contrabando_comparativo"))
    this.mineria = this.validar_estado(this.cookie.get("mineria"))
    this.mineria_comparativo = this.validar_estado(this.cookie.get("mineria_comparativo"))
    this.comparativo_enemigo = this.validar_estado(this.cookie.get("comparativo_enemigo"))
    this.comparativo_mapa = this.validar_estado(this.cookie.get("comparativo_mapa"))
    this.comparativo_resultados = this.validar_estado(this.cookie.get("comparativo_resultados"))
    this.afectacion_a_la_amenaza = this.validar_estado(this.cookie.get("afectacion_a_la_amenaza"))
    this.afectacion_comparativa_p_t = this.validar_estado(this.cookie.get("afectacion_comparativa_p_t"))
    this.lis_afectaciones = this.validar_estado(this.cookie.get("lis_afectaciones"))
    this.afectaciones_mapa = this.validar_estado(this.cookie.get("afectaciones_mapa"))
    this.afectaciones_cuadros = this.validar_estado(this.cookie.get("afectaciones_cuadros"))
    this.regiones = this.validar_estado(this.cookie.get("regiones"))
    this.resaltantes = this.validar_estado(this.cookie.get("resaltantes"))
    this.reslatantes_divisiones = this.validar_estado(this.cookie.get("reslatantes_divisiones"))
    this.bullets = this.validar_estado(this.cookie.get("bullets"))
    this.boltin_dirop = this.validar_estado(this.cookie.get("boltin_dirop"))
    this.boletin_mapa_comparativas = this.validar_estado(this.cookie.get("boletin_mapa_comparativa"))
    this.excel_ut_per = this.validar_estado(this.cookie.get("excel_ut_per"))

    this.excel_amenaza_per = this.validar_estado(this.cookie.get("excel_amenaza_per"))
    this.resultados_excel_tipo_operaciones_per = this.validar_estado(this.cookie.get("resultados_excel_tipo_operaciones_per"))

    this.resaltantes_mapa_per = this.validar_estado(this.cookie.get("resaltantes_mapa_per"))

    this.archivo_spoa_per = this.validar_estado(this.cookie.get("archivo_spoa_per"))
    this.mapa_division_dinamico_per = this.validar_estado(this.cookie.get("mapa_division_dinamico_per"))

    this.excel_anios_permiso = this.validar_estado(this.cookie.get("excel_anios_permiso"))

    this.com_div_mapa_per = this.validar_estado(this.cookie.get("com_div_mapa_per"))
    this.comp_div_mapa_bal_per = this.validar_estado(this.cookie.get("comp_div_mapa_bal_per"))
    this.archivo_plano_excel_per = this.validar_estado(this.cookie.get("archivo_plano_excel_per"))
    this.res_lineas_estrategicas_per = this.validar_estado(this.cookie.get("res_lineas_estrategicas_per"))

    this.configuracion_especial_res_per = this.validar_estado(this.cookie.get("archivo_plano_excel_per"))
    this.res_linea_obj_4_per = this.validar_estado(this.cookie.get("res_linea_obj_4_per"))
    this.linea_estrategica_narcotrafico_per = this.validar_estado(this.cookie.get("linea_estrategica_narcotrafico_per"))
    this.ayuda_comparativa_consejos_per = this.validar_estado(this.cookie.get("ayuda_comparativa_consejos_per"))

    this.obj_1_per = this.validar_estado(this.cookie.get("obj_1_per"))
    this.obj_2_per = this.validar_estado(this.cookie.get("obj_2_per"))
    this.obj_3_per = this.validar_estado(this.cookie.get("obj_3_per"))
    this.obj_4_per = this.validar_estado(this.cookie.get("obj_4_per"))

  }
  evaluarAfectacion() {
    if (this.afectacion === 'con') {
      this.mensajeAfectacion = 'Esta ayuda se va a generar **con afectaciones**.';
    } else if (this.afectacion === 'sin') {
      this.mensajeAfectacion = 'Esta ayuda se va a generar **sin afectaciones**.';
    } else {
      this.mensajeAfectacion = '';
    }
  }
ascendete(): void {
  const mensajes: Record<string, string> = {
    asc: `
      <i class="bi bi-sort-numeric-down-alt"></i>
      Las unidades se generarán de <strong>mayor a menor</strong> desempeño.
    `,
    desc: `
      <i class="bi bi-sort-numeric-up"></i>
      Las unidades se generarán de <strong>menor a mayor</strong> desempeño.
    `
  };

  this.mensaje_asc = mensajes[this.unidades_asc] || '';
}
completa(): void {

  const mensajes: Record<string, string> = {
    compl: `
      <i class="bi bi-sort-numeric-down-alt"></i>
      Se generan todas las unidades del Ejército.
    `,
    solodiv: `
      <i class="bi bi-sort-numeric-up"></i>
      Solo se muestran las divisiones.
    `
  };

  this.mensaje_asc_completa = mensajes[this.completa_und] ?? '';
}

  division = this.selector.duplicados()
  departamentos_filtrados = this.selector.departamentos_unicos()
  amenaza_select = this.selector.amenaza_select()
  op_mayores = this.selector.op_mayores_f()

  estrategia = this.selector.estrategia_f()
  tipo_operacion = this.selector.tipo_operacion_f()
  hechos = JSON.parse(sessionStorage.getItem("hechos")!)
  listados = this.selector.listados

  acam_enemigo = JSON.parse(sessionStorage.getItem("acam_enemigo")!)

  acam_estructura = JSON.parse(sessionStorage.getItem("acam_estructura")!)
  ene_estructura = JSON.parse(sessionStorage.getItem("ene_estructura")!)

  unidad_selecionada_div: string[] = []
  unidad_selecionada_brigada: string[] = []
  unidad_selecionada_batallones: string[] = []

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

  otro: string[] = this.selector.otro



  divi_padre: string = "---"
  divi_hija: string = "---"
  brigada: string = "---"
  batallon: string = "---"
  municipios: string = "---"

  departamento: string = "---"
  amenaza: string = "---"
  op_mayor: string = "---"

  listado_a: string = "---"
  estrategia_a: string = "---"

  aler_p_i: boolean = false
  aler_p_f: boolean = false
  aler_u_i: boolean = false
  aler_u_f: boolean = false

  aler_p_datos: boolean = false
  datos_municipios: string[] = []
  datos_resultados: string[] = []
  datos_amenaza: string[] = []
  datos_estructuras: string[] = []
  datos_bloque: string[] = []
  datos_suboestructura: string[] = []

  datos_batallones: string[] = []
  departamentos_filtrado: string[] = []

  alerta: string = ""

  apoyo: string = ""
  filtro: string = "unidad"
  delco_cap: string = "sin_delco"
  document_boletin: string = "boletin_coe"

  spoa: string = "sin_spoa"
  com_metas_narcotrafico: string = "com_metas_narcotrafico"
  fechal_primer_lapso_inicial: string = ""
  fechal_primer_lapso_final: string = ""
  fechal_anterior_inicia: string = ""
  fechal_anterior_final: string = ""
  link: string
  nombre: string
  url_api: string

  formData = new FormData();
  posicionInicial = { x: 0, y: 0 };
  desplazamiento = { x: 0, y: 0 };
  arrastrando = false;
  subregionSeleccionada: any = null;



  iniciarArrastre(event: MouseEvent) {
    const ventana = document.getElementById('ventana_dpto');
    if (!ventana) return;

    const rect = ventana.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const mover = (e: MouseEvent) => {
      ventana.style.left = `${e.clientX - offsetX}px`;
      ventana.style.top = `${e.clientY - offsetY}px`;
      ventana.style.right = 'auto';
      ventana.style.bottom = 'auto';
      ventana.style.transform = 'none'; // 👈 MUY IMPORTANTE
    };

    const soltar = () => {
      document.removeEventListener('mousemove', mover);
      document.removeEventListener('mouseup', soltar);
    };

    document.addEventListener('mousemove', mover);
    document.addEventListener('mouseup', soltar);
  }

  iniciarArrastreMpio(event: MouseEvent) {
    const ventana = document.getElementById('ventana_mpio');
    if (!ventana) return;

    const rect = ventana.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const mover = (e: MouseEvent) => {
      ventana.style.left = `${e.clientX - offsetX}px`;
      ventana.style.top = `${e.clientY - offsetY}px`;
      ventana.style.right = 'auto';
      ventana.style.bottom = 'auto';
      ventana.style.transform = 'none';
      ventana.style.position = 'fixed';
    };

    const soltar = () => {
      document.removeEventListener('mousemove', mover);
      document.removeEventListener('mouseup', soltar);
    };

    document.addEventListener('mousemove', mover);
    document.addEventListener('mouseup', soltar);
  }


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
  scroll(el: HTMLElement) {
    var elemento = document.getElementById("elemento")!
    elemento.classList.remove("titulo_filtro")
    var elemento_1 = document.getElementById("elemento_1")!
    elemento_1.classList.remove("titulo_filtro")
    var elemento_2 = document.getElementById("elemento_2")!
    elemento_2.classList.remove("titulo_filtro")
    var elemento_3 = document.getElementById("elemento_3")!
    elemento_3.classList.remove("titulo_filtro")
    var elemento_4 = document.getElementById("elemento_4")!
    elemento_4.classList.remove("titulo_filtro")
    var elemento_5 = document.getElementById("elemento_5")!
    elemento_5.classList.remove("titulo_filtro")
    var elemento_6 = document.getElementById("elemento_6")!
    elemento_6.classList.remove("titulo_filtro")
    var elemento_7 = document.getElementById("elemento_7")!
    elemento_7.classList.remove("titulo_filtro")
    var elemento_8 = document.getElementById("elemento_8")!
    elemento_8.classList.remove("titulo_filtro")
    var elemento_9 = document.getElementById("elemento_9")!
    elemento_9.classList.remove("titulo_filtro")
    var elemento_10 = document.getElementById("elemento_10")!
    elemento_10.classList.remove("titulo_filtro")
    var elemento_11 = document.getElementById("elemento_11")!
    elemento_11.classList.remove("titulo_filtro")
    var elemento_12 = document.getElementById("elemento_12")!
    elemento_12.classList.remove("titulo_filtro")
    el.scrollIntoView()
    el.classList.add("titulo_filtro")
    var menu_oculto = document.getElementById("menu_oculto")
    menu_oculto?.classList.toggle("menu_oculto_hide")
  }
  mostrar_dpto() {
    const mostrar_dpto = document.getElementById("mostrar_dpto")
    mostrar_dpto?.classList.toggle("oculto")
  }
  mostrar_mpio() {
    const mostrar_mpio = document.getElementById("mostrar_mpio")
    mostrar_mpio?.classList.toggle("oculto")
  }
  menu_oculto() {
    var menu_oculto = document.getElementById("menu_oculto")
    menu_oculto?.classList.toggle("menu_oculto_hide")
  }
  div_hija(evaluar: number, respuesta: number) {
    for (let i in this.unidad_selecionada_div) {
      this.unidad_selecionada_div.splice(parseInt(i))
    }
    this.unidad_selecionada_brigada = []
    this.unidad_selecionada_batallones = []

    this.unidad_selecionada_div = this.selector.unidades_filtradas(this.divi_padre, evaluar, respuesta)

  }
  brigadas(evaluar: number, respuesta: number) {

    for (let i in this.unidad_selecionada_brigada) {
      this.unidad_selecionada_brigada.splice(parseInt(i))
    }

    this.unidad_selecionada_batallones = []
    this.unidad_selecionada_brigada = this.selector.unidades_filtradas(this.divi_hija, evaluar, respuesta)

  }
  batallones(evaluar: number, respuesta: number, item: string, i: number) {
    const brigada = item
    var che_2 = document.getElementById(i + item)

    this.aler_p_datos = true
    // this.unidad_selecionada_brigadas_filtradas=[]
    this.unidad_selecionada_batallones = []
    if (!this.unidad_selecionada_brigadas_filtradas.includes(item)) {
      this.unidad_selecionada_brigadas_filtradas.push(item)
      che_2?.classList.toggle("che_1")

    } else {
      var indice = this.unidad_selecionada_brigadas_filtradas.indexOf(item); // obtenemos el indice
      this.unidad_selecionada_brigadas_filtradas = this.unidad_selecionada_brigadas_filtradas.filter(function (i) { return i !== item }); // filtramos

      che_2?.classList.toggle("che_1")

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
  departamentoos(evaluar: number, respuesta: number, item: string) {

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

  batallones_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)

    this.aler_p_datos = true


    if (!this.datos_batallones.includes(item)) {
      this.datos_batallones.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.datos_batallones.indexOf(item); // obtenemos el indice
      this.datos_batallones = this.datos_batallones.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    // console.log(this.datos_municipios)

  }
  estructura_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)

    this.aler_p_datos = true


    if (!this.datos_estructuras.includes(item)) {
      this.datos_estructuras.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.datos_estructuras.indexOf(item); // obtenemos el indice
      this.datos_estructuras = this.datos_estructuras.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    // console.log(this.datos_municipios)

  }
  bloque_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)

    this.aler_p_datos = true


    if (!this.datos_bloque.includes(item)) {
      this.datos_bloque.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.datos_bloque.indexOf(item); // obtenemos el indice
      this.datos_bloque = this.datos_bloque.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    // console.log(this.datos_municipios)

  }
  suboestructura_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)

    this.aler_p_datos = true


    if (!this.datos_suboestructura.includes(item)) {
      this.datos_suboestructura.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.datos_suboestructura.indexOf(item); // obtenemos el indice
      this.datos_suboestructura = this.datos_suboestructura.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    // console.log(this.datos_municipios)

  }
  enemigos_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)

    this.aler_p_datos = true


    if (!this.datos_amenaza.includes(item)) {
      this.datos_amenaza.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.datos_amenaza.indexOf(item); // obtenemos el indice
      this.datos_amenaza = this.datos_amenaza.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    // console.log(this.datos_municipios)

  }

  municipios_selecionados(item: string, i: number) {
    const municipios = item
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(i + item)

    this.aler_p_datos = true


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

  resultados_selecionados(item: string) {
    const municipios = item

    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)

    this.aler_p_datos = true


    if (!this.datos_resultados.includes(item)) {
      this.datos_resultados.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.datos_resultados.indexOf(item); // obtenemos el indice
      this.datos_resultados = this.datos_resultados.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    // console.log(this.datos_municipios)

  }
  resultados_oculto() {
    var resultados_oculto = document.getElementById("resultados_oculto")
    resultados_oculto?.classList.toggle("resultados_oculto")
  }
  ver_municipios() {
    var municipios_oculto = document.getElementById("municipios_oculto")
    municipios_oculto?.classList.toggle("municipios_oculto")
  }
  ver_amenaza() {

    var municipios_oculto = document.getElementById("ver_amenzaza")
    municipios_oculto?.classList.toggle("municipios_oculto")
  }
  ver_batallones() {
    var municipios_oculto = document.getElementById("ver_batallones")
    municipios_oculto?.classList.toggle("municipios_oculto")
  }
  ver_brigadas() {
    var ver_brigadas = document.getElementById("ver_brigadas")
    ver_brigadas?.classList.toggle("municipios_oculto")
  }
  validar_fecha_sola(fecha_1: string, fecha_2: string) {

    if (!fecha_1) {
      this.aler_p_i = true
      this.alerta = "debe selecionar una fecha"
      var dato_1 = false
    } else {
      this.aler_p_i = false
      var dato_1 = true
    }
    if (!fecha_2) {
      this.aler_p_f = true
      this.alerta = "debe selecionar una fecha"
      var dato_2 = false
    } else {
      this.aler_p_f = false
      var dato_2 = true
    }
    return [dato_1, dato_2]
  }
  validar_fecha_dos_fecha(fecha_1: string, fecha_2: string, fecha_3: string, fecha_4: string) {

    if (!fecha_1) {
      this.aler_p_i = true
      this.alerta = "debe selecionar una fecha"
      var dato_1 = false
    } else {
      this.aler_p_i = false
      var dato_1 = true
    }
    if (!fecha_2) {
      this.aler_p_f = true
      this.alerta = "debe selecionar una fecha"
      var dato_2 = false
    } else {
      this.aler_p_f = false
      var dato_2 = true
    }
    if (!fecha_3) {
      this.aler_u_i = true
      this.alerta = "debe selecionar una fecha"
      var dato_3 = false
    } else {
      this.aler_u_i = false
      var dato_3 = true
    }
    if (!fecha_4) {
      this.aler_u_f = true
      this.alerta = "debe selecionar una fecha"
      var dato_4 = false
    } else {
      this.aler_u_f = false
      var dato_4 = true
    }

    return [dato_1, dato_2, dato_3, dato_4]
  }
  validar_fechas(documento: string, url: string, fecha_1: string, fecha_2: string, fecha_3: string, fecha_4: string) {



    if (documento === "boletin_coe" || documento === "boletin_estadistica" || documento === "resultados_diario_divisiones" || documento === "boletin_comando_general" || documento === "boletin_estadistica_resultados" || documento === "artemisa" || documento === "boletin_estadistica_contrabando" || documento === "boletin_estadistica_mineria" || documento === "listado_afectaciones" || documento === "regiones_colombia" || documento === "resultados_resaltantes" || documento === "resultados_resaltantes_div" || documento === "excel_ut" || documento === "excel_amenaza" || documento === "docna_semanal" || documento === "narcotrafico_metas" || documento === "boletin_estadistica_narcotrafico" || documento === 'resultados_mapa' || documento === 'resultados_excel_tipo_operaciones' || documento === 'archivo_spoas_error' || documento === 'mapa_dinamico_divisiones' || documento === 'excel_anios_permiso' || documento === 'resultados_una_ayuda' || documento === "archivo_plano_excel" || documento === "resultados_c_power_point") {
      var confirmacion = this.validar_fecha_sola(fecha_1, fecha_2)
      if (confirmacion[0] && confirmacion[1]) {
        this.url_api = url
      } else {
        this.url_api = ""
      }
      return this.url_api
    } else {
      var confirmacion = this.validar_fecha_dos_fecha(fecha_1, fecha_2, fecha_3, fecha_4)
      if (confirmacion[0] && confirmacion[1] && confirmacion[2] && confirmacion[3]) {
        this.url_api = url
      } else {
        this.url_api = ""
      }
      return this.url_api
    }

  }
  conecion_api(form: NgForm) {

    const fechal_primer_lapso_inicial = form.value.fecha_inicio_p
    const fechal_primer_lapso_final = form.value.fecha_final_p
    const fechal_anterior_inicia = form.value.fecha_inicio_u
    const fechal_anterior_final = form.value.fecha_final_u

    const agr_div = form.value.divi_padre
    const Div_FT = form.value.divi_hija
    const br = form.value.brigada
    const dpto = form.value.departamento
    const filtro = form.value.filtro
    const delco_cap = form.value.delco_cap
    const spoa = form.value.spoa
    const op_mayores = form.value.op_mayor

    const afectaciones = form.value.listado_a
    const estrategia = form.value.estrategia
    const tipo_operacion = form.value.tipo_operacion
    const gaulas = form.value.gaulas

    const coordinadas = form.value.coordinadas
    const conjuntas = form.value.conjuntas
    const tipo_afectaciones = form.value.tipo_afectaciones

    const documneto_requerido = form.value.documento
    const cdte = form.value.cdte
    const hechos = form.value.hechos

    const com_metas_narcotrafico = form.value.com_metas_narcotrafico




    // console.log(this.cookie.get("permiso"))
    // var permiso = this.cookie.get("permiso")
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.formData.append("fullname", this.cookie.get("fullname"));

    this.formData.append("fecha_primer_lapso_inicial", fechal_primer_lapso_inicial);
    this.formData.append("fecha_ultimo_lapso_inicial", fechal_primer_lapso_final);
    this.formData.append("fecha_primer_lapso_final", fechal_anterior_inicia);
    this.formData.append("fecha_ultimo_lapso_final", fechal_anterior_final);
    this.formData.append("subregion", JSON.stringify(this.subregionSeleccionada!));
    this.formData.append("afectacion", this.afectacion);
    this.formData.append("unidades_asc", this.unidades_asc);
    this.formData.append("completa_und", this.completa_und);



    this.formData.append("agr_div", agr_div);
    this.formData.append("Div_FT", Div_FT);

    this.formData.append("br", String(this.unidad_selecionada_brigadas_filtradas));

    this.formData.append("ut", String(this.datos_batallones));

    this.departamentos_filtrado.sort()
    this.formData.append("dpto", String(this.departamentos_filtrado));
    this.datos_municipios.sort()
    this.formData.append("mpio", String(this.datos_municipios));
    this.formData.append("filtro", filtro);
    this.formData.append("com_metas_narcotrafico", com_metas_narcotrafico);

    this.formData.append("spoa", spoa);
    this.formData.append("delco_cap", delco_cap);

    this.formData.append("acam_enemigo", String(this.datos_estructuras));
    this.formData.append("acam_estructura", String(this.datos_bloque));
    this.formData.append("ene_estructura", String(this.datos_suboestructura));

    this.formData.append("enemigo", String(this.datos_amenaza));
    this.formData.append("op_mayores", op_mayores);
    this.formData.append("apoyo_unidad", String(this.apoyoSeleccionado));

    this.formData.append("afectaciones", afectaciones);
    this.formData.append("estrategia", estrategia);
    this.formData.append("tipo_operacion", tipo_operacion);

    this.formData.append("gaulas", gaulas);

    this.formData.append("coordinadas", coordinadas);
    this.formData.append("conjuntas", conjuntas);
    this.formData.append("tipo_afectaciones", tipo_afectaciones);

    this.formData.append("tipo_titulo", "LOGO EJC");
    this.formData.append("documento", documneto_requerido);
    this.formData.append("datos_resultados", String(this.datos_resultados));

    this.formData.append("cdte", cdte);
    this.formData.append("hechos", hechos);

    var value_url = this.api_serve.buscar_url(documneto_requerido)

    var valor = this.validar_fechas(documneto_requerido, value_url, fechal_primer_lapso_inicial, fechal_primer_lapso_final, fechal_anterior_inicia, fechal_anterior_final)
    if (valor) {
      // console.log(value_url)
      this.api_serve.conexion_api_enpoint(this.formData, value_url, "/").subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          this.conecion(result)
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          // this.inf_a = true
          // this.inf_g = false
          // this.inf_c_g = String(err.status)
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
        }
      })

      var espiner = document.getElementById("espiner")
      espiner?.classList.add("lds-spinner")

    }

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

    var espiner = document.getElementById("espiner")
    espiner?.classList.remove("lds-spinner")
  }

  validar_estado(dato: string) {

    var dato_r = false

    if (dato === "1") {
      dato_r = true
    } else {
      dato_r = false
    }
    return dato_r

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


}

