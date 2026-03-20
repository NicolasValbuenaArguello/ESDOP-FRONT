import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-resgitro-unidad-solictante',
  templateUrl: './resgitro-unidad-solictante.component.html',
  styleUrls: ['./resgitro-unidad-solictante.component.css']
})
export class ResgitroUnidadSolictanteComponent {

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
  guardar_unidad(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
    
    const unidad_solitante =  form.value.unidad_solitante



    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(unidad_solitante, "unidad_solitante")
    
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

      this.api_serve.creacion_unidad_solictante(this.formData).subscribe({
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
