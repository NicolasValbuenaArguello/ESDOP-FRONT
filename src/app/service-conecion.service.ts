import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { Post } from './interfases/post';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceConecionService {

  constructor(private http:HttpClient) { }

url:string = "http://172.22.2.36:5199//user/me";
url_eliminar:string = "http://172.22.2.36:5152/datos";
url_cargar:string = "http://172.22.2.36:5030/api";
urlMineria:string = "http://172.22.2.36:5152/api";

private eventos_url:string = "http://172.22.2.36:5031/guardar";
private eventos_url_descargar:string = "http://172.22.2.36:5032/api";
private url_matirz:string = "http://172.22.2.36";
private enpoint :string = "/api"
private alertas_url:string = "http://172.22.2.36:5033/guardar";

private atques_dron_url:string = "http://172.22.2.36:5164/guardar";
private actulizar_dron_url:string = "http://172.22.2.36:5164/actualizar";


private alertas_eliminar_url:string = "http://172.22.2.36:5033/eliminar";
private alertas_editar_url:string = "http://172.22.2.36:5033/editar";



private planillas_url:string = "http://172.22.2.36:5034/planilla";
private mapa_alertas:string = "http://172.22.2.36:5034/mapa_alertas";
private mapa_alertas_fecha_url:string = "http://172.22.2.36:5034/mapa_alertas_fecha";
private mapa_alertas_division_url:string = "http://172.22.2.36:5034/mapa_alertas_division";


private ingreso_coordinador_url:string = "http://172.22.2.36:5035/guardar_coordinador";
private editar_coordinador_url:string = "http://172.22.2.36:5035/editar_coordinador";
private eliminar_coordinador_url:string = "http://172.22.2.36:5035/eliminar_coordinador";

//personal 
private ingreso_personal:string = "http://172.22.2.36:5036/guardar";
private update_personal:string = "http://172.22.2.36:5036/update";
private eliminar_personal:string = "http://172.22.2.36:5036/eliminar";

private personal_eliminar_cargo:string = "http://172.22.2.36:5036/eliminar_cargo";
private personal_select_cargo:string = "http://172.22.2.36:5036/select_cargo";
private personal_guardar_cargo:string = "http://172.22.2.36:5036/guardar_cargo";

private ingreso_inventarios:string = "http://172.22.2.36:5037/guardar_inventario";
private select_cargo_inventario:string = "http://172.22.2.36:5037/select_cargo_inventario";

private fuera_combate:string = "http://172.22.2.36:5038/buscar";

private eventos_relevantes_boletin_url:string = "http://172.22.2.36:5128/guardar";
private eventos_relevantes_boletin_descargar_url:string = "http://172.22.2.36:5128/descargar";

private buscar_alertas_url:string = "http://172.22.2.36:5034/buscar_alertas";

private aetcr_url:string = "http://172.22.2.36:5007/aetcr";
private listado_aectr:string = "http://172.22.2.36:5007/listado";
private info_aectr:string = "http://172.22.2.36:5007/info_aectr";
private aetcr_url_peloton:string = "http://172.22.2.36:5007/aetcr_url_peloton";
private mapa_aetcr_url:string = "http://172.22.2.36:5007/mapa_aetcr_url";
private plazos_url:string = "http://172.22.2.36:5008/plazos";
private asignacion_url:string = "http://172.22.2.36:5008/asignacion";
private plazos_asignados_url:string = "http://172.22.2.36:5008/plazos_asignados_url";
private plazos_asignados_url_seguimiento :string = "http://172.22.2.36:5008/plazos_asignados_url_seguimiento";
private reasignacion_url:string = "http://172.22.2.36:5008/reasignacion_url";

private eliminar_easignacion_url:string = "http://172.22.2.36:5008/eliminar_easignacion_url";
private cumplir_easignacion_url:string = "http://172.22.2.36:5008/cumplir_easignacion_url";
private creacion_plazo_url:string = "http://172.22.2.36:5008/creacion_plazo_url";
private reporte_pdf_respuesta_url:string = "http://172.22.2.36:5008/reporte_pdf_respuesta_url";
private reporte_pdf_respuesta_url_estadistica:string = "http://172.22.2.36:5008/reporte_pdf_respuesta_url_estadistica";
private reporte_pdf_respuesta_url_balance:string = "http://172.22.2.36:5008/reporte_pdf_respuesta_url_balance";
private cumplir_easignacion_url_respuesta:string = "http://172.22.2.36:5008/cumplir_easignacion_url_respuesta";
private actualizar_asunto_url:string = "http://172.22.2.36:5008/actualizar_asunto_url";




private creacion_proyecto_url:string = "http://172.22.2.36:5009/proyecto_guardar";
private listado_inicial_medallas_url:string = "http://172.22.2.36:5009/listado_inicial_medallas_url";
private creacion_medalla_url:string = "http://172.22.2.36:5009/creacion_medalla_url";
private listado_personal_medallas_url:string = "http://172.22.2.36:5009/listado_personal_medallas_url";
private conceptos_medallas_url:string = "http://172.22.2.36:5009/conceptos_medallas_url";
private eliminar_medalla_url:string = "http://172.22.2.36:5009/eliminar_medalla_url";
private registro_difab_medalla_url:string = "http://172.22.2.36:5009/registro_difab_medalla_url";
private registro_estado_proyecto_medalla_url:string = "http://172.22.2.36:5009/registro_estado_proyecto_medalla_url";
private registro_editar_informacion_url:string = "http://172.22.2.36:5009/registro_editar_informacion_url";
private conceptos_medallas_descargar_url:string = "http://172.22.2.36:5009/conceptos_medallas_descargar_url";


private cargar_inistop_url:string = "http://172.22.2.36:5010/cargar_inistop_url";
private reporte_inistop_url:string = "http://172.22.2.36:5010/reporte_inistop_url";
private reporte_inistop_url_pelotones:string = "http://172.22.2.36:5010/reporte_inistop_url_pelotones";

private listado_inistop_url:string = "http://172.22.2.36:5010/listado_inistop_url";
private grafico_listado_inistop_url:string = "http://172.22.2.36:5010/grafico_listado_inistop_url";
private grafico_estado_mayor_inistop_url:string = "http://172.22.2.36:5010/grafico_estado_mayor_inistop_url";
private grafico_estado_mayor_inistop_unidad_url:string = "http://172.22.2.36:5010/grafico_estado_mayor_inistop_unidad_url";
private grafico_unidades_listado_inistop_unidad_url:string = "http://172.22.2.36:5010/grafico_unidades_listado_inistop_unidad_url";
private reporte_inistop_pelotones_url:string = "http://172.22.2.36:5010/reporte_inistop_pelotones_url";
private cargar_inistop_url_unidades:string = "http://172.22.2.36:5010/cargar_inistop_url_unidades";
private cargar_inistop_url_calculo:string = "http://172.22.2.36:5010/cargar_inistop_url_calculo";
private cantidad_cdte_url:string = "http://172.22.2.36:5010/cantidad_cdte_url";
private cargar_inistop_leer_unidades :string = "http://172.22.2.36:5010/cargar_inistop_leer_unidades";


private url_cargar_inf_pasos_fronteras:string = "http://172.22.2.36:5011/url_cargar_inf_pasos_fronteras";
private url_ver_inf_pasos_fronteras:string = "http://172.22.2.36:5011/url_ver_inf_pasos_fronteras";
private url_ver_reporte_pasos_fronteras:string = "http://172.22.2.36:5011/url_ver_reporte_pasos_fronteras";
private url_actualizar_inf_pasos_fronteras:string = "http://172.22.2.36:5011/url_actualizar_inf_pasos_fronteras";
private url_ver_pasos_fronteras:string = "http://172.22.2.36:5011/url_ver_pasos_fronteras";
private url_ver_inf_pasos_fronteras_dash:string = "http://172.22.2.36:5011/url_ver_inf_pasos_fronteras_dash";




private url_cargar_eventos_relevante:string = "http://172.22.2.36:5012/url_cargar_eventos_relevante";
private url_ver_eventos_relevante:string = "http://172.22.2.36:5012/url_ver_eventos_relevante";
private url_cargar_bitacora_eventos_relevante:string = "http://172.22.2.36:5012/url_cargar_bitacora_eventos_relevante";
private url_listado_bitacora_eventos_relevante:string = "http://172.22.2.36:5012/url_listado_bitacora_eventos_relevante";
private url_cargar_afectacion_eventos_relevante:string = "http://172.22.2.36:5012/url_cargar_afectacion_eventos_relevante";
private url_editar_bitacora_eventos_relevante:string = "http://172.22.2.36:5012/url_editar_bitacora_eventos_relevante";
private url_editar_eventos_relevante:string = "http://172.22.2.36:5012/url_editar_eventos_relevante";
private url_descargar_eventos_relevante:string = "http://172.22.2.36:5012/url_descargar_eventos_relevante";
private url_editar_afectacion_eventos_relevante:string = "http://172.22.2.36:5012/url_editar_afectacion_eventos_relevante";
private url_eliminar_bitacora_eventos_relevante:string = "http://172.22.2.36:5012/url_eliminar_bitacora_eventos_relevante";
private url_eliminar_afectacion_eventos_relevante:string = "http://172.22.2.36:5012/url_eliminar_afectacion_eventos_relevante";
private url_cargar_documentos_eventos_relevante:string = "http://172.22.2.36:5012/url_cargar_documentos_eventos_relevante";

private creacion_unidad_solictante_url:string = "http://172.22.2.36:5013/creacion_unidad_solictante_url";
private listado_unidad_solictante_url:string = "http://172.22.2.36:5013/listado_unidad_solictante_url";
private crear_movimiento_url:string = "http://172.22.2.36:5013/crear_movimiento_url";
private listado_movimientos_url:string = "http://172.22.2.36:5013/listado_movimientos_url";
private planilla_movimientos_url:string = "http://172.22.2.36:5013/planilla_movimientos_url";


private registro_boletin_operacional_url:string = "http://172.22.2.36:5014/registro_boletin_operacional_url";
private url_ver_boletines_registrados:string = "http://172.22.2.36:5014/url_ver_boletines_registrados";
private editar_registro_boletin_operacional_url:string = "http://172.22.2.36:5014/editar_registro_boletin_operacional_url";
private eliminar_registro_boletin_operacional_url:string = "http://172.22.2.36:5014/eliminar_registro_boletin_operacional_url";
private guardar_anotaciones_operacionales_url:string = "http://172.22.2.36:5014/guardar_anotaciones_operacionales_url";
private ver_anotaciones_operacionales_url:string = "http://172.22.2.36:5014/ver_anotaciones_operacionales_url";

private url_cargar_afectaciones_q5:string = "http://172.22.2.36:5015/url_cargar_afectaciones_q5";
private url_afectaciones_listado_q5:string = "http://172.22.2.36:5015/url_afectaciones_listado_q5";


private url_sub_regiones:string = "http://172.22.2.36:5140/api/subregiones";
private parametros:string = "http://172.22.2.36:5141/api/parametros_resultados";

private datos_iniciales_ceman_diate:string = "http://172.22.2.36:5142/parametros_resultados_fecha_cinam";

private apiUrl = 'http://172.22.2.36:5152/api/resultados_parametro_con_variables';

//microservicios
private url_ver_inf_resultados_dash:string = "http://172.22.2.36:5152/url_ver_inf_resultados_dash";

// eliminar_cargo
// select_cargo
// guardar_cargo

// private eventos_url:string = "/api";
datos:string

private urls:{}={

"afectaciones_cuadro":":5152/b_a_afectaciones_cuadro_token",
"boletin_estadistica":":5152/a_a_boletin_estadistica_token_replicas",
"cartilla_ejc_cdt":":5152/a_b_cartilla_ejc_cdt_token_replicas",
"cartilla_ejc_cdt_r":":5152/cartilla_ejc_cdt_r",

"com_div_mapa":":5152/a_w_boletin_mapa_div_comparativo_div",
"ayuda_comparativa_consejos":":5152/a_w_boletin_mapa_div_comparativo",

"boletin_estadistica_narcotrafico":":5152/a_i_boletin_estadistica_narcotrafico_token",
"narcotrafico_metas":":5152/c_c_boletin_estadistica_narcotrafico_metas",
"docna_semanal":":5152/c_c_boletin_estadistica_narcotrafico_semanal",
"narcotrafico_metas_power":":5152/narcotrafico_metas_power",
"archivo_plano_excel":":5152/archivo_plano_excel",
"archivo_spoas_error":":5152/archivo_spoas_error",
"excel_ut":":5152/excel_ut",
"excel_amenaza":":5152/excel_amenaza",
"resultados_excel_tipo_operaciones":":5152/resultados_excel_tipo_operaciones",
"excel_anios_permiso":":5152/excel_anios_permiso",
"boletin_coe_semanal_diseo":":5152/boletin_coe_semanal_diseo",
"boletin_coe_diario_diseo":":5152/boletin_coe_diario_diseo",
"boletin_estadistica_resultados": ":5152/boletin_estadistica_resultados",
"boletin_comparativo_r": ":5152/boletin_comparativo_r",
"artemisa":":5152/artemisa",
"boletin_estadistica_artemisa_comp":":5152/boletin_estadistica_artemisa_comp",
"boletin_estadistica_contrabando":":5152/boletin_estadistica_contrabando",
"boletin_estadistica_contrabando_comp":":5152/boletin_estadistica_contrabando_comp",
"boletin_estadistica_mineria":":5152/boletin_estadistica_mineria",
"boletin_estadistica_mineria_comparativo":":5152/boletin_estadistica_mineria_comparativo",
"boletin_comparativo_enemigo":":5152/boletin_comparativo_enemigo",
"boletin_comparativo_mapa":":5152/boletin_comparativo_mapa",
"boletin_comparativo":":5152/boletin_comparativo",
"resultados_una_ayuda":":5152/resultados_una_ayuda",
"cuadro_compartivo_afectaciones":":5152/cuadro_compartivo_afectaciones",
"listado_afectaciones":":5152/listado_afectaciones",
"afectaciones_mapa":":5152/afectaciones_mapa",
"regiones_colombia":":5152/regiones_colombia",
"resultados_resaltantes_comparativo":":5152/resultados_resaltantes_comparativo",
"boletin_mapa_comparativa":":5152/boletin_mapa_comparativa",
"mapa_dinamico_divisiones":":5152/mapa_dinamico_divisiones",
"configuracion_especial_res":":5152/configuracion_especial_res",
"res_linea_obj_4":":5152/res_linea_obj_4",
'configuracion_especial_res_sin_Comparar':":5152/configuracion_especial_res_sin_Comparar",
"res_linea_estrategica_narcotrafico":":5152/res_linea_estrategica_narcotrafico",
"ayuda_comparativa_obj_1":":5152/ayuda_comparativa_obj_1",
"ayuda_comparativa_obj_2":":5152/ayuda_comparativa_obj_2",
"ayuda_comparativa_obj_3":":5152/ayuda_comparativa_obj_3",
"ayuda_comparativa_obj_4":":5152/ayuda_comparativa_obj_4",
"configuracion_especial_res_pdf":":5152/configuracion_especial_res_pdf",
"configuracion_paya_narcotrafico":":5152/configuracion_paya_narcotrafico",
"resultados_comparativos_ejc_power_point":":5152/resultados_comparativos_ejc_power_point",



"res_linea_mapa_fronteras":":5167",// cambiar al terminio


"resultados_resaltantes":":5152/b_c_resultados_resaltantes_token",
"resultados_resaltantes_div":":5152/b_d_resultados_resaltantes_div_token",
"resultados_mapa":":5152/b_e_resultados_mapa_token",
"comp_div_mapa_bal":":5152/b_f_boletin_mapa_div_balance",
"resultados_c_power_point":":5152/resultados_c_power_point",
"id_mejor_unidadboj2":":5152/id_mejor_unidadboj2",

/*"id_mejor_unidadboj2":":5157",*/



}

buscar_url(documento:string){

  Object.entries(this.urls).forEach(([key, value]) => {
    var dato = value
    var key = key

    if (key === documento) {
      this.datos = String(dato)

    }

  });

    
  return this.datos
}
  
//BUSCAR INFOMACION DEL CENAM
/* funcion para la conexion de la api de los resultados */
buscar_datos_cenam_diate(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.datos_iniciales_ceman_diate, form_data)
}

  /**
   * 🧠 Obtiene los parámetros y sus variables asociadas desde el backend FastAPI
   */
  obtenerResultadosConVariables(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener los parámetros con variables:', error);
        return throwError(() => new Error('Error al consultar el servidor'));
      })
    );
  }
inf:{}={}
/* funcion para la conexion de la api de as parametrso resultados */
buscar_resultados(data: any): Observable<any>{

  return this.http.post<FormData>(`${this.parametros}/cargar_resultados`, data)
}
/* funcion para la conexion de la api de as subregiones */
sub_regiones(data: any): Observable<any>{

  return this.http.post<FormData>(`${this.url_sub_regiones}/crear_subregion`, data)
}
obtenerSubregiones(): Observable<any> {
  return this.http.get<any>(this.url_sub_regiones);
}
getDepartamentosConMunicipios(): Observable<any> {
  return this.http.get<any>(`${this.url_sub_regiones}/departamentos_con_municipios`);
}

eliminarSubregion(id: number) {
  return this.http.delete(`${this.url_sub_regiones}/eliminar/${id}`);
}


/*modulo de conexion para el b oletin operacional*/
/* funcion para la conexion de la api de los resultados */
ver_inf_resultados_dash(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_ver_inf_resultados_dash, form_data)
}
/*moduylo para cargar las afectaciones reportados por Q5*/
cargar_afectaciones_q5(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_cargar_afectaciones_q5, form_data)
}
cargar_listado_q5(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_afectaciones_listado_q5, form_data)
}
//busqueda de anotaciones registradas
ver_anotaciones_operacionales(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.ver_anotaciones_operacionales_url, form_data)
}
//eguardar anotaciones operacionales
guardar_anotaciones_operacionales(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.guardar_anotaciones_operacionales_url, form_data)
}
//editar el regsitro del boletin
eliminar_registro_boletin(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.eliminar_registro_boletin_operacional_url, form_data)
}
//editar el regsitro del boletin
editar_registro_boletin(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.editar_registro_boletin_operacional_url, form_data)
}
//busqueda de boletin registrados
ver_registro_boletin(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_ver_boletines_registrados, form_data)
}
//conexion para registral el boletin operacional
registro_boletin(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.registro_boletin_operacional_url, form_data)
}
crear_planilla_moviento(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.planilla_movimientos_url, form_data)
}
listado_movimientos(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.listado_movimientos_url, form_data)
}
crear_movimiento(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.crear_movimiento_url, form_data)
}
listado_unidad_solictante(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.listado_unidad_solictante_url, form_data)
}
creacion_unidad_solictante(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.creacion_unidad_solictante_url, form_data)
}
eeliminar_afectacion_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_eliminar_afectacion_eventos_relevante, form_data)
}
editar_afectacion_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_editar_afectacion_eventos_relevante, form_data)
}
cargar_afectacion_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_cargar_afectacion_eventos_relevante, form_data)
}
listado_bitacora_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_listado_bitacora_eventos_relevante, form_data)
}
editar_bitacora_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_editar_bitacora_eventos_relevante, form_data)
}
eliminar_bitacora_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_eliminar_bitacora_eventos_relevante, form_data)
}
cargar_bitacora_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_cargar_bitacora_eventos_relevante, form_data)
}
editar_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_editar_eventos_relevante, form_data)
}
cargar_documentos_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_cargar_documentos_eventos_relevante, form_data)
}
cargar_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_cargar_eventos_relevante, form_data)
}
descargar_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_descargar_eventos_relevante, form_data)
}
ver_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_ver_eventos_relevante, form_data)
}
Cargar_actualizar_pasos_fronteras(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_actualizar_inf_pasos_fronteras, form_data)
}
Cargar_inf_pasos_fronteras(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_cargar_inf_pasos_fronteras, form_data)
}
ver_pasos_fronteras(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_ver_pasos_fronteras, form_data)
}
ver_inf_pasos_fronteras(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_ver_inf_pasos_fronteras, form_data)
}
ver_inf_pasos_fronteras_dash(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_ver_inf_pasos_fronteras_dash, form_data)
}
ver_reporte_pasos_fronteras(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.url_ver_reporte_pasos_fronteras, form_data)
}
upload(form_data:FormData): Observable<any>{
  
  return this.http.post<FormData>(this.url_cargar, form_data)
}

eventos(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.eventos_url, form_data)
}
alertas(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.alertas_url, form_data)
}
Cargar_insitop_f(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.cargar_inistop_url, form_data)
}
Cargar_insitop_calculo(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.cargar_inistop_url_calculo, form_data)
}
Cargar_insitop_u(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.cargar_inistop_url_unidades, form_data)
}
Leer_unidades(): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<any>(this.cargar_inistop_leer_unidades, { headers });
}

reporte_insitop_pelotones(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.reporte_inistop_pelotones_url, form_data)
}
caqntidad_cdte_calculo_unidades(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.cantidad_cdte_url, form_data)
}
reporte_insitop_f(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.reporte_inistop_url, form_data)
}
reporte_insitop_pelotones_divisiones(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.reporte_inistop_url_pelotones, form_data)
}
listado_inistop(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.listado_inistop_url, form_data)
}
listado_inistop_grafico(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.grafico_listado_inistop_url, form_data)
}
estado_mayor_inistop_grafico(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.grafico_estado_mayor_inistop_url, form_data)
}
estado_mayor_inistop_grafico_unidad(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.grafico_estado_mayor_inistop_unidad_url, form_data)
}
cargue_listado_inistop_grafico_unidad(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.grafico_unidades_listado_inistop_unidad_url, form_data)
}
aetcr(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.aetcr_url, form_data)
}
aetcr_peloton(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.aetcr_url_peloton, form_data)
}
atques_ddron(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.atques_dron_url, form_data)
}
atques_actulizar(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.actulizar_dron_url, form_data)
}

guardar_eventos_relevantes(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.eventos_relevantes_boletin_url, form_data)
}

guardar_eventos_relevantes_descargar(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.eventos_relevantes_boletin_descargar_url, form_data)
}
alertas_eliminar(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.alertas_eliminar_url, form_data)
}

alertas_editar(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.alertas_editar_url, form_data)
}



// /----------------------------------------------------------
ingreso_coordinador(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.ingreso_coordinador_url, form_data)
}
editar_coordinador(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.editar_coordinador_url, form_data)
}
eliminar_coordinador(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.eliminar_coordinador_url, form_data)
}
// /----------------------------------------------------------

mapa_alertas_division(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.mapa_alertas_division_url, form_data)
}
mapa_aetcr(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.mapa_aetcr_url, form_data)
}
buscar_alertas(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.buscar_alertas_url, form_data)
}
mapa_alertas_fecha(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.mapa_alertas_fecha_url, form_data)
}
mapa_alertas_get(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.mapa_alertas, form_data)
}
planillas(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.planillas_url, form_data)
}
eventos_descargar(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.eventos_url_descargar, form_data)
}
conexion_api(form_data:FormData, port:string): Observable<any>{

  return this.http.post<FormData>(this.url_matirz+port+this.enpoint, form_data)
}
conexion_api_enpoint(form_data:FormData, port:string, enpoint:string): Observable<any>{
  return this.http.post<FormData>(this.url_matirz+port+enpoint, form_data)
}

personal_ingreso_fuera_combate(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.fuera_combate, form_data)
}
//PERSONAL
personal_ingreso(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.ingreso_personal, form_data)
}
personal_editar(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.update_personal, form_data)
}
personal_eliminar(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.eliminar_personal, form_data)
}

f_personal_eliminar_cargo(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.personal_eliminar_cargo, form_data)
}
f_personal_select_cargo(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.personal_select_cargo, form_data)
}
listados_aetcr(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.listado_aectr, form_data)
}
plazos(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.plazos_url, form_data)
}
plazos_asignados(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.plazos_asignados_url, form_data)
}
gurdar_medalla(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.creacion_medalla_url, form_data)
}
plazos_inicial(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.listado_inicial_medallas_url, form_data)
}
listado_medallas(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.listado_personal_medallas_url, form_data)
}
plazos_asignados_seguimiento(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.plazos_asignados_url_seguimiento, form_data)
}
asignacion(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.asignacion_url, form_data)
}
re_asignacion(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.reasignacion_url, form_data)
}
creacion_plazo(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.creacion_plazo_url, form_data)
}
creacion_proyecto(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.creacion_proyecto_url, form_data)
}
conceptos_medallas_descargar(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.conceptos_medallas_url, form_data)
}
cdescargar_bd_medallas(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.conceptos_medallas_descargar_url, form_data)
}
eliminar_medalla(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.eliminar_medalla_url, form_data)
}
registro_informacion_difab(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.registro_difab_medalla_url, form_data)
}
registro_informacion_estado_proecto(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.registro_estado_proyecto_medalla_url, form_data)
}
registro_informacion_editar_info(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.registro_editar_informacion_url, form_data)
}
eliminar_asignacion(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.eliminar_easignacion_url, form_data)
}
cumplir_asignacion(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.cumplir_easignacion_url, form_data)
}
actulizar_asunto(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.actualizar_asunto_url, form_data)
}
cumplir_asignacion_respuesta(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.cumplir_easignacion_url_respuesta, form_data)
}
reporte_pdf_respuesta(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.reporte_pdf_respuesta_url, form_data)
}
reporte_pdf_respuesta_balance(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.reporte_pdf_respuesta_url_balance, form_data)
}
reporte_pdf_respuesta_estadistica(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.reporte_pdf_respuesta_url_estadistica, form_data)
}
info_aetcr(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.info_aectr, form_data)
}
f_personal_guardar_cargo(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.personal_guardar_cargo, form_data)
}

//inventarios
inventarios_ingreso(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.ingreso_inventarios, form_data)
}
inventarios_select(form_data:FormData): Observable<any>{

  return this.http.post<FormData>(this.select_cargo_inventario, form_data)
}


}

