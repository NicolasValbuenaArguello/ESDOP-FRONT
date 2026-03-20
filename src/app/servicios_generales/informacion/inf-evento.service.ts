import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfEventoService {

  constructor() { }
  boletin_ej:string
  boletin_int:string
  fecha:string
  hora:string
  divicion:string
  dib_ft:string
  brigada:string
  ut:string
  amaneza:string
  subestructuta:string
  dept:string
  municipio:string
  sitio:string
  ln:string
  ln_g:string
  ln_m:string
  ln_s:string
  lw:string
  lw_g:string
  lw_m:string
  lw_s:string
  evento:string
  resumen:string
  denuncia:string
  numero_denuncia:string
  fiscalia:string
  estado:string
  nomb_bol:string
  nomb_radio:string
  nomb_denucnia:string
  nomb_inf:string
  coordenadas:string
  link:string
  nombre_documento:string

  direcion:string
  documento:string

  ver:boolean =false
  ruta:string

  inf_boletin(dato:String){
    this.boletin_ej = dato[0]
    this.boletin_int = dato[1]
    this.fecha = dato[2]
    this.hora = dato[3]
    this.divicion = dato[4]
    this.dib_ft = dato[5]
    this.brigada = dato[6]
    this.ut = dato[7]
    this.amaneza = dato[8]
    this.subestructuta = dato[9]
    this.dept = dato[10]
    this.municipio = dato[11]
    this.sitio = dato[12]
    this.ln = dato[13]
    this.ln_g = dato[14]
    this.ln_m = dato[15]
    this.ln_s = dato[16]
    this.lw = dato[17]
    this.lw_g = dato[18]
    this.lw_m = dato[19]
    this.lw_s = dato[20]
    this.evento = dato[23]
    this.resumen = dato[24]
    this.denuncia = dato[25]
    this.numero_denuncia = dato[26]
    this.fiscalia = dato[27]
    this.estado = dato[28]
    this.nomb_bol = dato[29]
    this.nomb_radio = dato[30]
    this.nomb_denucnia = dato[31]
    this.nomb_inf = dato[32]
    this.direcion = dato[33]

    this.link = dato[33] +"/" + dato[4] + "/"  +dato[34]
    this.nombre_documento = dato[34]
    this.coordenadas = this.ln + " " + this.ln_g + "° " +  this.ln_m + "' " +  this.ln_s + "'' " + this.lw + " " + this.lw_g + "° " +  this.lw_m + "' " +  this.ln_s + "'' " 

  }
  ver_documento_view(){

    // this.ver = true
  }
  id_alerta:string
  numero_alerta:string
  fecha_alerta:string
  hora_alerta:string
  origen:string
  destino:string
  gr_recibe:string
  quien_recibe:string
  cargo_recibe:string
  telefono_recibe:string
  gr_remitente:string
  quien_remitente:string
  cargo_remitente:string
  telefono_remitente:string

  departamento_alerta:string
  municipio_alerta:string
  sitio_alerta:string

  ln_alerta:string
  ln_g_alerta:string
  ln_m_alerta:string
  ln_s_alerta:string
  lw_alerta:string
  lw_g_alerta:string
  lw_m_alerta:string
  lw_s_alerta:string

  amenaza_alerta:string
  accion_aelrta:string
  amenazados:string

  fecha_registro_alerta:string
  hora_registro_alerta:string
  folio_libro:string


  coordenadas_alerta:string

  destino_criptografo:string
  gr_recibe_criptografo:string
  quien_recibe_criptografo:string
  cargo_recibe_criptografo:string
  telefono_recibe_criptografo:string

  x:string
  y:string
  doc:string


  inf_alerta(dato:String){
    this.id_alerta = dato[0]
    this.numero_alerta = dato[1]
    this.fecha_alerta = dato[2]
    this.hora_alerta = dato[3]
    this.origen = dato[4]
    this.destino = dato[5]
    this.gr_recibe = dato[6]
    this.quien_recibe = dato[7]
    this.cargo_recibe = dato[8]
    this.telefono_recibe = dato[9]

    this.gr_remitente = dato[10]
    this.quien_remitente = dato[11]
    this.cargo_remitente = dato[12]
    this.telefono_remitente = dato[13]

    this.departamento_alerta = dato[14]
    this.municipio_alerta = dato[15]
    this.sitio_alerta = dato[16]

    this.ln_alerta = dato[17]
    this.ln_g_alerta = dato[18]
    this.ln_m_alerta = dato[19]
    this.ln_s_alerta = dato[20]
    this.lw_alerta = dato[21]
    this.lw_g_alerta = dato[22]
    this.lw_m_alerta = dato[23]
    this.lw_s_alerta = dato[24]

    this.fecha_registro_alerta = dato[27]
    this.hora_registro_alerta = dato[28]
    this.folio_libro = dato[29]

    this.amenaza_alerta = dato[30]
    this.accion_aelrta = dato[31]
    this.amenazados = dato[32]

    this.destino_criptografo = dato[33]
    this.gr_recibe_criptografo = dato[34]
    this.quien_recibe_criptografo = dato[35]
    this.cargo_recibe_criptografo = dato[36]
    this.telefono_recibe_criptografo = dato[37]

    this.x = dato[25]
    this.y = dato[26]


    this.doc = dato[38]

    this.coordenadas_alerta = this.ln_alerta + " " + this.ln_g_alerta + "° " +  this.ln_m_alerta + "' " +  this.ln_s_alerta + "'' " + this.lw_alerta + " " + this.lw_g_alerta + "° " +  this.lw_m_alerta + "' " +  this.ln_s_alerta + "'' " 

  }
}
