import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-listados-anexo1',
  templateUrl: './listados-anexo1.component.html',
  styleUrls: ['./listados-anexo1.component.css']
})
export class ListadosAnexo1Component {
  constructor(private usuarios: SelectoresService, private router: Router, private permisos :PermisosService, private cookie: CookieService, private api_serve: ServiceConecionService  ) {}
  lis_usuarios :String[]=[]
  listado_usurios:String[]=[]

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData = new FormData();
  validacion: boolean = false
  validar_nombre: boolean = false
  info(id:number){
    // // console.log(this.listado_usurios[id])
    // this.id_personal = this.permisos.persona_dirop(this.listado_usurios[id])
    // // console.log(this.id_personal)
    // this.select_personal()
    // 
  }
  buscar(form: NgForm){
    const cedula = form.value.cedula
    const fecha = form.value.fecha

    
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("cedula", cedula);
    this.formData.append("fecha", fecha);
    

    this.api_serve.personal_ingreso_fuera_combate(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key
          if (key === "respuesta") {
            this.inf_c_g = String(dato)
          }
          if (key === "afectaciones_anexo_1") {
            sessionStorage.removeItem("afectaciones_anexo_1")
            sessionStorage.setItem("afectaciones_anexo_1", JSON.stringify(dato))
            this.lis_usuarios = JSON.parse(sessionStorage.getItem("afectaciones_anexo_1")!)
            this.listado_usurios =  this.usuarios.array_listados(this.lis_usuarios)
            console.log(this.listado_usurios)
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
}
