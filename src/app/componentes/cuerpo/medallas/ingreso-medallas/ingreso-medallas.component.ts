import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-ingreso-medallas',
  templateUrl: './ingreso-medallas.component.html',
  styleUrls: ['./ingreso-medallas.component.css']
})
export class IngresoMedallasComponent {
  constructor(private usuarios: SelectoresService,  private menu_service: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService) { 
    this.listado_asignados()
  }
  grd_recibe = this.menu_service.gr_cdte
  arma = this.menu_service.arma


  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false


  inf_btn: boolean = true
  inf_btnuew: boolean = false
  img: string = "../../../../../assets/medallas/JEMOP-DIROP.png"
  inicio: string = ""
  final: boolean = false
  final_2:boolean = true

  valicaion_array: string[] = []
  formData = new FormData();
  validacion: boolean = false
  proyectos_listado:string[] = []
  proyectos_listado_final :String[] = []
  radicado:string=""
  departamentos_filtrados = this.usuarios.departamentos_unicos()
  unidad_selecionada_municipios: string[] = []

  departamento: string = "---"
  municipios: string = "---"

  usuario = this.cookie.get("fullname")

  ngOnInit(): void {

    this.proyectos_listado_final = this.usuarios.array_listados(this.proyectos_listado)
 

    this.listado_asignados()

   
  }
  departamentos(evaluar: number, respuesta: number) {

    for (let i in this.departamentos_filtrados) {
      this.unidad_selecionada_municipios.splice(parseInt(i))
    }
    this.unidad_selecionada_municipios = this.usuarios.unidades_filtradas(this.departamento, evaluar, respuesta)

  }
  dos_fecha(form: NgForm) {
    const motivo = form.value.motivo


    if (motivo === "Gestion de Comando") {
      this.final_2 = false
      this.final = true
    } else {
      this.final_2 = true
      this.final = false
    }

  }
  cambio_img(form: NgForm) {

    const medalla = form.value.medalla

    if (medalla === "MEDALLA DESEMPEÑO OPERACIONAL") {

      this.img = "../../../../../assets/medallas/ORDEN_PUBLICO.png"
    }

    if (medalla === "MEDALLA AL VALOR") {

      this.img = "../../../../../assets/medallas/AL_VALOR.png"
    }
    if (medalla === "MEDALLA HERIDOS EN ACCIÓN") {

      this.img = "../../../../../assets/medallas/HERIDOS.png"
    }
    if (medalla === "MEDALLA A LA BANDERA DE GUERRA") {

      this.img = "../../../../../assets/medallas/colombia.png"
    }
    if (medalla === "") {

      this.img = "../../../../../assets/medallas/JEMOP-DIROP.png"
    }


  }
  mostrar_proyecto(){
    var proyecto =  document.getElementById("proyecto_ingreso")
    proyecto?.classList.toggle("oculto")
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
  clear() {
    window.location.reload()
    this.inf_btn = true
    this.inf_btnuew = false
    this.listado_asignados()
  }

  
  guardar_proyecto(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
    
    const proyecto_registro =  form.value.proyecto_registro



    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(proyecto_registro, "proyecto_registro")
    
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

      this.api_serve.creacion_proyecto(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key

            if (key === "proyectos") {
              sessionStorage.removeItem("proyectos")
              sessionStorage.setItem("proyectos", JSON.stringify(dato))
              this.proyectos_listado = JSON.parse(sessionStorage.getItem("proyectos")!)
            }
          });
         
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
  guardar(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div

    
    const recibidad_por =  form.value.recibidad_por
    const medalla =  form.value.medalla
    const fecha_ingreso =  form.value.fecha_ingreso
    const fecha_mes =  form.value.fecha_mes
    const oficio =  form.value.oficio
    const radicado =  form.value.radicado
    const batallon =  form.value.batallon
    const brigada =  form.value.brigada
    const division =  form.value.division
    const grd =  form.value.grd
    const arma =  form.value.arma
    const cedula =  form.value.cedula
    const nombre_apellido =  form.value.nombre_apellido
    const categoria =  form.value.categoria
    const operacion =  form.value.operacion
    const motivo =  form.value.motivo
    const fecha_hecho =  form.value.fecha_hecho
    const fecha_hecho_final =  form.value.fecha_hecho_final
    const veredad =  form.value.veredad
    const amenaza =  form.value.amenaza
    const resumen =  form.value.resumen

    const proyecto =  form.value.proyecto
    const departamento =  form.value.departamento
    const municipio =  form.value.municipio
    const como =  form.value.como
    const area_de_responsabilidad =  form.value.area_de_responsabilidad
    
    

    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(medalla, "medalla")
    
    this.validDates(fecha_ingreso, "fecha_ingreso")
    this.validar_informacion(fecha_ingreso, "fecha_ingreso")

    this.validDates(fecha_mes, "fecha_mes")
    this.validar_informacion(fecha_mes, "fecha_mes")
    this.validar_informacion(radicado, "radicado")
    this.validar_informacion(batallon, "batallon")
    this.validar_informacion(brigada, "brigada")
    this.validar_informacion(division, "division")

    this.validar_informacion(grd, "grd")
    this.validar_informacion(arma, "arma")
    this.validar_informacion(cedula, "cedula")

    this.validar_informacion(nombre_apellido, "nombre_apellido")
    this.validar_informacion(categoria, "categoria")
    this.validar_informacion(operacion, "operacion")
    this.validar_informacion(motivo, "motivo")

    this.validDates(fecha_hecho, "fecha_hecho")
    this.validar_informacion(fecha_hecho, "fecha_hecho")
    this.validar_informacion(motivo, "motivo")

    this.validar_informacion(veredad, "veredad")
    this.validar_informacion(amenaza, "amenaza")
    this.validar_informacion(resumen, "resumen")
    this.validar_informacion(proyecto, "proyecto")
    this.validar_informacion(departamento, "departamento")

    this.formData.append("oficio", oficio);
    this.formData.append("como", como);
    this.formData.append("area_de_responsabilidad", area_de_responsabilidad);

    this.formData.append("municipio", municipio);
    this.validDates(fecha_hecho_final, "fecha_hecho_final")
    this.validar_informacion(fecha_hecho_final, "fecha_hecho_final")

    this.formData.append("recibidad_por", recibidad_por);


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

      this.api_serve.gurdar_medalla(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "dato") {
              this.inf_c_g = String(dato)
            }
            if (key === "radicado") {
              this.radicado = dato
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
  listado_asignados() {

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //plazos
    this.api_serve.plazos_inicial(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "proyectos") {
            sessionStorage.removeItem("proyectos")
            sessionStorage.setItem("proyectos", JSON.stringify(dato))
            this.proyectos_listado = JSON.parse(sessionStorage.getItem("proyectos")!)

          }
          if (key === "radicado") {

            this.radicado = dato

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
