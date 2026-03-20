import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor() { }
  id_user:number
  foto:string
  nombre:string
  user_name:string
  roll:string

  nivel:string
  unidad:string
  ver:string
  selecionar:string
  insertar:string
  actualizar:string
  eliminar:string
  dependencia:string

  resultados: boolean
  eventos: string
  usuarios: string
  chat: string
  conf_narcotrafico: string
  operaciones: string
  personal: string
  orden: string
  afectaciones_fuera_combate: string

  boletin_coe: string
  boletin_cuadros_coe: string
  boletin_res_div: string
  cartilla_presidencial_larga: string
  cartilla_presidencial_corta: string
  boletin_diseo: string
  boletin_diseo_semanal: string
  comando_general: string
  Estadistica_resultados: string
  com_resultados_reducido: string
  narcotrafico: string
  narcotrafico_metas:string
  docna_semanal: string
  artemisa: string
  artemisa_comparativo: string
  contrabando: string
  contrabando_comparativo: string
  mineria: string
  mineria_comparativo: string
  comparativo_enemigo: string
  comparativo_mapa:string
  comparativo_resultados: string
  afectacion_a_la_amenaza: string
  afectacion_comparativa_p_t: string
  lis_afectaciones: string
  afectaciones_mapa: string
  afectaciones_cuadros: string
  regiones: string
  resaltantes: string
  reslatantes_divisiones: string
  bullets: string
  boltin_dirop: string
  estadistica_eventos: string
  informe_eventos: string
  datos:string
  cambio_contrasenia:string
  alerta:string
  
  movimientos:string
  inventarios:string

  boletin_mapa_comparativa :string
  excel_ut:string

  excel_amenaza:string
  doc: string
  resaltantes_boletin:string
  resaltantes_mapa:string
  resultados_excel_tipo_operaciones:string
  archivo_spoa:string
  mapa_division_dinamico:string   
  
  aetcr :string  
  ingreso_aetcr :string  
  listado_aetcr :string  
  alerta_aetcr :string  
  plazos :string  

  asignacion_plazo:string
  reasignacion_plazo:string
  validacion_plazo:string
  creacion_plazo:string
  cumplimiento_plazo:string

  medallas:string
  excel_anios:string
  seguimineto_plazos_respueta:string
  configuracion_especial_res:string

  insitop :string
  ingreso_insitop :string
  reporte_insitop :string
  dicte:string
  dicte_pasos_fronterizos:string

  com_div_mapa:string
  comp_div_mapa_bal:string
  eventos_relevantes:string
  archivo_plano_excel:string
  res_lineas_estrategicas:string
  res_linea_obj_4:string
  linea_estrategica_narcotrafico:string
  ayuda_comparativa_consejos:string
  registro_Q5:string
  obj_1:string
  obj_2:string
  obj_3:string
  obj_4:string
  inf_permisos(dato:String){
    this.id_user = parseInt(dato[0])
    this.foto = dato[4]
    this.nombre = dato[1]
    this.user_name = dato[2]
    this.roll = dato[5]

    this.nivel = dato[6]
    this.unidad = dato[7]
    this.ver = dato[8]
    this.selecionar = dato[9]
    this.insertar = dato[10]
    this.actualizar = dato[11]
    this.eliminar = dato[12]

    this.resultados = Boolean(dato[13])
    this.eventos =dato[14]
    this.usuarios =dato[15]
    this.chat =dato[16]
    this.conf_narcotrafico =dato[17]
    this.operaciones =dato[18]
    this.personal =dato[19]
    this.orden =dato[20]
    this.afectaciones_fuera_combate =dato[21]

    this.boletin_coe = dato[22]
    this.boletin_cuadros_coe = dato[23]
    this.boletin_res_div = dato[24]
    this.cartilla_presidencial_larga = dato[25]
    this.cartilla_presidencial_corta = dato[26]
    this.boletin_diseo = dato[27]
    this.boletin_diseo_semanal = dato[28]
    this.comando_general = dato[29]
    this.Estadistica_resultados= dato[30]
    this.com_resultados_reducido= dato[31]
    this.narcotrafico= dato[32]
    this.artemisa= dato[33]
    this.artemisa_comparativo= dato[34]
    this.contrabando= dato[35]
    this.contrabando_comparativo= dato[36]
    this.mineria= dato[37]
    this.mineria_comparativo= dato[38]
    this.comparativo_enemigo = dato[39]
    this.comparativo_mapa = dato[40]
    this.comparativo_resultados = dato[41]
    this.afectacion_a_la_amenaza = dato[42]
    this.afectacion_comparativa_p_t = dato[43]
    this.lis_afectaciones = dato[44]
    this.afectaciones_mapa = dato[45]
    this.afectaciones_cuadros = dato[46]
    this.regiones = dato[47]
    this.resaltantes = dato[48]
    this.reslatantes_divisiones= dato[49]
    this.bullets= dato[50]
    this.boltin_dirop= dato[51]
    this.estadistica_eventos= dato[52]
    this.informe_eventos= dato[53]
    this.dependencia = dato[54]
    this.datos = dato[55]
    this.cambio_contrasenia = dato[56]
    this.alerta = dato[57]
    this.movimientos = dato[58]

    this.inventarios = dato[59]

    this.boletin_mapa_comparativa = dato[60]
    this.doc = dato[61]
    this.narcotrafico_metas =dato[62]
    this.docna_semanal=dato[63]
    this.resaltantes_boletin =dato[64]
    this.excel_ut = dato[65]

    this.excel_amenaza = dato[66]
    this.resaltantes_mapa = dato[67]
    this.resultados_excel_tipo_operaciones = dato[68]
    this.archivo_spoa =dato[69]
    this.mapa_division_dinamico =dato[70]

    this.aetcr =dato[71]
    this.ingreso_aetcr =dato[72]
    this.listado_aetcr =dato[73]
    this.alerta_aetcr =dato[74]
    this.plazos =dato[75]

    this.asignacion_plazo = dato[76]
    this.reasignacion_plazo = dato[77]
    this.validacion_plazo = dato[78]
    this.creacion_plazo = dato[79]
    this.cumplimiento_plazo = dato[80]
    this.medallas = dato[81]
    this.excel_anios = dato[82]
    this.seguimineto_plazos_respueta = dato[83]

    this.insitop = dato[84]
    this.ingreso_insitop = dato[85]
    this.reporte_insitop = dato[86]

    this.dicte = dato[87]
    this.dicte_pasos_fronterizos = dato[88]

    this.com_div_mapa = dato[89]
    this.comp_div_mapa_bal = dato[90]
    this.eventos_relevantes = dato[91]
    this.archivo_plano_excel = dato[92]
    this.res_lineas_estrategicas = dato[93]
    this.configuracion_especial_res  = dato[94]
    this.res_linea_obj_4  = dato[95]
    this.linea_estrategica_narcotrafico  = dato[96]
    this.ayuda_comparativa_consejos  = dato[97]
    this.registro_Q5 = dato[98]
    this.obj_1 =  dato[99]
    this.obj_2 =  dato[100]
    this.obj_3 =  dato[101]
    this.obj_4 =  dato[102]
  }

  id_coordinador:number
  grd_coordinador:string
  nombre_coordinador:string
  cargo_coordinador:string
  sigla_coordinador:string
  nombre_unidad_coordinador:string
  tel_coordinador:string
  editar_coordinadores(dato:String){
    this.id_coordinador = parseInt(dato[0])
    this.grd_coordinador = dato[1]
    this.nombre_coordinador = dato[2]
    this.cargo_coordinador = dato[3]
    this.sigla_coordinador = dato[4]
    this.nombre_unidad_coordinador = dato[5]
    this.tel_coordinador = dato[6]
  }

  id_personal:number
 
  grd: string
  apellidos: string
  nombres: string
  cedula: string
  fecha_cumpleaños: string
  
  tel_principal: string
  
  correo_ejc: string
  correo_civil: string

  departamento : string
	municipio : string
	barrio : string
	direcion_principal : string

  departamento_fuera : string
	municipio_fuera : string
	barrio_fuera : string
	direcion_principal_fuera : string

  telefono_alterno: string
  nombre_contacto : string
	parentesco : string

  fecha_unidad :  string
	cargo : string
	fecha_cargo : string
  foto_user_name: string





  persona_dirop(dato:String){

    this.id_personal = parseInt(dato[0])

    this.grd = dato[1]
    this.apellidos = dato[2]
    this.nombres = dato[3]
    this.cedula = dato[4]
    this.fecha_cumpleaños = dato[5]
    
    this.tel_principal = dato[6]
    
    this.correo_ejc = dato[7]
    this.correo_civil = dato[8]
  
    this.departamento  = dato[9]
    this.municipio  = dato[10]
    this.barrio  = dato[11]
    this.direcion_principal  = dato[12]
  
    this.departamento_fuera  = dato[13]
    this.municipio_fuera  = dato[14]
    this.barrio_fuera  = dato[15]
    this.direcion_principal_fuera  = dato[16]
  
    this.telefono_alterno = dato[17]
    this.nombre_contacto  = dato[18]
    this.parentesco  = dato[19]
 
  
  
    this.fecha_unidad = dato[20]
    this.cargo  = dato[21]
    this.fecha_cargo  = dato[22]
    this.foto_user_name = dato[23]



    return this.id_personal
  }
  id_cargo_personal:number
  cargos_personal(dato:String){

    this.id_cargo_personal = parseInt(dato[0])

    return this.id_cargo_personal
  }


  id_inventarios_unidad:number
  fecha_asignacion: string
  director: string
  director_cargo: string
  seccion: string
  seccion_cargo: string
  responsable: string
  responsable_cargo: string
  foto_inventario: string
  documento: string



  inventarios_unidad(dato:String){

    this.id_inventarios_unidad = parseInt(dato[0])
    this.fecha_asignacion = dato[1]
    this.director = dato[2]
    this.director_cargo = dato[3]
    this.seccion = dato[4]
    this.seccion_cargo = dato[5]
    this.responsable = dato[6]
    this.responsable_cargo = dato[7]
    this.foto_inventario = dato[8]
    this.documento = dato[9]


    return this.id_inventarios_unidad
  }
  
}
