import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-descargar-q5-listado',
  templateUrl: './descargar-q5-listado.component.html',
  styleUrls: ['./descargar-q5-listado.component.css']
})
export class DescargarQ5ListadoComponent {
    constructor(private usuarios: SelectoresService,   private cookie: CookieService, private api_serve: ServiceConecionService) {   }
    listado_q5_afectaciones:string[] = []
  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false
  formData = new FormData();
  listado_asignados() {

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //
    this.api_serve.cargar_listado_q5(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "listado_q5_afectaciones") {
            sessionStorage.removeItem("listado_q5_afectaciones")
            sessionStorage.setItem("listado_q5_afectaciones", JSON.stringify(dato))
            this.listado_q5_afectaciones = JSON.parse(sessionStorage.getItem("listado_q5_afectaciones")!)

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
