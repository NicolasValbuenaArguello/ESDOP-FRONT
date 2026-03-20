import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { MapaDigitalComponent } from '../mapa-digital/mapa-digital.component';
import { MapaService } from 'src/app/servicios_generales/mapa/mapa.service';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';

@Component({
  selector: 'app-listado-eventos',
  templateUrl: './listado-eventos.component.html',
  styleUrls: ['./listado-eventos.component.css']
})
export class ListadoEventosComponent implements OnInit {
  constructor(private router: Router, private mapa: MapaService, private informacion: InfEventoService, private listados: SelectoresService){ }
  eventos:String[]=[]
  lis_eventos:{} = JSON.parse(sessionStorage.getItem("eventos")!)
  ver:boolean =  false
  server:string;

  ngOnInit(): void {
    this.eventos =  this.listados.array_listados(this.lis_eventos)
  }
  cordenada_x: number 
  cordenada_y: number
  
  
  falta:string="falta"

  info(id:number){
    const x = this.eventos[id][21]
    const y = this.eventos[id][22]
    this.cordenada_x = parseFloat(x)
    this.cordenada_y = parseFloat(y)

    const evento = String(this.eventos[id][10])
    const fecha = String(this.eventos[id][11])
    this.mapa.crear_point(this.cordenada_x, this.cordenada_y, evento, fecha)

    this.informacion.inf_boletin(this.eventos[id])
    this.router.navigate(["/inf_event"])

  }
  ver_documento(documento:string, direcion:string){
    var view_dumentos =  document.getElementById("view_dumentos")
    view_dumentos?.classList.toggle("documento_oculto")
    this.server = "http://172.22.2.36:5198"+direcion+documento   
    // this.informacion.ver_documento_view(direcion, "/listado_eventos")
    this.informacion.ver_documento_view()
    
    // this.router.navigate(["/ver_document"])
  }
}
