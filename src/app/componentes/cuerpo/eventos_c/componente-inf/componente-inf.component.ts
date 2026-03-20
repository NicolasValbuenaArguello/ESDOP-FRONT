import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';

@Component({
  selector: 'app-componente-inf',
  templateUrl: './componente-inf.component.html',
  styleUrls: ['./componente-inf.component.css']
})
export class ComponenteInfComponent {
  constructor(private api_serve: ServiceConecionService, private informacion: InfEventoService){}

  boletin_ej = this.informacion.boletin_ej
  boletin_int = this.informacion.boletin_int
  fecha = this.informacion.fecha
  hora = this.informacion.hora
  divicion = this.informacion.divicion
  dib_ft = this.informacion.dib_ft
  brigada = this.informacion.brigada
  ut = this.informacion.ut
  amaneza = this.informacion.amaneza
  subestructuta = this.informacion.subestructuta
  dept = this.informacion.dept
  municipio = this.informacion.municipio
  sitio = this.informacion.sitio
  evento = this.informacion.evento
  resumen = this.informacion.resumen
  denuncia = this.informacion.denuncia
  numero_denuncia = this.informacion.numero_denuncia
  fiscalia = this.informacion.fiscalia
  estado = this.informacion.estado
  nomb_bol = this.informacion.nomb_bol
  nomb_radio = this.informacion.nomb_radio
  nomb_denucnia = this.informacion.nomb_denucnia
  nomb_inf = this.informacion.nomb_inf
  coordenadas = this.informacion.coordenadas
  nombre_documento = this.informacion.nombre_documento
  direccion = this.informacion.direcion

  falta:string ="falta"

  inf_g:boolean = false
  inf_a:boolean = false
  inf_c_g:string = "datos"
  server:string
  
  ver_documento(documento:string, direcion:string){
    var view_dumentos =  document.getElementById("view_dumentos")
    view_dumentos?.classList.toggle("documento_oculto")
    this.server = "http://172.22.2.36:5198"+direcion+documento   
    // this.informacion.ver_documento_view(direcion, "/listado_eventos")
    this.informacion.ver_documento_view()
    
    // this.router.navigate(["/ver_document"])
  }
  }
