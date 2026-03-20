import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent {
  per_update  : boolean
  id_inventarios_unidad = this.permisos.id_inventarios_unidad
  constructor(private usuarios: SelectoresService, private router: Router, private permisos :PermisosService, private cookie: CookieService, private api_serve: ServiceConecionService  ) {
    this.per_update = this.validar_estado(this.cookie.get("per_update"))
    // *ngIf="per_update"
   }
  
  listado_usurios:String[]=[]
  formData = new FormData();

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  lis_usuarios:{} = JSON.parse(sessionStorage.getItem("listado_inventarios")!)
  // 

  // console.log(this.menu_service.listado_usurios )
  ngOnInit(): void {

    
    this.listado_usurios =  this.usuarios.array_listados(this.lis_usuarios)
    // console.log(this.lis_usuarios)
  }
  info(id:number){
    // console.log(this.listado_usurios[id])
    this.id_inventarios_unidad = this.permisos.inventarios_unidad(this.listado_usurios[id])
    // console.log(this.id_personal)
    this.select_personal()
    // 
  }
 // this.router.navigate(["/inf_event"])


 select_personal() {
  this.formData.append("id_inventarios_unidad", String(this.id_inventarios_unidad));

  this.api_serve.inventarios_select(this.formData).subscribe({
    next: (result: HttpResponse<any>) => {
      console.log(result)
      Object.entries(result).forEach(([key, value]) => {
        var dato = value
        var key = key
        if (key === "respuesta") {
          this.inf_c_g = String(dato)
        }
        if (key === "asesorios_inventarios") {
          sessionStorage.removeItem("asesorios_inventarios")
          sessionStorage.setItem("asesorios_inventarios", JSON.stringify(dato))
        }
        if (key === "observaciones_inventarios") {
          sessionStorage.removeItem("observaciones_inventarios")
          sessionStorage.setItem("observaciones_inventarios", JSON.stringify(dato))
        }

        this.router.navigate(["/detalle_intentario"])
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


 validar_estado(dato:string){

  var dato_r = false

  if (dato==="1") {
    dato_r = true
  }else{
    dato_r = false
  }
  return dato_r

}
}
