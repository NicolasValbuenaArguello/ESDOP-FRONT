import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-ingreso-personal',
  templateUrl: './ingreso-personal.component.html',
  styleUrls: ['./ingreso-personal.component.css']
})
export class IngresoPersonalComponent {
  constructor(private menu_service :  SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService){}
  grd = this.menu_service.gr_cdte
  departamentos_filtrados = this.menu_service.departamentos_unicos()
  departamentos_filtrados_2 = this.menu_service.departamentos_unicos()
  departamento: string = "---"
  departamento_fuera: string = "---"
  municipios: string = "---"
  unidad_selecionada_municipios: string[] = []
  unidad_selecionada_municipios_2: string[] = []

  time_unidad:Boolean = false
  tiempo_unidad:string = "0 años"

  time_cargo:Boolean = false
  tiempo_cargo:string = "0 años"

  time_ascenso:Boolean = false
  tiempo_ascenso:string = "0 años"

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData = new FormData();
  validacion: boolean = false
  validar_nombre: boolean = false

  cargos_dirop = this.menu_service.cargos


  img:string = "../../../../../assets/img_user/user.jpg"
  departamentos(evaluar: number, respuesta: number) {

    for (let i in this.departamentos_filtrados) {
      this.unidad_selecionada_municipios.splice(parseInt(i))
    }
    this.unidad_selecionada_municipios = this.menu_service.unidades_filtradas(this.departamento, evaluar, respuesta)

  }
  departamentos_2(evaluar: number, respuesta: number) {

    for (let i in this.departamentos_filtrados_2) {
      this.unidad_selecionada_municipios_2.splice(parseInt(i))
    }
    this.unidad_selecionada_municipios_2 = this.menu_service.unidades_filtradas(this.departamento_fuera, evaluar, respuesta)

  }
  cargar_foto(){
    var foto_user =  document.getElementById("foto_user") as HTMLInputElement 
    foto_user.click()
  }
  clear() {
    window.location.reload()
    this.inf_btn = true
    this.inf_btnuew = false
  }
  leer_foto(event: Event){
    let foto_user =  document.getElementById("foto_user")  as HTMLInputElement
     var file = foto_user.files![0];
    //Creamos la url
    var objectURL = URL.createObjectURL(file)
    this.img = objectURL

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
  llenar_documentos(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
    } else {
      this.formData.append(nombre, "---");
      this.valicaion_array.push("false")
      alert("debe selecionar una foto")

    }
  }
  //funcion para calcular fechas
  OnGetNewName(desde:Date,hasta:Date) {
    if(hasta.getTime() - desde.getTime() <=0) return "error";
   
    let dias = hasta.getDate() - desde.getDate(); 
    let meses = hasta.getMonth() - desde.getMonth();
    let anios = hasta.getFullYear() - desde.getFullYear();
   
   
    if(dias<0){
      let primer_dia_proximo_mes = new Date(desde.getFullYear(),desde.getMonth() +1 ,1);
       let diff = primer_dia_proximo_mes.getTime() - desde.getTime();
       let dias_hasta_fin_mes = Math.floor(diff /  (60 * 60 * 24 * 1000));
       dias = dias_hasta_fin_mes + hasta.getDate() - 1;
       meses--;
     }
     
     if(meses<0){
       meses = 12 + meses;
       anios--;
     }
     
     return `${anios} años ${meses} meses ${dias} dias`;
   }
  fecha_trasalado_unidad(form: NgForm){
    const fecha_unidad = form.value.fecha_unidad
    this.tiempo_unidad = this.OnGetNewName(new Date(fecha_unidad),new Date())
    this.time_unidad = true
  }
  fecha_cargo_unidad(form: NgForm){
    const fecha_cargo = form.value.fecha_cargo
    this.tiempo_cargo = this.OnGetNewName(new Date(fecha_cargo),new Date())
    this.time_cargo = true
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
  guardar(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
 
    const foto_user = document.getElementById("foto_user") as HTMLInputElement
    let foto_user_name = foto_user.files![0]
    this.llenar_documentos("foto", foto_user_name)

    const grd = form.value.grd
    const apellidos = form.value.apellidos
    const nombres = form.value.nombres
    const cedula = form.value.cedula
    const cargo = form.value.cargo
    const tel_principal = form.value.tel_principal
    const telefono_alterno = form.value.telefono_alterno
    const correo_ejc = form.value.correo_ejc
    const correo_civil = form.value.correo_civil

    const fecha_unidad = form.value.fecha_unidad
    const fecha_cargo = form.value.fecha_cargo
   

    

    const fecha_cumpleaños =  form.value.fecha_cumpleaños

    const departamento =  form.value.departamento
    const municipio =  form.value.municipio
    const barrio =  form.value.barrio
    const direcion_principal =  form.value.direcion_principal
    const departamento_fuera =  form.value.departamento_fuera
    const municipio_fuera =  form.value.municipio_fuera
    const barrio_fuera =  form.value.barrio_fuera
    const direcion_principal_fuera =  form.value.direcion_principal_fuera

    const nombre_contacto =  form.value.nombre_contacto
    const parentesco =  form.value.parentesco

    
    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(grd, "grd")
    this.validar_informacion(apellidos, "apellidos")
    this.validar_informacion(nombres, "nombres")
    this.validar_informacion(cedula, "cedula")
    this.validDates(fecha_cumpleaños, "fecha_cumpleaños")
    this.validar_informacion(fecha_cumpleaños, "fecha_cumpleaños")
    this.validar_informacion(tel_principal, "tel_principal")

    
    this.validar_informacion(correo_ejc, "correo_ejc")
    this.validar_informacion(correo_civil, "correo_civil")

    this.validar_informacion(departamento, "departamento")
    this.validar_informacion(municipio, "municipio")
    this.validar_informacion(barrio, "barrio")
    this.validar_informacion(direcion_principal, "direcion_principal")

    this.validar_informacion(departamento_fuera, "departamento_fuera")
    this.validar_informacion(municipio_fuera, "municipio_fuera")
    this.validar_informacion(barrio_fuera, "barrio_fuera")
    this.validar_informacion(direcion_principal_fuera, "direcion_principal_fuera")

    this.validar_informacion(telefono_alterno, "telefono_alterno")
    this.validar_informacion(nombre_contacto, "nombre_contacto")
    this.validar_informacion(parentesco, "parentesco")

    //this.validDates(fecha_unidad, "fecha_unidad")
    this.validar_informacion(fecha_unidad, "fecha_unidad")
    this.validar_informacion(cargo, "cargo")
    //this.validDates(fecha_cargo, "fecha_cargo")
    this.validar_informacion(fecha_cargo, "fecha_cargo")

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
        this.api_serve.personal_ingreso(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
              if (key === "respuesta") {
                this.inf_c_g = String(dato)
              }
              if (key === "listado_personal") {
                sessionStorage.removeItem("listado_personal")
                sessionStorage.setItem("listado_personal", JSON.stringify(dato))
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
            var espiner = document.getElementById("espiner")
            espiner?.classList.remove("lds-spinner")
          }
        })
      
    }
    
  }
  
}
