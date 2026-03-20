import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';


@Component({
  selector: 'app-cargue-insitop',
  templateUrl: './cargue-insitop.component.html',
  styleUrls: ['./cargue-insitop.component.css']
})
export class CargueInsitopComponent implements OnInit {

  constructor(private api_serve: ServiceConecionService,  private cookie: CookieService, private usuarios: SelectoresService,) {
    //this.listado_insitop()
   }

  inf_u:boolean=false
  inf_c:string

  inf_r:boolean = false
  inf_c_r:string

  inf_h: boolean =false
  inf_c_h:string

  inf_g: boolean =false
  inf_c_g:string

  inf_i:boolean = false
  inf_i_g:string 

  inf_a: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData =  new FormData()

  listado_insitop_app: string[] = []
  listado_insitop_app_final: String[] = []

  
  ngOnInit(): void {

    this.listado_insitop_app_final = this.usuarios.array_listados(this.listado_insitop_app)


    this.listado_insitop()



  }
  
  hechos(){
    const file_hechos  = document.getElementById("archi_insitop")
    file_hechos?.click()
  }

  leer_hechos(event: Event){

    const file_hechos  = document.getElementById("archi_insitop") as HTMLInputElement
    let leer_hechos_name = file_hechos.files![0].name

    const target = event.target as HTMLInputElement;
    const file: FileList  | null= target.files

    if (file!.length <0 && file != null) {
      Array.prototype.forEach.call(file, (file: File)=>{
        this.formData.append("archi_insitop", file)
      })
    }
    this.inf_u=true
    this.inf_c=leer_hechos_name

  }
  llenar_documentos_acta(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
      this.formData.append("archi_insitop_2", "---");
    } else {
      this.formData.append(nombre, "---");
      this.formData.append("archi_insitop_2", "-//-");
    }
  }
  guardar(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
    
    const archi_insitop_2 = document.getElementById("archi_insitop") as HTMLInputElement
    let archi_insitop = archi_insitop_2.files![0]
    this.llenar_documentos_acta("archi_insitop", archi_insitop)

    // console.log(typeof(m_l))
    // console.log(m_l)

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    
//cargar_inistop_url: 5010

        this.api_serve.Cargar_insitop_f(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            // console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
              if (key === "informacion_insitop") {
                this.inf_i_g = String(dato)
              }
            });
            this.listado_insitop()
            
            this.inf_i = true
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
  listado_insitop() {

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //plazos
    

    this.api_serve.listado_inistop(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "listado_insitop") {
            sessionStorage.removeItem("listado_insitop")
            sessionStorage.setItem("listado_insitop", JSON.stringify(dato))
            this.listado_insitop_app = JSON.parse(sessionStorage.getItem("listado_insitop")!)

          }

          //this.router.navigate(["/ver_informacon_personal"])

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
