import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent {
  constructor( private menu_service: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService) {  }
  
  ngAfterViewInit(): void {
    this.listado_asignados()
  }
  grd_recibe = this.menu_service.gr_cdte
  
  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false


  inf_btn: boolean = true
  inf_btnuew: boolean = false
  inf_btn_edit: boolean = false

  
  valicaion_array: string[] = []
  formData = new FormData();
  validacion: boolean = false
  listado_boletin_ooperacional_registrado:string[] = []
  listado_boletin_ooperacional_registrado_final :String[] = []

  id:string=""
  numero_boletin:string =""
  fecha:string =""
  grado_ofi:string =""
  apellidos_nombres_ofi:string =""
  grado_sub:string =""
  apellidos_nombres_sub:string =""

cargar_informacion(item:string){
  this.id = item[0]
  this.numero_boletin = item[1]
  this.fecha = item[2]
  this.grado_ofi = item[3]
  this.apellidos_nombres_ofi = item[4]
  this.grado_sub = item[5]
  this.apellidos_nombres_sub = item[6]
  this.inf_btn_edit = true
  this.inf_btn  = false
}
nuevo(){
  this.id = ""
  this.numero_boletin = ""
  this.fecha = ""
  this.grado_ofi = ""
  this.apellidos_nombres_ofi = ""
  this.grado_sub = ""
  this.apellidos_nombres_sub = ""
  this.inf_btn_edit = false
  this.inf_btn  = true
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
    this.listado_asignados()
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
  eliminar_info() {

    this.formData.append("id", this.id);
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
      // 
    
      this.api_serve.eliminar_registro_boletin(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key

            if (key === "listado_boletin_ooperacional_registrado") {
              sessionStorage.removeItem("listado_boletin_ooperacional_registrado")
              sessionStorage.setItem("listado_boletin_ooperacional_registrado", JSON.stringify(dato))
              this.listado_boletin_ooperacional_registrado = JSON.parse(sessionStorage.getItem("listado_boletin_ooperacional_registrado")!)
            }
            if (key === "respuesta") {
              this.inf_c_g = String(dato)
            }
          });

          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")

          this.inf_g = true
          this.inf_a = false
          // this.inf_c_g = String(result)
          this.inf_btn = false
          this.inf_btn_edit = false
          this.inf_btnuew = true

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

  editar_info(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
    
    const numero_boletin =  form.value.numero_boletin
    const fecha =  form.value.fecha
    const grado_ofi =  form.value.grado_ofi
    const apellidos_nombres_ofi =  form.value.apellidos_nombres_ofi
    const grado_sub =  form.value.grado_sub
    const apellidos_nombres_sub =  form.value.apellidos_nombres_sub


    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(numero_boletin, "numero_boletin")
    this.validDates(fecha, "fecha")
    this.validar_informacion(fecha, "fecha")
    this.validar_informacion(grado_ofi, "grado_ofi")
    this.validar_informacion(apellidos_nombres_ofi, "apellidos_nombres_ofi")
    this.validar_informacion(grado_sub, "grado_sub")
    this.validar_informacion(apellidos_nombres_sub, "apellidos_nombres_sub")


    this.formData.append("id", this.id);
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
      // 
      

      this.api_serve.editar_registro_boletin(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key

            if (key === "listado_boletin_ooperacional_registrado") {
              sessionStorage.removeItem("listado_boletin_ooperacional_registrado")
              sessionStorage.setItem("listado_boletin_ooperacional_registrado", JSON.stringify(dato))
              this.listado_boletin_ooperacional_registrado = JSON.parse(sessionStorage.getItem("listado_boletin_ooperacional_registrado")!)
            }
            if (key === "respuesta") {
              this.inf_c_g = String(dato)
            }
          });

          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")

          this.inf_g = true
          this.inf_a = false
          // this.inf_c_g = String(result)
          this.inf_btn = false
          this.inf_btn_edit = false
          this.inf_btnuew = true

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

  guardar_boletin(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
    
    const numero_boletin =  form.value.numero_boletin
    const fecha =  form.value.fecha
    const grado_ofi =  form.value.grado_ofi
    const apellidos_nombres_ofi =  form.value.apellidos_nombres_ofi
    const grado_sub =  form.value.grado_sub
    const apellidos_nombres_sub =  form.value.apellidos_nombres_sub


    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(numero_boletin, "numero_boletin")
    this.validDates(fecha, "fecha")
    this.validar_informacion(fecha, "fecha")
    this.validar_informacion(grado_ofi, "grado_ofi")
    this.validar_informacion(apellidos_nombres_ofi, "apellidos_nombres_ofi")
    this.validar_informacion(grado_sub, "grado_sub")
    this.validar_informacion(apellidos_nombres_sub, "apellidos_nombres_sub")

    
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
      // 
      
      this.api_serve.registro_boletin(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key

            if (key === "listado_boletin_ooperacional_registrado") {
              sessionStorage.removeItem("listado_boletin_ooperacional_registrado")
              sessionStorage.setItem("listado_boletin_ooperacional_registrado", JSON.stringify(dato))
              this.listado_boletin_ooperacional_registrado = JSON.parse(sessionStorage.getItem("listado_boletin_ooperacional_registrado")!)
            }
            if (key === "respuesta") {
              this.inf_c_g = String(dato)
            }
          });

          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")

          this.inf_g = true
          this.inf_a = false
          // this.inf_c_g = String(result)
          this.inf_btn = false
          this.inf_btnuew = true

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

  listado_asignados() {

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //
    this.api_serve.ver_registro_boletin(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "listado_boletin_ooperacional_registrado") {
            sessionStorage.removeItem("listado_boletin_ooperacional_registrado")
            sessionStorage.setItem("listado_boletin_ooperacional_registrado", JSON.stringify(dato))
            this.listado_boletin_ooperacional_registrado = JSON.parse(sessionStorage.getItem("listado_boletin_ooperacional_registrado")!)

          }
          
        });
        
        // this.inf_c_g = String(result)

        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
        //this.contar()

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
