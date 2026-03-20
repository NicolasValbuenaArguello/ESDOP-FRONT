import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-segundo-cdte',
  templateUrl: './segundo-cdte.component.html',
  styleUrls: ['./segundo-cdte.component.css']
})
export class SegundoCdteComponent {
  constructor(private menu_service :  SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService){}
img:string = "../../../../../assets/logos/JEMOP-DIROP.png"

inf_a: boolean = false
inf_c_g: string = "datos"
inf_g: boolean = false

inf_btn: boolean = true
inf_btnuew: boolean = false
valicaion_array: string[] = []
formData = new FormData();
validacion: boolean = false
validar_nombre: boolean = false
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
validDates(fecha: string, nombre: string) {
  let okey: boolean = true;

  try {

    if (fecha.length > 10) {
      throw new Error();
    }


  } catch (error) {
    okey = false;
    const elemento = document.getElementById(nombre) as HTMLElement
    elemento!.style.cssText = "background-color: darkred; color: white;"
    alert("la fecha esta de forma incorrecta")
    this.valicaion_array.push("false")
  }
  return okey;
}
clear() {
  window.location.reload()
  this.inf_btn = true
  this.inf_btnuew = false
}
guardar(form: NgForm) {
  // const numero_boletin_div = form.value.numero_boletin_div

  const nivel_orden = form.value.nivel_orden
  const unidad_que_genera = form.value.unidad_que_genera
  const clasificacion = form.value.clasificacion
  const orden_excel = form.value.orden_excel
  const orfeo = form.value.orfeo
  const doc_radicado = form.value.doc_radicado
  const fecha_orden = form.value.fecha_orden
  const asunto = form.value.asunto
  const orden = form.value.orden
  const obervaciones = form.value.obervaciones



  
  // console.log(typeof(m_l))
  // console.log(m_l)

  this.validar_informacion(nivel_orden, "nivel_orden")
  this.validar_informacion(clasificacion, "clasificacion")
  this.validDates(fecha_orden, "fecha_orden")
  this.validar_informacion(fecha_orden, "fecha_orden")
  this.validar_informacion(asunto, "asunto")
  this.validar_informacion(orden, "orden")

  
  this.formData.append("unidad_que_genera", unidad_que_genera);
  this.formData.append("orfeo", orfeo);
  this.formData.append("doc_radicado", doc_radicado);
  this.formData.append("obervaciones", obervaciones);
  this.formData.append("orden_excel", orden_excel);
  

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
    // console.log(this.formData)
    
      this.api_serve.creacion_plazo(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "respuesta") {
              this.inf_c_g = String(dato)
            }
            if (key === "listado_personal") {
              sessionStorage.removeItem("listado_personal")
              sessionStorage.setItem("listado_personal", JSON.stringify(dato))
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
          // console.log(err)
          this.inf_c_g = String("error de conexion")
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
        }
      })
    
  }
  
}
}
