import { Component, ViewChild } from '@angular/core';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';
import { PointServiceService } from 'src/app/servicios_generales/mapa/point-service.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-mapa-alertas',
  templateUrl: './mapa-alertas.component.html',
  styleUrls: ['./mapa-alertas.component.css']
})

export class MapaAlertasComponent {
  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent
  constructor(private selector: SelectoresService, private point: PointServiceService, private api_serve: ServiceConecionService, private cookie: CookieService, private router: Router){}
  // cordenada_x: number = 5.60971
  // cordenada_y: number = -77.08175
  alerta: string = ""
  valicaion_array: string[] = []
  formData = new FormData();
  validacion: boolean = false
  division = this.selector.duplicados()
  unidad_selecionada_div: string[] = []
  destino: string = "---"

  info_mapa = this.point.array_listados(JSON.parse(sessionStorage.getItem("info_mapa")!))
  div_hija(evaluar: number, respuesta: number) {
    for (let i in this.unidad_selecionada_div) {
      this.unidad_selecionada_div.splice(parseInt(i))
    }

    this.unidad_selecionada_div = this.selector.unidades_filtradas(this.destino, evaluar, respuesta)

  }
  ngAfterViewInit(){
    this.mapa_digital.crear_point_alertas(this.info_mapa)
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
  filtar_fecha(form: NgForm){
   
    const fecha = form.value.fecha
    this.validar_informacion(fecha, "fecha")

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.validacion = this.valicacion_array_funcion(this.valicaion_array)
    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    
    if (!this.validacion) {
      alert("Debe de llenar toda la información")
      for (let i in this.valicaion_array) {
        this.valicaion_array.splice(parseInt(i))
      }
      var espiner = document.getElementById("espiner")
      espiner?.classList.remove("lds-spinner")


    } else {
      
        this.api_serve.mapa_alertas_fecha(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            // console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
        
              if (key === "info_mapa") {
                sessionStorage.removeItem("info_mapa")
                sessionStorage.setItem("info_mapa", JSON.stringify(dato))
        
              }
            });

            location.reload()
            var espiner = document.getElementById("espiner")
            espiner?.classList.remove("lds-spinner")
            // this.router.navigate(["/mapa_alertas"])

          },
          error: (err: HttpErrorResponse) => {

            alert("error de conexion")
          }
        })
      
    }
    // mapa_alertas_get
   
  }
  filtar_division(form: NgForm){
   
    const sigla_unidad = form.value.sigla_unidad
    this.validar_informacion(sigla_unidad, "sigla_unidad")

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.validacion = this.valicacion_array_funcion(this.valicaion_array)
    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    
    if (!this.validacion) {
      alert("Debe de llenar toda la información")
      for (let i in this.valicaion_array) {
        this.valicaion_array.splice(parseInt(i))
      }
      var espiner = document.getElementById("espiner")
      espiner?.classList.remove("lds-spinner")


    } else {
      
        this.api_serve.mapa_alertas_division(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            // console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
        
              if (key === "info_mapa") {
                sessionStorage.removeItem("info_mapa")
                sessionStorage.setItem("info_mapa", JSON.stringify(dato))
        
              }
            });

            location.reload()
            var espiner = document.getElementById("espiner")
            espiner?.classList.remove("lds-spinner")
            // this.router.navigate(["/mapa_alertas"])

          },
          error: (err: HttpErrorResponse) => {

            alert("error de conexion")
          }
        })
      
    }
    // mapa_alertas_get
   
  }
}
