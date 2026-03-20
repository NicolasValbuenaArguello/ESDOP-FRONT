import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-ver-bitacora',
  templateUrl: './ver-bitacora.component.html',
  styleUrls: ['./ver-bitacora.component.css']
})
export class VerBitacoraComponent {

  
  constructor(private selector: SelectoresService, private menu_service :  SelectoresService,  private cookie: CookieService, private api_serve: ServiceConecionService){}

  listado_eventos_app: string[] = []
  bitacora_eventos_app: string[] = []
  afectaciones_eventos_app: string[] = []
  inf_evento_re:string=""
  afectacion:string=""
  grd_recibe = this.menu_service.gr_cdte_un
  
  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData = new FormData();
  validacion: boolean = false
  validar_nombre: boolean = false
  inf_r: boolean = false
  inf_c_r: string = "datos "
  bitacora:string[]=[]
  afectaciones:string[]=[]

  afectaciones_asesinados:string[]=[]
  afectaciones_heridos:string[]=[]

  grd:string=""
  nombre:string=""
  afectacio:string=""
  personal:string[]

  nombres_apellidos:string =""
  grados:string =""
  cedula:string =""
  estado_civil:string =""
  tiempo:string =""
  situacion_actual:string =""
  familiares:string =""
  coordinador:string =""
  afectacion_persona:string="Asesinados"

  hora_bitacora:string=""
  evento_bitacora:string=""
  fecha_evento:string=""
  id:string=""
  id_herido:string=""
    
  ngOnInit(): void {

    this.listado_eventos_app = JSON.parse(sessionStorage.getItem("listado_eventos")!)
    this.inf_evento_re = JSON.parse(sessionStorage.getItem("inf_evento_re")!)
    for(let x in this.listado_eventos_app){
      if (this.inf_evento_re === this.listado_eventos_app[x][0]) {
        this.afectacion = this.listado_eventos_app[x][1] + "  "+ this.listado_eventos_app[x][2] + " - "+ this.listado_eventos_app[x][6]+ "  "+ this.listado_eventos_app[x][7]+ this.listado_eventos_app[x][8]+ "  "+ this.listado_eventos_app[x][22]+ " - "+this.listado_eventos_app[x][20]+" "+ this.listado_eventos_app[x][10]+ " ("+this.listado_eventos_app[x][9]+") "
        
      }
    }
    this.listado_asignados()

  }
  cambio_persona(form: NgForm){
    const nombre_inicial = form.value.nombre_inicial

    for(let x in this.afectaciones){
      if(nombre_inicial === this.afectaciones[x][3]){
        this.grados =this.afectaciones[x][2]
        this.nombres_apellidos =this.afectaciones[x][3]
        this.afectacio =this.afectaciones[x][4]
        this.cedula =this.afectaciones[x][5]
        this.estado_civil =this.afectaciones[x][6]
        this.tiempo =this.afectaciones[x][7]
        this.situacion_actual =this.afectaciones[x][8]
        this.familiares =this.afectaciones[x][9]
        this.coordinador =this.afectaciones[x][10]
        this.id_herido =this.afectaciones[x][0]

      }
    }

  }
  close(){
    var proyecto_nuevo_editar = document.getElementById("proyecto_nuevo_editar")
    proyecto_nuevo_editar?.classList.toggle("oculto")
  }

  editar_bitacora(id:string){
    var proyecto_nuevo_editar = document.getElementById("proyecto_nuevo_editar")
    proyecto_nuevo_editar?.classList.toggle("oculto")
    
    for (let x in this.bitacora){
      if(this.bitacora[x][0] == id){
        this.fecha_evento =this.bitacora[x][2]
        this.hora_bitacora = this.bitacora[x][3]
        this.evento_bitacora = this.bitacora[x][4]
        this.id = this.bitacora[x][0]
        
      }

    }


  }
  mostrar_proyecto(){
    var proyecto =  document.getElementById("proyecto_ingreso")
    proyecto?.classList.toggle("oculto")

    var oculto_documentos =  document.getElementById("oculto_documentos")
    var oculto_documentos_modificar =  document.getElementById("oculto_documentos_modificar")
    var oculto_documentos_modificar_personal =  document.getElementById("oculto_documentos_modificar_personal")


    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")
    oculto_documentos_modificar_personal?.classList.remove("oculto_documentos_modificar_personal")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
    oculto_documentos_modificar_personal?.classList.add("oculto_documentos_modificar_personal")
  }  
  mostrar_menu(identificador:number){
    var oculto_documentos =  document.getElementById("oculto_documentos")
    var oculto_documentos_modificar =  document.getElementById("oculto_documentos_modificar")
    var oculto_documentos_modificar_personal =  document.getElementById("oculto_documentos_modificar_personal")

    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")
    oculto_documentos_modificar_personal?.classList.remove("oculto_documentos_modificar_personal")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
    oculto_documentos_modificar_personal?.classList.add("oculto_documentos_modificar_personal")

    
    
    if (identificador == 1) {
      oculto_documentos?.classList.toggle("oculto_documentos")
    }
    if (identificador == 2) {
      oculto_documentos_modificar?.classList.toggle("oculto_documentos_modificar")
    }
    if (identificador == 3) {
      oculto_documentos_modificar_personal?.classList.toggle("oculto_documentos_modificar_personal")
    }
    
  }
  clear() {
    window.location.reload()
    this.inf_btn = true
    this.inf_btnuew = false
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
  validar_informacion_2(infor: number, nombre: string) {
    const elemento = document.getElementById(nombre) as HTMLElement
    if (!infor) {
  
      if (infor == 0) {
        var infor_str = infor.toString()
        elemento!.style.cssText = "background-color: darkgreen; color: white"
        this.formData.append(nombre, infor_str);
  
        this.valicaion_array.push("true")
      } else {
  
        elemento!.style.cssText = "background-color: darkred; color: white;"
  
        this.valicaion_array.push("false")
      }
  
    } else {
  
      var infor_str = infor.toString()
      elemento!.style.cssText = "background-color: darkgreen; color: white"
      this.formData.append(nombre, infor_str);
  
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
  llenar_documentos_acta(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
      this.formData.append("acta_alerta_2", "---");
    } else {
      this.formData.append(nombre, "---");
      this.formData.append("acta_alerta_2", "-//-");
    }
  }
  guardar_afectacion(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
  
  
      const grd = form.value.grd
      const apellidos_nombres = form.value.apellidos_nombres
      const afectacion = form.value.afectacion

    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(grd, "grd")
    this.validar_informacion(apellidos_nombres, "apellidos_nombres")
    this.validar_informacion(afectacion, "afectacion")

    this.formData.append("id_evento", this.inf_evento_re);

  
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
      

      this.api_serve.cargar_afectacion_eventos_relevantes(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "dato") {
              this.inf_c_g = String(dato)
            }
  
          });
  
          this.inf_g = false
          this.inf_a = true
          // this.inf_c_g = String(result)
          this.inf_btn = false
          this.inf_btnuew = true
  
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
          this.listado_asignados()
  
        },
        error: (err: HttpErrorResponse) => {
  
          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")
        }
      })
  
    }
  }
  editar_afectacion(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
  

      const grd = form.value.grd
      const apellidos_nombres = form.value.apellidos_nombres
      const afectacion = form.value.afectacion
      const cedula = form.value.cedula

      const estado_civil = form.value.estado_civil
      const tiempo_servicio = form.value.tiempo_servicio
      const situacion_actual = form.value.situacion_actual
      const familiares = form.value.familiares
      const coordinador = form.value.coordinador

    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(grd, "grd")
    this.validar_informacion(apellidos_nombres, "apellidos_nombres")
    this.validar_informacion(afectacion, "afectacion")

    this.formData.append("id", this.id_herido);
    this.formData.append("estado_civil", estado_civil);
    this.formData.append("tiempo_servicio", tiempo_servicio);
    this.formData.append("cedula", cedula);
    this.formData.append("situacion_actual", situacion_actual);
    this.formData.append("familiares", familiares);
    this.formData.append("coordinador", coordinador);
  
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
      
      
      this.api_serve.editar_afectacion_eventos_relevantes(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "dato") {
              this.inf_c_g = String(dato)
            }
  
          });
  
          this.inf_g = false
          this.inf_a = true
          // this.inf_c_g = String(result)
          this.inf_btn = false
          this.inf_btnuew = true
  
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
          this.listado_asignados()
  
        },
        error: (err: HttpErrorResponse) => {
  
          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")
        }
      })
  
    }
  }
  guardar_evento(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
  
  
      const hora_evento = form.value.hora_evento
      const fecha_evento = form.value.fecha_evento
      const evento = form.value.evento
      

    // console.log(typeof(m_l))
    // console.log(m_l)
  

  
    this.validar_informacion(hora_evento, "hora_evento")
    this.validar_informacion(evento, "evento")
    this.validar_informacion(fecha_evento, "fecha_evento")
    this.formData.append("id_evento", this.inf_evento_re);

  
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
      
      this.api_serve.cargar_bitacora_eventos_relevantes(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "dato") {
              this.inf_c_g = String(dato)
            }
  
          });
  
          this.inf_g = false
          this.inf_a = true
          // this.inf_c_g = String(result)
          this.inf_btn = false
          this.inf_btnuew = true
  
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
          this.listado_asignados()
  
        },
        error: (err: HttpErrorResponse) => {
  
          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")
        }
      })
  
    }
  }
  guardar_evento_editar(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
  
  
    const hora_evento = form.value.hora_evento
    const fecha_evento = form.value.fecha_evento
    const evento = form.value.evento
    

  // console.log(typeof(m_l))
  // console.log(m_l)



  this.validar_informacion(hora_evento, "hora_evento")
  this.validar_informacion(evento, "evento")
  this.validar_informacion(fecha_evento, "fecha_evento")

    this.formData.append("id", this.id);

  
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
      
      this.api_serve.editar_bitacora_eventos_relevantes(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "dato") {
              this.inf_c_g = String(dato)
            }
  
          });
  
          this.inf_g = false
          this.inf_a = true
          // this.inf_c_g = String(result)
          this.inf_btn = false
          this.inf_btnuew = true
  
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
          this.listado_asignados()
  
        },
        error: (err: HttpErrorResponse) => {
  
          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")
        }
      })
  
    }
  }
  listado_asignados() {

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.formData.append("id_evento", this.inf_evento_re);

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //plazos
    

    this.api_serve.listado_bitacora_eventos_relevantes(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "bitacora") {
            sessionStorage.removeItem("bitacora")
            sessionStorage.setItem("bitacora", JSON.stringify(dato))
            this.bitacora = JSON.parse(sessionStorage.getItem("bitacora")!)

          }

          if (key === "afectaciones") {
            sessionStorage.removeItem("afectaciones")
            sessionStorage.setItem("afectaciones", JSON.stringify(dato))
            this.afectaciones = JSON.parse(sessionStorage.getItem("afectaciones")!)
          }
          //this.router.navigate(["/ver_informacon_personal"])

          if (key === "personal") {
            sessionStorage.removeItem("personal")
            sessionStorage.setItem("personal", JSON.stringify(dato))
            this.personal = JSON.parse(sessionStorage.getItem("personal")!)
          }
        });
        for(let x in this.afectaciones){

          if(this.afectaciones[x][4]=="SECUESTRADO"){
            this.afectacion_persona = "Secuestrados"

          }
          if (this.afectaciones[x][4]=="HERIDO") {
            this.afectaciones_heridos.push(this.afectaciones[x])
          } else {
            this.afectaciones_asesinados.push(this.afectaciones[x])
          }

        }

        

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
  eliminar(){
    var dato = confirm("Estas Seguro de Eliminar Este Dato")
        // const numero_boletin_div = form.value.numero_boletin_div
  if (dato) {
    

        this.formData.append("id", this.id);
    
        this.formData.append("permiso", this.cookie.get("permiso"));
        this.formData.append("unidad", this.cookie.get("unidad"));
           
        var espiner = document.getElementById("espiner")
        espiner?.classList.add("lds-spinner")
        
          this.api_serve.eliminar_bitacora_eventos_relevantes(this.formData).subscribe({
            next: (result: HttpResponse<any>) => {
              // console.log(result)
              Object.entries(result).forEach(([key, value]) => {
                var dato = value
                var key = key
                if (key === "dato") {
                  this.inf_c_g = String(dato)
                }
      
              });
      
              this.inf_g = false
              this.inf_a = true
              // this.inf_c_g = String(result)
              this.inf_btn = false
              this.inf_btnuew = true
      
              var espiner = document.getElementById("espiner")
              espiner?.classList.remove("lds-spinner")
              this.listado_asignados()
      
            },
            error: (err: HttpErrorResponse) => {
      
              this.inf_a = true
              this.inf_g = false
              this.inf_c_g = String("error de conexion")
            }
          })
      
      }
  }
  eliminar_afectacion() {
    // const numero_boletin_div = form.value.numero_boletin_div
  
    var dato = confirm("Estas Seguro de Eliminar Este Dato")
        // const numero_boletin_div = form.value.numero_boletin_div
  if (dato) {
    

    this.formData.append("id", this.id_herido);

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
  
    this.validacion = this.valicacion_array_funcion(this.valicaion_array)
  
    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
  
  
      this.api_serve.eeliminar_afectacion_eventos_relevantes(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "dato") {
              this.inf_c_g = String(dato)
            }
  
          });
  
          this.inf_g = false
          this.inf_a = true
          // this.inf_c_g = String(result)
          this.inf_btn = false
          this.inf_btnuew = true
  
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
          this.listado_asignados()
  
        },
        error: (err: HttpErrorResponse) => {
  
          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")
        }
      })
  
  }
  }
}
