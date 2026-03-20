import { Component } from '@angular/core';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-novedades-personal',
  templateUrl: './novedades-personal.component.html',
  styleUrls: ['./novedades-personal.component.css']
})
export class NovedadesPersonalComponent {
  constructor(private menu_service :  SelectoresService){}

  nit_ejc = this.menu_service.nit_ejc
  unidad_a_que_pertenece = this.menu_service.unidad_a_que_pertenece

  clasificacion_de_la_novedad = this.menu_service.clasificacion_de_la_novedad
  Si_eligio_otro_diga_cual = this.menu_service.Si_eligio_otro_diga_cual
  tipo_de_vincualcion =  this.menu_service.tipo_de_vincualcion

  jefactura =  this.menu_service.jefactura
  comando =  this.menu_service.comando
  fuerza_tarea =  this.menu_service.fuerza_tarea
  cede =  this.menu_service.cede

  division = this.menu_service.duplicados()

  brigada =  this.menu_service.brigada
  unidad_diper =  this.menu_service.unidad_diper

  eps_que_pertenece = this.menu_service.eps_que_pertenece
  arl_que_pertenece = this.menu_service.arl_que_pertenece

  municipio_dipse = this.menu_service.municipio_dipse
  departamento_dipser = this.menu_service.departamento_dipser
  caracteristicas_del_lugar= this.menu_service.caracteristicas_del_lugar
  gr_cdte = this.menu_service.gr_cdte
  meses_dipse = this.menu_service.meses_dipse
  atencion_imediata = this.menu_service.atencion_imediata
  genero_dipse = this.menu_service.genero_dipse
  lugar_afectacion = this.menu_service.lugar_afectacion
  afectacion_espeficica = this.menu_service.afectacion_espeficica
  clase_novedad = this.menu_service.clase_novedad
  tipo_novedad = this.menu_service.tipo_novedad
  si_no = this.menu_service.si_no
  identificacion_peligro = this.menu_service.identificacion_peligro
  agente_de_la_lesion = this.menu_service.agente_de_la_lesion
  mecanismo_de_la_lesion=this.menu_service.mecanismo_de_la_lesion
  informacion_vehiculo =this.menu_service.informacion_vehiculo
  tipo_vehiculo=this.menu_service.tipo_vehiculo

  //informacion targetas
  inf_g:boolean=true
  inf_c_g:string="<b>NOTA:</b> En caso de lesiones a personas, se debe enviar copia del informe ATEL radicado en la ARL. Se debe anexar fotos, diagramas o esquemas necesarios para el entendimiento del evento."
}
