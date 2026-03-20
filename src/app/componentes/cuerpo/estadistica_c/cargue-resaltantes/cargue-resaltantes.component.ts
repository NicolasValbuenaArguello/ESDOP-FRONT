import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-cargue-resaltantes',
  templateUrl: './cargue-resaltantes.component.html',
  styleUrls: ['./cargue-resaltantes.component.css']
})
export class CargueResaltantesComponent {
  constructor(private selector: SelectoresService, private api_serve: ServiceConecionService,  private cookie: CookieService,) {

  }
  division = this.selector.duplicados()
  amenaza_select = this.selector.gao_
  titulo = "Cargar Eventos"

  
  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData = new FormData();
  validacion: boolean = false
  validar_nombre: boolean = false

  
  link: string
  nombre: string
  cambio_accion(){
    if (this.titulo === "Cargar Eventos") {
      this.titulo = "Descargar Eventos"
      var cargue = document.getElementById("cargue")
      cargue?.classList.add("descargue")

      var cargue_des = document.getElementById("descargue")
      cargue_des?.classList.remove("descargue")
      
    } else {
      this.titulo = "Cargar Eventos"
      var cargue = document.getElementById("cargue")
      cargue?.classList.remove("descargue")

      var cargue_des = document.getElementById("descargue")
      cargue_des?.classList.add("descargue")
    }
  }
  validar_informacion(infor: string, nombre: string) {
    const elemento = document.getElementById(nombre) as HTMLElement
    if (!infor || infor === "" || infor === "---" ) {
      
      elemento!.style.cssText = "background-color: darkred; color: white;"

      this.valicaion_array.push("false")
    } else {

      elemento!.style.cssText = "background-color: darkgreen; color: white"
      this.formData.append(nombre, infor);

      this.valicaion_array.push("true")

    }

  }
  valicacion_array_funcion(valicaion_array: string[]) {

    for (let index in valicaion_array) {
      if (valicaion_array[index] === "false") {
        return false
      }
    }
    return true
  }
  clear() {
    window.location.reload()
    this.inf_btn = true
    this.inf_btnuew = false
  }
  cargue_eventos(form : NgForm){
    const fecha_evento =  form.value.fecha_evento
    const tipo_evento =  form.value.tipo_evento
    const divi_padre =  form.value.divi_padre
    const enemigo =  form.value.enemigo
    const resumen =  form.value.resumen
    
 
    this.validar_informacion(fecha_evento, "fecha_evento")
    this.validar_informacion(tipo_evento, "tipo_evento")
    this.validar_informacion(divi_padre, "divi_padre")
    this.validar_informacion(enemigo, "enemigo")
    this.validar_informacion(resumen, "resumen")

    
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));


    this.validacion = this.valicacion_array_funcion(this.valicaion_array)

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    if (!this.validacion) {
      this.inf_a = true

      this.inf_c_g = String("Debe de llenar toda la información")
      for (let i in this.valicaion_array) {
        this.valicaion_array.splice(parseInt(i))
      }
      var espiner = document.getElementById("espiner")
      espiner?.classList.remove("lds-spinner")


    } else {
      
        this.api_serve.guardar_eventos_relevantes(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            // console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
              if (key === "respuesta") {
                this.inf_c_g = String(dato)
              }
              if (key === "alertas") {
                sessionStorage.removeItem("alertas")
                sessionStorage.setItem("alertas", JSON.stringify(dato))
              }
            });

            this.inf_g = true
            this.inf_a = false
            // this.inf_c_g = String(result)
            this.inf_btn = false
            this.inf_btnuew = true

            var espiner = document.getElementById("espiner")
            espiner?.classList.remove("lds-spinner")

          },
          error: (err: HttpErrorResponse) => {

            this.inf_a = true
            this.inf_g = false
            this.inf_c_g = String("error de conexion")
          }
        })
      
    }
  }

  descargar(form : NgForm){
    const fecha_evento_inicio = form.value.fecha_evento_inicio
    const fecha_evento_final = form.value.fecha_evento_final
    const tipo_evento = form.value.tipo_evento
    const divi_padre = form.value.divi_padre
    const enemigo = form.value.enemigo


    this.validar_informacion(fecha_evento_inicio, "fecha_evento_inicio")
    this.validar_informacion(fecha_evento_final, "fecha_evento_final")


    
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("tipo_evento",tipo_evento );
    this.formData.append("divi_padre",divi_padre );
    this.formData.append("enemigo",enemigo );
    
    this.validacion = this.valicacion_array_funcion(this.valicaion_array)

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    
    if (!this.validacion) {
      this.inf_a = true

      this.inf_c_g = String("Debe de llenar toda la información")
      for (let i in this.valicaion_array) {
        this.valicaion_array.splice(parseInt(i))
      }
      var espiner = document.getElementById("espiner")
      espiner?.classList.remove("lds-spinner")


    } else {
      
        this.api_serve.guardar_eventos_relevantes_descargar(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            // console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
        
        
              if (key === "nombre") {
                this.nombre = String(dato);
        
              }
        
              if (key === "link") {
                this.link = String(dato);
        
              }
              
              
            });
            const a_href = document.createElement('a')
        
            a_href.href = this.link
            a_href.download = this.nombre
            //  console.log("http://172.22.2.36:5198" +this.link)
            
        
            a_href.click()

            this.inf_g = true
            this.inf_a = false
            // this.inf_c_g = String(result)
            var espiner = document.getElementById("espiner")
            espiner?.classList.remove("lds-spinner")
            

          },
          error: (err: HttpErrorResponse) => {

            this.inf_a = true
            this.inf_g = false
            this.inf_c_g = String("error de conexion")
          }
        })
      
    }
  }
}
