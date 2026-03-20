import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';
import { MapaService } from 'src/app/servicios_generales/mapa/mapa.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';

@Component({
  selector: 'app-informacion-aetcr',
  templateUrl: './informacion-aetcr.component.html',
  styleUrls: ['./informacion-aetcr.component.css']
})
export class InformacionAetcrComponent {

  
  listado_aetcr:{} = JSON.parse(sessionStorage.getItem("informacion_aetcr")!)
  cant_personal:{} = JSON.parse(sessionStorage.getItem("cantidad_anios")!)
  servicios_pubicos:{} = JSON.parse(sessionStorage.getItem("servicios_pubicos")!)
  alertas:String[]=[]
  cantidad_personal:String[]=[]
  servicios:String[]=[]
  nombre_aetcr:string
  nivel:string
  numero:string
  lugar:string
  cordenadas:string
  fecha:string
  foto_aetcr:string

  nombre_aectr:string
  seudonimo:string
  celular:string
  Ubicion_aetcr:string
  foto_user:string

  cant_hombres:string
  cant_mujeres:string
  disminucion:string
  x:string
  y:string

  constructor(private router: Router, private mapa: MapaService, private informacion: InfEventoService, private listados: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService){ 
  
  }
  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent
  ngOnInit(): void {
    this.alertas =  this.listados.array_listados(this.listado_aetcr)
    this.cantidad_personal =  this.listados.array_listados(this.cant_personal)
    this.servicios =  this.listados.array_listados(this.servicios_pubicos)


    for (let index = 0; index < this.alertas.length; index++) {
      this.nombre_aetcr = this.alertas[index][5];
      this.nivel = this.alertas[index][6];
      this.numero = this.alertas[index][3];

      this.lugar = this.alertas[index][9] + " - " + this.alertas[index][10]+" - "+this.alertas[index][11];

      this.cordenadas = this.alertas[index][12] + "  " + this.alertas[index][13]+"° "+this.alertas[index][14]+"' "+this.alertas[index][15]+"'' "+this.alertas[index][16] + "  " + this.alertas[index][17]+"° "+this.alertas[index][18]+"' "+this.alertas[index][19]+"'' "

      this.fecha = this.alertas[index][4];
      this.foto_aetcr = this.alertas[index][1];

      this.nombre_aectr = this.alertas[index][22];
      this.seudonimo = this.alertas[index][23];
      this.celular = this.alertas[index][24];
      this.Ubicion_aetcr = this.alertas[index][25];
      this.foto_user = this.alertas[index][2];
      this.cant_hombres = this.alertas[index][7];
      this.cant_mujeres = this.alertas[index][8];

      this.x = this.alertas[index][20];
      this.y = this.alertas[index][21];
            
    }



    
    var ultimo = this.cantidad_personal[this.cantidad_personal.length - 1]
    var primer = this.cantidad_personal[0]
    let resultados = 0

    resultados = ((parseInt(ultimo[4]) / parseInt(primer[4]))*100)-100

    this.disminucion  = 'ausencia ' + String(Math.round(resultados))+'%'

}
ngAfterViewInit(): void {
  var cordenada_x = parseFloat(this.x)
  var cordenada_y = parseFloat(this.y)


  this.mapa_digital.crear_point_aetcr(cordenada_x, cordenada_y, this.cordenadas, this.nombre_aetcr, this.nivel)
}

tamanio_foto_aetcr(){

  var foto = document.getElementById("foto_aetcr")

  foto?.classList.toggle("foto_aetcr_2")
}
tamanio_foto_aetcr_encargado(){

  var foto = document.getElementById("foto_usurio_aetcr")

  foto?.classList.toggle("foto_usurio_aetcr_2")
}

}
