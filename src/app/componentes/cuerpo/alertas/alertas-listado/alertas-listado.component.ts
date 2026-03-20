import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';
import { MapaService } from 'src/app/servicios_generales/mapa/mapa.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-alertas-listado',
  templateUrl: './alertas-listado.component.html',
  styleUrls: ['./alertas-listado.component.css']
})
export class AlertasListadoComponent {
  per_update:boolean
  constructor(private router: Router, private mapa: MapaService, private informacion: InfEventoService, private listados: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService){ 
    this.per_update = this.validar_estado(this.cookie.get("per_update"))
  }
  alertas:String[]=[]
  lis_alertas:{} = JSON.parse(sessionStorage.getItem("alertas")!)
  ver:boolean =  false
  server:string;
  formData = new FormData();

  tipo_filtro: string = ""
  filtro: string = JSON.parse(sessionStorage.getItem("filtro")!)
  
  
  ngOnInit(): void {
    this.alertas =  this.listados.array_listados(this.lis_alertas)
  }
  cordenada_x: number 
  cordenada_y: number
  
  
  falta:string="falta"

  info(id:number){
    // const x = this.alertas[id][25]
    // const y = this.alertas[id][26]
    // this.cordenada_x = parseFloat(x)
    // this.cordenada_y = parseFloat(y)

    //   console.log(x)
    //   console.log(y)
    // const evento = String(this.alertas[id][31])
    // const fecha = String(this.alertas[id][2])
    // this.mapa.crear_point(this.cordenada_x, this.cordenada_y, evento, fecha)

    this.informacion.inf_alerta(this.alertas[id])
    this.router.navigate(["/alertas_editar"])

  }
  
 ver_documento(documento:string){
  var view_dumentos =  document.getElementById("view_dumentos")
  view_dumentos?.classList.toggle("documento_oculto")
  this.server = "http://172.22.2.36:5198"+documento   
 
  // this.informacion.ver_documento_view(direcion, "/listado_eventos")
  // this.informacion.ver_documento_view()
  
  // this.router.navigate(["/ver_document"])
}
descarga_documento(documento:string){
  //  console.log(documento)
  
  const a_href = document.createElement('a')

  a_href.href = "http://172.22.2.36:5198"+documento 
  a_href.download = documento
  
  
  a_href.target = "black"
  a_href.click()
  

}
  editar(id:number){
    // const x = this.alertas[id][25]
    // const y = this.alertas[id][26]
    // this.cordenada_x = parseFloat(x)
    // this.cordenada_y = parseFloat(y)

    //   console.log(x)
    //   console.log(y)
    // const evento = String(this.alertas[id][31])
    // const fecha = String(this.alertas[id][2])
    // this.mapa.crear_point(this.cordenada_x, this.cordenada_y, evento, fecha)

    this.informacion.inf_alerta(this.alertas[id])
    this.router.navigate(["/editar_alerta"])

  }
  
  validar_estado(dato:string){

    var dato_r = false
  
    if (dato==="1") {
      dato_r = true
    }else{
      dato_r = false
    }
    return dato_r
  
  }
  busca_alertas(form: NgForm){
    const tipo_filtro =  form.value.tipo_filtro
    const filtro =  form.value.filtro
    this.formData.append("tipo_filtro", tipo_filtro);
    this.formData.append("filtro", filtro);
    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    this.api_serve.buscar_alertas(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        // console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key
    
          if (key === "alertas_filtro") {
            sessionStorage.removeItem("alertas")
            sessionStorage.setItem("alertas", JSON.stringify(dato))
    
          }
          if (key === "alertas_filtro_INFO") {
            sessionStorage.removeItem("filtro")
            sessionStorage.setItem("filtro", JSON.stringify(dato))
            
    
          }

        });

        location.reload()
        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
        // this.router.navigate(["/mapa_alertas"])
        // this.tipo_filtro = tipo_filtro
        // this.filtro = filtro

      },
      error: (err: HttpErrorResponse) => {

        alert("error de conexion")
      }
    })

  }
}
