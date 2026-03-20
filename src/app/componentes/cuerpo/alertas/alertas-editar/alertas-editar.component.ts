import { Component, OnInit, ViewChild } from '@angular/core';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';
import { MapaService } from 'src/app/servicios_generales/mapa/mapa.service';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';

@Component({
  selector: 'app-alertas-editar',
  templateUrl: './alertas-editar.component.html',
  styleUrls: ['./alertas-editar.component.css']
})
export class AlertasEditarComponent{
  constructor(private informacion: InfEventoService, private mapa: MapaService){
    // var cordenada_x = parseFloat(this.x)
    // var cordenada_y = parseFloat(this.y)
  
  
    // this.mapa.crear_point(cordenada_x, cordenada_y, this.accion_aelrta, this.fecha_alerta)
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent
  numero_alerta = this.informacion.numero_alerta
  fecha_alerta = this.informacion.fecha_alerta
  hora_alerta = this.informacion.hora_alerta
  origen = this.informacion.origen
  destino = this.informacion.destino
  gr_recibe = this.informacion.gr_recibe
  quien_recibe = this.informacion.quien_recibe
  cargo_recibe = this.informacion.cargo_recibe
  telefono_recibe = this.informacion.telefono_recibe
  gr_remitente = this.informacion.gr_remitente
  quien_remitente = this.informacion.quien_remitente
  cargo_remitente = this.informacion.cargo_remitente
  telefono_remitente = this.informacion.telefono_remitente

  departamento_alerta = this.informacion.departamento_alerta
  municipio_alerta = this.informacion.municipio_alerta
  sitio_alerta = this.informacion.sitio_alerta

  ln_alerta = this.informacion.ln_alerta
  ln_g_alerta = this.informacion.ln_g_alerta
  ln_m_alerta = this.informacion.ln_m_alerta
  ln_s_alerta = this.informacion.ln_s_alerta
  lw_alerta = this.informacion.lw_alerta
  lw_g_alerta = this.informacion.lw_g_alerta
  lw_m_alerta = this.informacion.lw_m_alerta
  lw_s_alerta = this.informacion.lw_s_alerta

  amenaza_alerta = this.informacion.amenaza_alerta
  accion_aelrta = this.informacion.accion_aelrta
  amenazados = this.informacion.amenazados

  fecha_registro_alerta = this.informacion.fecha_registro_alerta
  hora_registro_alerta = this.informacion.hora_registro_alerta
  folio_libro = this.informacion.folio_libro


  coordenadas_alerta = this.informacion.coordenadas_alerta

  destino_criptografo = this.informacion.destino_criptografo
  gr_recibe_criptografo = this.informacion.gr_recibe_criptografo
  quien_recibe_criptografo = this.informacion.quien_recibe_criptografo
  cargo_recibe_criptografo = this.informacion.cargo_recibe_criptografo
  telefono_recibe_criptografo = this.informacion.telefono_recibe_criptografo

  doc = this.informacion.doc

  x = this.informacion.x
  y = this.informacion.y
  server:string;
  ngAfterViewInit(): void {
    var cordenada_x = parseFloat(this.x)
    var cordenada_y = parseFloat(this.y)
  
    console.log(cordenada_x)
    console.log(cordenada_y)
    this.mapa_digital.crear_point(cordenada_x, cordenada_y, this.accion_aelrta, this.fecha_alerta)
  }
    
 ver_documento(documento:string){
  var view_dumentos =  document.getElementById("view_dumentos")
  view_dumentos?.classList.toggle("documento_oculto")
  this.server = "http://172.22.2.36:5198"+documento   
  console.log(this.server )
  // this.informacion.ver_documento_view(direcion, "/listado_eventos")
  // this.informacion.ver_documento_view()
  
  // this.router.navigate(["/ver_document"])
}

}
