import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent {
  @Input() id: string
  @Input() cedula: string
  @Input() cargo: string
  @Input() tiempo_cargo_bd: string

constructor(private usuarios: SelectoresService,  private cookie: CookieService, private api_serve: ServiceConecionService, private permisos :PermisosService){}
  // this.router.navigate([this.ruta])
  tiempo_cargo: String = ""
  listado_cargos:String[]=[]
  lis_cargos: {} = JSON.parse(sessionStorage.getItem("cargo_personal")!)
  // 
  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData = new FormData();
  validacion: boolean = false
  validar_nombre: boolean = false
  cargos_dirop = this.usuarios.cargos

  // console.log(this.menu_service.listado_usurios )
  ngOnInit(): void {


    this.listado_cargos = this.usuarios.array_listados(this.lis_cargos)
    // console.log(this.lis_usuarios)
  }
  cerrar() {
    var view_dumentos = document.getElementById("view_dumentos")
    view_dumentos?.classList.toggle("documento_oculto")

  }
  OnGetNewName(desde: Date, hasta: Date) {
    if (hasta.getTime() - desde.getTime() <= 0) return "error";

    let dias = hasta.getDate() - desde.getDate();
    let meses = hasta.getMonth() - desde.getMonth();
    let anios = hasta.getFullYear() - desde.getFullYear();


    if (dias < 0) {
      let primer_dia_proximo_mes = new Date(desde.getFullYear(), desde.getMonth() + 1, 1);
      let diff = primer_dia_proximo_mes.getTime() - desde.getTime();
      let dias_hasta_fin_mes = Math.floor(diff / (60 * 60 * 24 * 1000));
      dias = dias_hasta_fin_mes + hasta.getDate() - 1;
      meses--;
    }

    if (meses < 0) {
      meses = 12 + meses;
      anios--;
    }

    return `${anios} años ${meses} meses ${dias} dias`;
  }

  fecha_trasalado_unidad(form: NgForm) {
    const fecha_inicio_cargo = form.value.fecha_inicio_cargo
    const fecha_termino_cargo = form.value.fecha_termino_cargo

    this.tiempo_cargo = this.OnGetNewName(new Date(fecha_inicio_cargo), new Date(fecha_termino_cargo))

  }

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

  guardar(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div


    const cargo = form.value.cargo
    const fecha_inicio_cargo = form.value.fecha_inicio_cargo
    const fecha_termino_cargo = form.value.fecha_termino_cargo


    const tiempo_cargo =  this.tiempo_cargo

    // console.log(typeof(m_l))
    // console.log(m_l)



    this.validar_informacion(cargo, "cargo")
    this.validar_informacion(fecha_inicio_cargo, "fecha_inicio_cargo")
    this.validar_informacion(fecha_termino_cargo, "fecha_termino_cargo")

    this.formData.append("id_personal", this.id );
    this.formData.append("cedula", this.cedula);
    this.formData.append("tiempo_cargo", String(tiempo_cargo));
    
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
        this.api_serve.f_personal_guardar_cargo(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
              if (key === "respuesta") {
                this.inf_c_g = String(dato)
              }
              if (key === "cargo_personal") {
                sessionStorage.removeItem("cargo_personal")
                sessionStorage.setItem("cargo_personal", JSON.stringify(dato))
              }
              var lis_cargos: {} = JSON.parse(sessionStorage.getItem("cargo_personal")!)
              this.listado_cargos = this.usuarios.array_listados(lis_cargos)
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
  eliminar_user(id_lis : number) {
    const id_cargo = this.permisos.cargos_personal(this.listado_cargos[id_lis])
    console.log(id_cargo)
    this.formData.append("id_personal", String(this.id ));
    this.formData.append("id", String(id_cargo));
    


    this.api_serve.f_personal_eliminar_cargo(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key
          if (key === "respuesta") {
            this.inf_c_g = String(dato)
          }
          if (key === "cargo_personal") {
            sessionStorage.removeItem("cargo_personal")
            sessionStorage.setItem("cargo_personal", JSON.stringify(dato))
          }
          var lis_cargos: {} = JSON.parse(sessionStorage.getItem("cargo_personal")!)
          this.listado_cargos = this.usuarios.array_listados(lis_cargos)
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
