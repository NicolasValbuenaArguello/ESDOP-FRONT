import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-crear-planilla-movimiento',
  templateUrl: './crear-planilla-movimiento.component.html',
  styleUrls: ['./crear-planilla-movimiento.component.css']
})
export class CrearPlanillaMovimientoComponent {

  constructor(private usuarios: SelectoresService,   private cookie: CookieService, private api_serve: ServiceConecionService) { 
  }

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false


  inf_btn: boolean = true
  inf_btnuew: boolean = false

  
  valicaion_array: string[] = []
  formData = new FormData();
  validacion: boolean = false
  listado_movimientos_creados:string[] = []
  listado_movimientos_creados_final :String[] = []

  movimiento_selecionado_planilla :string[] = []

  nombre: string = ""
  link: string = ""

  celecionar_celda(item: string){
    var celda = document.getElementById(item[1])
    var generar_planilla = document.getElementById("generar_planilla")
    
    celda?.classList.remove("oculto")


    if(!this.movimiento_selecionado_planilla.includes(item[1])){
      this.movimiento_selecionado_planilla.push(item[1])
    }
    else{
      celda?.classList.add("oculto")
    
      var indice = this.movimiento_selecionado_planilla.indexOf(item[1]); // obtenemos el indice
      this.movimiento_selecionado_planilla = this.movimiento_selecionado_planilla.filter(function(i) { return i !== item[1] }); // filtramos
    }

    if (this.movimiento_selecionado_planilla.length > 0) {
      generar_planilla?.classList.remove("oculto")
    } else {
      generar_planilla?.classList.add("oculto")
    }
    
  }
 quitar_selecion(item:string){
  var celda = document.getElementById(item)
  var generar_planilla = document.getElementById("generar_planilla")
  celda?.classList.add("oculto")

  var indice = this.movimiento_selecionado_planilla.indexOf(item); // obtenemos el indice
  this.movimiento_selecionado_planilla = this.movimiento_selecionado_planilla.filter(function(i) { return i !== item }); // filtramos
  if (this.movimiento_selecionado_planilla.length > 0) {
    generar_planilla?.classList.remove("oculto")
  } else {
    generar_planilla?.classList.add("oculto")
  }
 }
  listado_asignados(form: NgForm) {

    const fecha_inicio =  form.value.fecha_inicio
    const fecha_termino =  form.value.fecha_termino

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("fecha_inicio", fecha_inicio);
    this.formData.append("fecha_termino", fecha_termino);

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //
    this.api_serve.listado_movimientos(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "listado_movimientos_creados") {
            sessionStorage.removeItem("listado_movimientos_creados")
            sessionStorage.setItem("listado_movimientos_creados", JSON.stringify(dato))
            this.listado_movimientos_creados = JSON.parse(sessionStorage.getItem("listado_movimientos_creados")!)

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
  planilla(form: NgForm) {

    const numero_planilla =  form.value.numero_planilla
    const fecha_planilla =  form.value.fecha_planilla

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("numero_planilla", numero_planilla);
    this.formData.append("fecha_planilla", fecha_planilla);
    this.formData.append("listados_orfeo", String(this.movimiento_selecionado_planilla));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //
    this.api_serve.crear_planilla_moviento(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "nombre") {
            this.nombre = String(dato);

          }

          if (key === "link") {
            this.link = String(dato);

          }
          if (key === "error") {
            this.link = String(dato);
                    // this.inf_c_g = String(result)
        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")

          }
          ""


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
        // console.log(err)
        this.inf_c_g = String("error de conexion")

        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
      }
    })

  }

}
