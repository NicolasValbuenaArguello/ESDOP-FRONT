import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-listados-aetcr',
  templateUrl: './listados-aetcr.component.html',
  styleUrls: ['./listados-aetcr.component.css']
})
export class ListadosAetcrComponent {

  constructor(private usuarios: SelectoresService, private router: Router, private permisos :PermisosService, private cookie: CookieService, private api_serve: ServiceConecionService  ) {

    this.listado()
    //this.per_update = this.validar_estado(this.cookie.get("per_update"))
    // *ngIf="per_update"
    //console.log(this.listado_aetcr)
   }
  validar_estado(arg0: string): boolean {
    throw new Error('Method not implemented.');
  }

   
  per_update  : boolean
  id_aetcr:string

  listado_aetcr:String[]=[]
  formData = new FormData();

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  informacion(id:string){
    // console.log(this.listado_usurios[id])
    this.id_aetcr = id
    // console.log(this.id_personal)
    this.select_personal()

    

    this.router.navigate(["/informacion_aetcr_e"])
    // 
  }


  informacion_peloton(id:string){
    // console.log(this.listado_usurios[id])
    this.id_aetcr = id
    // console.log(this.id_personal)
    this.select_personal()

    this.router.navigate(["/peloton_aetcr"])
    // 
  }
  
 select_personal() {
  this.formData.append("id_aetcr", String(this.id_aetcr));

  this.api_serve.info_aetcr(this.formData).subscribe({
    next: (result: HttpResponse<any>) => {
   
      Object.entries(result).forEach(([key, value]) => {
        var dato = value
        var key = key

        if (key === "informacion_aetcr") {
          sessionStorage.removeItem("informacion_aetcr")
          sessionStorage.setItem("informacion_aetcr", JSON.stringify(dato))
        }

        if (key === "cantidad_anios") {
          sessionStorage.removeItem("cantidad_anios")
          sessionStorage.setItem("cantidad_anios", JSON.stringify(dato))
        }

        if (key === "servicios_pubicos") {
          sessionStorage.removeItem("servicios_pubicos")
          sessionStorage.setItem("servicios_pubicos", JSON.stringify(dato))
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
    }
  })

}
listado() {
  this.formData.append("permiso", String("permiso"));

  this.api_serve.listados_aetcr(this.formData).subscribe({
    next: (result: HttpResponse<any>) => {
      //console.log(result)
      Object.entries(result).forEach(([key, value]) => {
        var dato = value
        var key = key

        if (key === "listado_aetcr") {
          sessionStorage.removeItem("listado_aetcr")
          sessionStorage.setItem("listado_aetcr", JSON.stringify(dato))
          
        }
        //this.router.navigate(["/ver_informacon_personal"])
        this.listado_aetcr = JSON.parse(sessionStorage.getItem("listado_aetcr")!)
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
    }
  })

}
}
