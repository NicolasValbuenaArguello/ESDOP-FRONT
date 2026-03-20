import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';

@Component({
  selector: 'app-permisos-user',
  templateUrl: './permisos-user.component.html',
  styleUrls: ['./permisos-user.component.css']
})
export class PermisosUserComponent {
  constructor(private permisos: PermisosService, private api_serve: ServiceConecionService, private router: Router, private informacion: InfEventoService) {
   }
  formData = new FormData();
  inf_g: boolean = false
  inf_a: boolean = false
  inf_c_g: string = "datos"
  view: string

  valicaion_array: string[] = []
  validacion: boolean = false

  img = "http://172.22.2.36:5198" + this.permisos.foto
  documento = "http://172.22.2.36:5198" + this.permisos.doc

  foto = this.permisos.foto
  foto_ruta = this.permisos.foto

  acta_reserva_ruta = this.permisos.doc
  acta_reserva_2  = this.permisos.doc

  id_user = this.permisos.id_user
  nombre = this.permisos.nombre
  user_name = this.permisos.user_name
  roll = this.permisos.roll
  dependencia = this.permisos.dependencia

  datos = this.permisos.datos
  cambio_contrasenia = this.permisos.cambio_contrasenia
  alerta = this.permisos.alerta
  
  movimientos = this.permisos.movimientos
  inventarios = this.permisos.inventarios

  nivel = this.permisos.nivel
  unidad = this.permisos.unidad
  ver = this.permisos.ver
  selecionar = this.permisos.selecionar
  insertar = this.permisos.insertar
  actualizar = this.permisos.actualizar
  eliminar = this.permisos.eliminar

  resultados = this.permisos.resultados
  resaltantes_boletin  = this.permisos.resaltantes_boletin

  eventos = this.permisos.eventos
  usuarios = this.permisos.usuarios
  chat = this.permisos.chat
  conf_narcotrafico = this.permisos.conf_narcotrafico
  operaciones = this.permisos.operaciones
  personal = this.permisos.personal
  orden = this.permisos.orden
  afectaciones_fuera_combate = this.permisos.afectaciones_fuera_combate


  boletin_coe = this.permisos.boletin_coe
  boletin_cuadros_coe = this.permisos.boletin_cuadros_coe
  boletin_res_div = this.permisos.boletin_res_div
  cartilla_presidencial_larga = this.permisos.cartilla_presidencial_larga
  cartilla_presidencial_corta = this.permisos.cartilla_presidencial_corta
  boletin_diseo = this.permisos.boletin_diseo
  boletin_diseo_semanal = this.permisos.boletin_diseo_semanal
  comando_general = this.permisos.comando_general
  Estadistica_resultados = this.permisos.Estadistica_resultados
  com_resultados_reducido = this.permisos.com_resultados_reducido
  narcotrafico = this.permisos.narcotrafico
  narcotrafico_metas = this.permisos.narcotrafico_metas
  docna_semanal = this.permisos.docna_semanal
  
  artemisa = this.permisos.artemisa
  artemisa_comparativo = this.permisos.artemisa_comparativo
  contrabando = this.permisos.contrabando
  contrabando_comparativo = this.permisos.contrabando_comparativo
  mineria = this.permisos.mineria
  mineria_comparativo = this.permisos.mineria_comparativo
  comparativo_enemigo = this.permisos.comparativo_enemigo
  comparativo_mapa = this.permisos.comparativo_mapa
  comparativo_resultados = this.permisos.comparativo_resultados
  afectacion_a_la_amenaza = this.permisos.afectacion_a_la_amenaza
  afectacion_comparativa_p_t = this.permisos.afectacion_comparativa_p_t
  lis_afectaciones = this.permisos.lis_afectaciones
  afectaciones_mapa = this.permisos.afectaciones_mapa
  afectaciones_cuadros = this.permisos.afectaciones_cuadros
  regiones = this.permisos.regiones
  resaltantes = this.permisos.resaltantes
  reslatantes_divisiones = this.permisos.reslatantes_divisiones
  bullets = this.permisos.bullets
  boltin_dirop = this.permisos.boltin_dirop
  estadistica_eventos = this.permisos.estadistica_eventos
  informe_eventos = this.permisos.informe_eventos

  boletin_mapa_comparativa = this.permisos.boletin_mapa_comparativa
  excel_ut = this.permisos.excel_ut

  excel_amenaza = this.permisos.excel_amenaza

  resaltantes_mapa = this.permisos.resaltantes_mapa
  resultados_excel_tipo_operaciones = this.permisos.resultados_excel_tipo_operaciones

  archivo_spoa = this.permisos.archivo_spoa
  mapa_division_dinamico = this.permisos.mapa_division_dinamico


  aetcr = this.permisos.aetcr
  ingreso_aetcr = this.permisos.ingreso_aetcr
  listado_aetcr = this.permisos.listado_aetcr
  alerta_aetcr = this.permisos.alerta_aetcr
  plazos = this.permisos.plazos

  asignacion_plazo = this.permisos.asignacion_plazo
  reasignacion_plazo = this.permisos.reasignacion_plazo
  validacion_plazo = this.permisos.validacion_plazo
  creacion_plazo = this.permisos.creacion_plazo
  cumplimiento_plazo = this.permisos.cumplimiento_plazo
  medallas = this.permisos.medallas

  excel_anios = this.permisos.excel_anios

  insitop = this.permisos.insitop
  ingreso_insitop = this.permisos.ingreso_insitop
  reporte_insitop = this.permisos.reporte_insitop

  dicte = this.permisos.dicte
  dicte_pasos_fronterizos = this.permisos.dicte_pasos_fronterizos

  com_div_mapa= this.permisos.com_div_mapa
  comp_div_mapa_bal= this.permisos.comp_div_mapa_bal

  eventos_relevantes= this.permisos.eventos_relevantes

  archivo_plano_excel = this.permisos.archivo_plano_excel
  res_lineas_estrategicas = this.permisos.res_lineas_estrategicas
  
  seguimineto_plazos_respueta = this.permisos.seguimineto_plazos_respueta
  configuracion_especial_res = this.permisos.configuracion_especial_res
  res_linea_obj_4  = this.permisos.res_linea_obj_4
  linea_estrategica_narcotrafico= this.permisos.linea_estrategica_narcotrafico
  ayuda_comparativa_consejos = this.permisos.ayuda_comparativa_consejos

  registro_Q5 = this.permisos.registro_Q5

  obj_1  = this.permisos.obj_1
  obj_2  = this.permisos.obj_2
  obj_3  = this.permisos.obj_3
  obj_4  = this.permisos.obj_4


  inf_r: boolean = false
  inf_c_r: string = "datos "
  server:string 
  cargar_foto(){
    var foto_user =  document.getElementById("foto_user") as HTMLInputElement 
    foto_user.click()
  }
  leer_foto(event: Event){
    let foto_user =  document.getElementById("foto_user")  as HTMLInputElement
     var file = foto_user.files![0];
    //Creamos la url
    var objectURL = URL.createObjectURL(file)
    this.img = objectURL

  }

  cargar_for_data_check(nombre: string, valor: boolean) {

    if (valor) {
      this.formData.append(nombre, "OK")
    } else {
      this.formData.append(nombre, "---")
    }

  }
  valicacion_array_funcion(valicaion_array: string[]) {

    for (let index in valicaion_array) {
      if (valicaion_array[index] === "false") {
        return false
      }
    }
    return true
  }
  validar_informacion(infor: string, nombre: string) {
    const elemento = document.getElementById(nombre) as HTMLElement
    if (!infor || infor === "" || infor === "---") {

      elemento!.style.cssText = "background-color: darkred; color: white;"

      this.valicaion_array.push("false")
    } else {

      elemento!.style.cssText = "background-color: darkgreen; color: white"
      this.formData.append(nombre, infor);

      this.valicaion_array.push("true")

    }

  }

  llenar_documentos(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
      this.formData.append("foto_2", "---");
    } else {
      this.formData.append(nombre, "---");
      this.formData.append("foto_2", this.foto_ruta);
    }
  }
  llenar_documentos_acta(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
      this.formData.append("acta_reserva_2", "---");
    } else {
      this.formData.append(nombre, "---");
      this.formData.append("acta_reserva_2", this.acta_reserva_ruta);
    }
  }

  cargar_acta_reserva() {

    const radiograma_unidad = document.getElementById("acta_reserva")
    radiograma_unidad?.click()
  }
  leer_acta_reserva(event: Event) {
    const acta_reserva = document.getElementById("acta_reserva") as HTMLInputElement
    let acta_reserva_name = acta_reserva.files![0].name
    this.inf_r = true
    this.inf_c_r = acta_reserva_name
  }
  ver_documento(){
    var view_dumentos =  document.getElementById("view_dumentos")
    view_dumentos?.classList.toggle("documento_oculto")
    this.server = this.documento  
    this.informacion.ver_documento_view()
    
    // this.router.navigate(["/ver_document"])
  }
  editar(inf_usurio: NgForm) {

    const acta_reserva = document.getElementById("acta_reserva") as HTMLInputElement
    let acta_reserva_file = acta_reserva.files![0]
    this.llenar_documentos_acta("acta_reserva_file", acta_reserva_file)

    const foto_user = document.getElementById("foto_user") as HTMLInputElement
    let foto_user_name = foto_user.files![0]
    this.llenar_documentos("foto", foto_user_name)

    this.formData.append("id_user", String(this.id_user));
    this.formData.append("nombre", String(this.nombre));
    this.formData.append("usuario", String(this.user_name));

    const roll = inf_usurio.value.roll
    const tipo_unidad = inf_usurio.value.tipo_unidad
    const unidad = inf_usurio.value.unidad

    this.validar_informacion(roll, "roll")
    this.validar_informacion(tipo_unidad, "tipo_unidad")
    this.validar_informacion(unidad, "unidad")
    this.formData.append("foto_ruta", this.foto_ruta);

    this.formData.append("acta_reserva_ruta", this.acta_reserva_ruta);

    const view = inf_usurio.value.view
    const select = inf_usurio.value.select
    const insert = inf_usurio.value.insert
    const update = inf_usurio.value.update
    const deletes = inf_usurio.value.delete
    const datos = inf_usurio.value.datos

    const resultados = inf_usurio.value.resultados
    const resaltantes_boletin = inf_usurio.value.resaltantes_boletin

    
    const eventos = inf_usurio.value.eventos
    const usuarios = inf_usurio.value.usuarios
    const chat = inf_usurio.value.chat
    const conf_narcotrafico = inf_usurio.value.conf_narcotrafico
    const operaciones = inf_usurio.value.operaciones
    const personal = inf_usurio.value.personal
    const orden = inf_usurio.value.orden
    const afectaciones_fuera_combate = inf_usurio.value.afectaciones_fuera_comabte
    const cambio_contrasenia = inf_usurio.value.cambio_contrasenia
    const alerta = inf_usurio.value.alerta

    const movimientos = inf_usurio.value.movimientos

    const inventarios = inf_usurio.value.inventarios


    const boletin_coe = inf_usurio.value.boletin_coe
    const boletin_cuadros_coe = inf_usurio.value.boletin_cuadros_coe
    const boletin_res_div = inf_usurio.value.boletin_res_div
    const cartilla_presidencial_larga = inf_usurio.value.cartilla_presidencial_larga
    const cartilla_presidencial_corta = inf_usurio.value.cartilla_presidencial_corta
    const boletin_diseo = inf_usurio.value.boletin_diseo
    const boletin_diseo_semanal = inf_usurio.value.boletin_diseo_semanal
    const comando_general = inf_usurio.value.comando_general
    const Estadistica_resultados = inf_usurio.value.Estadistica_resultados
    const com_resultados_reducido = inf_usurio.value.com_resultados_reducido
    const narcotrafico = inf_usurio.value.narcotrafico
    const narcotrafico_metas = inf_usurio.value.narcotrafico_metas
    const docna_semanal = inf_usurio.value.docna_semanal
    
    const artemisa = inf_usurio.value.artemisa
    const artemisa_comparativo = inf_usurio.value.artemisa_comparativo
    const contrabando = inf_usurio.value.contrabando
    const contrabando_comparativo = inf_usurio.value.contrabando_comparativo
    const mineria = inf_usurio.value.mineria
    const mineria_comparativo = inf_usurio.value.mineria_comparativo
    const comparativo_enemigo = inf_usurio.value.comparativo_enemigo
    const comparativo_mapa = inf_usurio.value.comparativo_mapa
    const comparativo_resultados = inf_usurio.value.comparativo_resultados
    const afectacion_a_la_amenaza = inf_usurio.value.afectacion_a_la_amenaza
    const afectacion_comparativa_p_t = inf_usurio.value.afectacion_comparativa_p_t
    const lis_afectaciones = inf_usurio.value.lis_afectaciones
    const afectaciones_mapa = inf_usurio.value.afectaciones_mapa
    const afectaciones_cuadros = inf_usurio.value.afectaciones_cuadros
    const regiones = inf_usurio.value.regiones
    const resaltantes = inf_usurio.value.resaltantes
    const reslatantes_divisiones = inf_usurio.value.reslatantes_divisiones
    const bullets = inf_usurio.value.bullets
    const boltin_dirop = inf_usurio.value.boltin_dirop
    const estadistica_eventos = inf_usurio.value.estadistica_eventos
    const informe_eventos = inf_usurio.value.informe_eventos
    const boletin_mapa_comparativa = inf_usurio.value.boletin_mapa_comparativa
    const excel_ut = inf_usurio.value.excel_ut
    const excel_amenaza = inf_usurio.value.excel_amenaza
    const  resaltantes_mapa = inf_usurio.value.resaltantes_mapa
    const  resultados_excel_tipo_operaciones = inf_usurio.value.resultados_excel_tipo_operaciones

    const  archivo_spoa = inf_usurio.value.archivo_spoa
    const  mapa_division_dinamico = inf_usurio.value.mapa_division_dinamico

    const  aetcr = inf_usurio.value.aetcr
    const  ingreso_aetcr = inf_usurio.value.ingreso_aetcr
    const  listado_aetcr = inf_usurio.value.listado_aetcr
    const  alerta_aetcr = inf_usurio.value.alerta_aetcr
    const  plazos = inf_usurio.value.plazos
 

    const asignacion_plazo = inf_usurio.value.asignacion_plazo
    const reasignacion_plazo = inf_usurio.value.reasignacion_plazo
    const validacion_plazo = inf_usurio.value.validacion_plazo
    const creacion_plazo = inf_usurio.value.creacion_plazo
    const cumplimiento_plazo = inf_usurio.value.cumplimiento_plazo
    const medallas = inf_usurio.value.medallas

    const excel_anios = inf_usurio.value.medallas
    const seguimineto_plazos_respueta = inf_usurio.value.seguimineto_plazos_respueta

    const insitop_per = inf_usurio.value.insitop_per
    const cargue_insitop = inf_usurio.value.cargue_insitop
    const estadistica_insitop = inf_usurio.value.estadistica_insitop

    
    const dicte = inf_usurio.value.dicte
    const dicte_pasos_fronterizos = inf_usurio.value.dicte_pasos_fronterizos

    const com_div_mapa = inf_usurio.value.com_div_mapa
    const comp_div_mapa_bal = inf_usurio.value.comp_div_mapa_bal
    const eventos_relevantes = inf_usurio.value.eventos_relevantes

    const archivo_plano_excel = inf_usurio.value.archivo_plano_excel
    const res_lineas_estrategicas = inf_usurio.value.res_lineas_estrategicas
    const configuracion_especial_res = inf_usurio.value.configuracion_especial_res
    const res_linea_obj_4 = inf_usurio.value.res_linea_obj_4
    const linea_estrategica_narcotrafico   = inf_usurio.value.linea_estrategica_narcotrafico
    const ayuda_comparativa_consejos   = inf_usurio.value.ayuda_comparativa_consejos
    
    const registro_Q5 = inf_usurio.value.registro_Q5

    const obj_1 = inf_usurio.value.obj_1
    const obj_2 = inf_usurio.value.obj_2
    const obj_3 = inf_usurio.value.obj_3
    const obj_4 = inf_usurio.value.obj_4

    this.cargar_for_data_check("view", view)
    this.cargar_for_data_check("select", select)
    this.cargar_for_data_check("insert", insert)
    this.cargar_for_data_check("update", update)
    this.cargar_for_data_check("deletes", deletes)
    this.cargar_for_data_check("datos", datos)

    this.cargar_for_data_check("resultados", resultados)
    this.cargar_for_data_check("resaltantes_boletin", resaltantes_boletin)
    this.cargar_for_data_check("eventos", eventos)
    this.cargar_for_data_check("usuarios", usuarios)
    this.cargar_for_data_check("chat", chat)
    this.cargar_for_data_check("conf_narcotrafico", conf_narcotrafico)
    this.cargar_for_data_check("operaciones", operaciones)
    this.cargar_for_data_check("personal", personal)
    this.cargar_for_data_check("orden", orden)
    this.cargar_for_data_check("afectaciones_fuera_comabte", afectaciones_fuera_combate)
    this.cargar_for_data_check("cambio_contrasenia", cambio_contrasenia)
    this.cargar_for_data_check("alerta", alerta)

    this.cargar_for_data_check("movimientos", movimientos)
    this.cargar_for_data_check("inventarios", inventarios)

    
    
    this.cargar_for_data_check("boletin_coe", boletin_coe)
    this.cargar_for_data_check("boletin_cuadros_coe", boletin_cuadros_coe)
    this.cargar_for_data_check("boletin_res_div", boletin_res_div)
    this.cargar_for_data_check("cartilla_presidencial_larga", cartilla_presidencial_larga)
    this.cargar_for_data_check("cartilla_presidencial_corta", cartilla_presidencial_corta)
    this.cargar_for_data_check("boletin_diseo", boletin_diseo)
    this.cargar_for_data_check("boletin_diseo_semanal", boletin_diseo_semanal)
    this.cargar_for_data_check("comando_general", comando_general)
    this.cargar_for_data_check("Estadistica_resultados", Estadistica_resultados)
    this.cargar_for_data_check("com_resultados_reducido", com_resultados_reducido)
    this.cargar_for_data_check("narcotrafico", narcotrafico)
    this.cargar_for_data_check("narcotrafico_metas", narcotrafico_metas)
    this.cargar_for_data_check("docna_semanal", docna_semanal)
    
    this.cargar_for_data_check("artemisa", artemisa)
    this.cargar_for_data_check("artemisa_comparativo", artemisa_comparativo)
    this.cargar_for_data_check("contrabando", contrabando)
    this.cargar_for_data_check("contrabando_comparativo", contrabando_comparativo)
    this.cargar_for_data_check("mineria", mineria)
    this.cargar_for_data_check("mineria_comparativo", mineria_comparativo)
    this.cargar_for_data_check("comparativo_enemigo", comparativo_enemigo)
    this.cargar_for_data_check("comparativo_mapa", comparativo_mapa)
    this.cargar_for_data_check("comparativo_resultados", comparativo_resultados)
    this.cargar_for_data_check("afectacion_a_la_amenaza", afectacion_a_la_amenaza)
    this.cargar_for_data_check("afectacion_comparativa_p_t", afectacion_comparativa_p_t)
    this.cargar_for_data_check("lis_afectaciones", lis_afectaciones)
    this.cargar_for_data_check("afectaciones_mapa", afectaciones_mapa)
    this.cargar_for_data_check("afectaciones_cuadros", afectaciones_cuadros)
    this.cargar_for_data_check("regiones", regiones)
    this.cargar_for_data_check("resaltantes", resaltantes)
    this.cargar_for_data_check("reslatantes_divisiones", reslatantes_divisiones)
    this.cargar_for_data_check("bullets", bullets)
    this.cargar_for_data_check("boltin_dirop", boltin_dirop)
    this.cargar_for_data_check("estadistica_eventos", estadistica_eventos)
    this.cargar_for_data_check("informe_eventos", informe_eventos)
    this.cargar_for_data_check("boletin_mapa_comparativa", boletin_mapa_comparativa)
    this.cargar_for_data_check("excel_ut", excel_ut)
    this.cargar_for_data_check("excel_amenaza", excel_amenaza)
    this.cargar_for_data_check("resaltantes_mapa", resaltantes_mapa)
    this.cargar_for_data_check("resultados_excel_tipo_operaciones", resultados_excel_tipo_operaciones)

    this.cargar_for_data_check("archivo_spoa", archivo_spoa)
    this.cargar_for_data_check("mapa_division_dinamico", mapa_division_dinamico)
    
    
    this.cargar_for_data_check("aetcr", aetcr)
    this.cargar_for_data_check("ingreso_aetcr", ingreso_aetcr)
    this.cargar_for_data_check("listado_aetcr", listado_aetcr)
    this.cargar_for_data_check("alerta_aetcr", alerta_aetcr)
    this.cargar_for_data_check("plazos", plazos)

    this.cargar_for_data_check("asignacion_plazo", asignacion_plazo)
    this.cargar_for_data_check("reasignacion_plazo", reasignacion_plazo)
    this.cargar_for_data_check("validacion_plazo", validacion_plazo)
    this.cargar_for_data_check("creacion_plazo", creacion_plazo)
    this.cargar_for_data_check("cumplimiento_plazo", cumplimiento_plazo)
    this.cargar_for_data_check("medallas", medallas)
    this.cargar_for_data_check("excel_anios", excel_anios)
    this.cargar_for_data_check("seguimineto_plazos_respueta", seguimineto_plazos_respueta)

    this.cargar_for_data_check("insitop_per", insitop_per)
    this.cargar_for_data_check("cargue_insitop", cargue_insitop)
    this.cargar_for_data_check("estadistica_insitop", estadistica_insitop)
    
    this.cargar_for_data_check("dicte", dicte)
    this.cargar_for_data_check("dicte_pasos_fronterizos", dicte_pasos_fronterizos)

    this.cargar_for_data_check("com_div_mapa", com_div_mapa)
    this.cargar_for_data_check("comp_div_mapa_bal", comp_div_mapa_bal)
    this.cargar_for_data_check("eventos_relevantes", eventos_relevantes)

    this.cargar_for_data_check("archivo_plano_excel", archivo_plano_excel)

    this.cargar_for_data_check("res_lineas_estrategicas", res_lineas_estrategicas)
    this.cargar_for_data_check("configuracion_especial_res", configuracion_especial_res)
    this.cargar_for_data_check("res_linea_obj_4", res_linea_obj_4)
    this.cargar_for_data_check("linea_estrategica_narcotrafico", linea_estrategica_narcotrafico)
    this.cargar_for_data_check("ayuda_comparativa_consejos", ayuda_comparativa_consejos)

    this.cargar_for_data_check("registro_Q5", registro_Q5)

    this.cargar_for_data_check("obj_1", obj_1)
    this.cargar_for_data_check("obj_2", obj_2)
    this.cargar_for_data_check("obj_3", obj_3)
    this.cargar_for_data_check("obj_4", obj_4)
    
    this.validacion = this.valicacion_array_funcion(this.valicaion_array)

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    if (!this.validacion) {
      this.inf_a = true

      this.inf_c_g = String("Debe de llenar toda la información")
      for (let i in this.valicaion_array) {
        this.valicaion_array.splice(parseInt(i))
      }
      var espiner = document.getElementById("espiner")
      espiner?.classList.remove("lds-spinner")

    } else {
      this.api_serve.conexion_api_enpoint(this.formData, ":5197", "/api/user").subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "respuesta") {
              this.inf_g = true
              this.inf_a = false

              this.inf_c_g = String(dato)

            }

            if (key === "usuarios") {
              sessionStorage.removeItem("usuarios")
              sessionStorage.setItem("usuarios", JSON.stringify(dato))
              this.router.navigate(["/listado_usuarios"])
            }

          });
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
        },
        error: (err: HttpErrorResponse) => {


          console.log(err)
          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String(err.status)
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
        }
      })

    }
  }
  eliminar_user() {
    this.formData.append("id_user", String(this.id_user));
    this.formData.append("foto", String(this.foto));
    this.formData.append("acta_reserva_ruta", this.acta_reserva_ruta);

    this.api_serve.conexion_api_enpoint(this.formData, ":5197", "/api/update").subscribe({
      next: (result: HttpResponse<any>) => {
        // console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key
          if (key === "respuesta") {
            this.inf_g = true
            this.inf_a = false

            this.inf_c_g = String(dato)

          }

          if (key === "usuarios") {
            sessionStorage.removeItem("usuarios")
            sessionStorage.setItem("usuarios", JSON.stringify(dato))
            this.router.navigate(["/listado_usuarios"])
          }

        });
        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.inf_a = true
        this.inf_g = false
        this.inf_c_g = String(err.status)
        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
      }
    })

  }


}


