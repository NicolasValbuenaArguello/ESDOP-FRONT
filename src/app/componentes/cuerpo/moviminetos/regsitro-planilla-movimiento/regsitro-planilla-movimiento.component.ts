import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-regsitro-planilla-movimiento',
  templateUrl: './regsitro-planilla-movimiento.component.html',
  styleUrls: ['./regsitro-planilla-movimiento.component.css']
})
export class RegsitroPlanillaMovimientoComponent {
  constructor(private usuarios: SelectoresService,   private cookie: CookieService, private api_serve: ServiceConecionService) { 
    this.listado_asignados()
  }

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false


  inf_btn: boolean = true
  inf_btnuew: boolean = false

  
  valicaion_array: string[] = []
  formData = new FormData();
  validacion: boolean = false
  listado_unidades_solicitantes:string[] = []
  listado_unidades_solicitantes_final :String[] = []
  ngOnInit(): void {

    this.listado_unidades_solicitantes_final = this.usuarios.array_listados(this.listado_unidades_solicitantes)
 

    this.listado_asignados()

   
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
  guardar_movimiento(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
    
    const hr_movimiento =  form.value.hr_movimiento
    const fecha_inicio =  form.value.fecha_inicio
    const fecha_termino =  form.value.fecha_termino
    const unidad_solicitante =  form.value.unidad_solicitante
    const tipo_escolta =  form.value.tipo_escolta
    const ruta_completa =  form.value.ruta_completa
    const motivos_escolta =  form.value.motivos_escolta
    const unidades_comprometidas =  form.value.unidades_comprometidas
    const hr_unidad =  form.value.hr_unidad
    const cantidad_vehiculos =  form.value.cantidad_vehiculos
    const cantidad_faces =  form.value.cantidad_faces
    const encargado_material =  form.value.encargado_material
    const telefono =  form.value.telefono


    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(hr_movimiento, "hr_movimiento")
    this.validDates(fecha_inicio, "fecha_inicio")
    this.validar_informacion(fecha_inicio, "fecha_inicio")
    this.validDates(fecha_termino, "fecha_termino")
    this.validar_informacion(fecha_termino, "fecha_termino")
    this.validar_informacion(unidad_solicitante, "unidad_solicitante")
    this.validar_informacion(tipo_escolta, "tipo_escolta")
    this.validar_informacion(ruta_completa, "ruta_completa")
    this.validar_informacion(motivos_escolta, "motivos_escolta")
    this.validar_informacion(unidades_comprometidas, "unidades_comprometidas")
    this.validar_informacion(hr_unidad, "hr_unidad")
    this.validar_informacion(cantidad_vehiculos, "cantidad_vehiculos")
    this.validar_informacion(cantidad_faces, "cantidad_faces")
    this.validar_informacion(encargado_material, "encargado_material")
    this.validar_informacion(telefono, "telefono")
    
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
      
      this.api_serve.crear_movimiento(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key

            if (key === "listado_unidades_solicitantes") {
              sessionStorage.removeItem("listado_unidades_solicitantes")
              sessionStorage.setItem("listado_unidades_solicitantes", JSON.stringify(dato))
              this.listado_unidades_solicitantes = JSON.parse(sessionStorage.getItem("listado_unidades_solicitantes")!)
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
    this.api_serve.listado_unidad_solictante(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "listado_unidades_solicitantes") {
            sessionStorage.removeItem("listado_unidades_solicitantes")
            sessionStorage.setItem("listado_unidades_solicitantes", JSON.stringify(dato))
            this.listado_unidades_solicitantes = JSON.parse(sessionStorage.getItem("listado_unidades_solicitantes")!)

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
