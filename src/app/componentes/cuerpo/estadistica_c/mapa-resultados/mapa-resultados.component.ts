import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PointServiceService } from 'src/app/servicios_generales/mapa/point-service.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-mapa-resultados',
  templateUrl: './mapa-resultados.component.html',
  styleUrls: ['./mapa-resultados.component.css']
})
export class MapaResultadosComponent {

  constructor(private selector: SelectoresService, private point: PointServiceService, private api_serve: ServiceConecionService, private cookie: CookieService, private router: Router){}


  valicaion_array: string[] = []
  formData = new FormData();
  validacion: boolean = false

  aler_p_datos: boolean = false
  datos_resultados:string[]=[]

  unidad_selecionada_resultados: string[] = this.selector.unidad_selecionada_resultados
  unidad_selecionada_resultados_tropas:string[]=this.selector.unidad_selecionada_resultados_tropas
  unidad_selecionada_resultados_armamento:string[]= this.selector.unidad_selecionada_resultados_armamento
  comates_a_selecionar:string[] = this.selector.combates_a_selecionar
  ataque_fuerza_publica:string[]=this.selector.ataque_fuerza_publica
  material_explosivos:string[]=this.selector.material_explosivos
  narcotrafico_lista:string[]=this.selector.narcotrafico_lista
  economias_ilicitas:string[]=this.selector.economias_ilicitas
  afectaciones_oleoducto:string[]=this.selector.afectaciones_oleoducto
  afectaciones_a_la_mineria:string[]=this.selector.afectaciones_a_la_mineria
  afectaciones_al_contranando:string[]=this.selector.afectaciones_al_contranando
  loe_amazonia:string[]=this.selector.loe_amazonia

  otro:string[]=this.selector.otro
  resultados_oculto(){
    var resultados_oculto = document.getElementById("resultados_oculto")
    resultados_oculto?.classList.toggle("resultados_oculto")
  }
  menu_oculto(){
    var menu_oculto = document.getElementById("menu_oculto")
    menu_oculto?.classList.toggle("menu_oculto_hide")
  }
  scroll(el:HTMLElement){
    var elemento = document.getElementById("elemento")!
      elemento.classList.remove("titulo_filtro")
      var elemento_1 = document.getElementById("elemento_1")!
      elemento_1.classList.remove("titulo_filtro")
      var elemento_2 = document.getElementById("elemento_2")!
      elemento_2.classList.remove("titulo_filtro")
      var elemento_3 = document.getElementById("elemento_3")!
      elemento_3.classList.remove("titulo_filtro")
      var elemento_4 = document.getElementById("elemento_4")!
      elemento_4.classList.remove("titulo_filtro")
      var elemento_5 = document.getElementById("elemento_5")!
      elemento_5.classList.remove("titulo_filtro")
      var elemento_6 = document.getElementById("elemento_6")!
      elemento_6.classList.remove("titulo_filtro")
      var elemento_7 = document.getElementById("elemento_7")!
      elemento_7.classList.remove("titulo_filtro")
      var elemento_8 = document.getElementById("elemento_8")!
      elemento_8.classList.remove("titulo_filtro")
      var elemento_9 = document.getElementById("elemento_9")!
      elemento_9.classList.remove("titulo_filtro")
      var elemento_10 = document.getElementById("elemento_10")!
      elemento_10.classList.remove("titulo_filtro")
      var elemento_11 = document.getElementById("elemento_11")!
      elemento_11.classList.remove("titulo_filtro")
      var elemento_12 = document.getElementById("elemento_12")!
      elemento_12.classList.remove("titulo_filtro")
        el.scrollIntoView()
        el.classList.add("titulo_filtro")
        var menu_oculto = document.getElementById("menu_oculto")
        menu_oculto?.classList.toggle("menu_oculto_hide")
  }
  resultados_selecionados(item:string){
    const municipios = item
    
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)
    
    this.aler_p_datos=true
    

      if (!this.datos_resultados.includes(item)) {
        this.datos_resultados.push(item)
        che_1?.classList.toggle("che_1")
      }else{
        var indice = this.datos_resultados.indexOf(item); // obtenemos el indice
        this.datos_resultados = this.datos_resultados.filter(function(i) { return i !== item }); // filtramos
        
        che_1?.classList.toggle("che_1")
      }
      
      // console.log(this.datos_municipios)
    
  }

    
  valicacion_array_funcion(valicaion_array: string[]) {

    for (let index in valicaion_array) {
      if (valicaion_array[index] === "false") {
        return false
      }
    }
    return true
  }
  filtar_division(form: NgForm){
   
    const sigla_unidad = form.value.sigla_unidad
    // this.validar_informacion(sigla_unidad, "sigla_unidad")

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
