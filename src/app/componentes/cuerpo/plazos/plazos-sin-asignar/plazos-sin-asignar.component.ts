import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-plazos-sin-asignar',
  templateUrl: './plazos-sin-asignar.component.html',
  styleUrls: ['./plazos-sin-asignar.component.css']
})
export class PlazosSinAsignarComponent {
  constructor(private usuarios: SelectoresService, private router: Router, private permisos: PermisosService, private cookie: CookieService, private api_serve: ServiceConecionService) {

    this.listado()
    //this.per_update = this.validar_estado(this.cookie.get("per_update"))
    // *ngIf="per_update"
    //console.log(this.listado_aetcr)
  }

  per_update: boolean
  id_aetcr: string

  plazos_signar: string[] = []
  formData = new FormData();

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []
  ducumento: string = "http://172.22.2.36:5198/plazos/sin_asignar/"
  doc_ver: string = ""
  orfeo: string = ""
  lis_usuarios: {} = JSON.parse(sessionStorage.getItem("listado_personal")!)
  listado_usurios: String[] = []
  cargo: String = ""
  time_unidad: Boolean = false
  tiempo_unidad: string = "0 años"
  div1: string = ""
  div2: string = ""
  div3: string = ""
  div4: string = ""
  div5: string = ""
  div6: string = ""
  div7: string = ""
  div8: string = ""
  davaa: string = ""
  divfe: string = ""
  futco: string = ""
  ftcec: string = ""

  time_respuesta: Boolean = false
  tiempo_respuesta: string = "0 años"
  fecha_res: boolean = false
  responsable: string = ""
  documentos_: string
  // console.log(this.menu_service.listado_usurios )
  correo: string = ""
  validacion: boolean = false
  expandir: boolean = true
  contrae: boolean = false
  ngOnInit(): void {

    this.listado_usurios = this.usuarios.array_listados(this.lis_usuarios)
    // console.log(this.lis_usuarios)
  }
  divisiones_def() {

    if (this.div1) {
      this.div1 = ""
    }
    else {
      this.div1 = "OK"
    }
    if (this.div2) {
      this.div2 = ""
    }
    else {
      this.div2 = "OK"
    }
    if (this.div3) {
      this.div3 = ""
    }
    else {
      this.div3 = "OK"
    }
    if (this.div4) {
      this.div4 = ""
    }
    else {
      this.div4 = "OK"
    }
    if (this.div5) {
      this.div5 = ""
    }
    else {
      this.div5 = "OK"
    }
    if (this.div6) {
      this.div6 = ""
    }
    else {
      this.div6 = "OK"
    }
    if (this.div7) {
      this.div7 = ""
    }
    else {
      this.div7 = "OK"
    }
    if (this.div8) {
      this.div8 = ""
    }
    else {
      this.div8 = "OK"
    }
    if (this.davaa) {
      this.davaa = ""
    }
    else {
      this.davaa = "OK"
    }
    if (this.divfe) {
      this.divfe = ""
    }
    else {
      this.divfe = "OK"
    }
    if (this.futco) {
      this.futco = ""
    }
    else {
      this.futco = "OK"
    }
    if (this.ftcec) {
      this.ftcec = ""
    }
    else {
      this.ftcec = "OK"
    }

  }

  asignar_cargo(form: NgForm) {
    var id = Number(form.value.responsable)
    for (let x in this.listado_usurios) {
      var numero = Number(this.listado_usurios[x][0])

      if (id === numero) {
        this.cargo = this.listado_usurios[x][21]
        this.responsable = this.listado_usurios[x][1] + ". " + this.listado_usurios[x][2] + " " + this.listado_usurios[x][3]
        this.correo = this.listado_usurios[x][7]
      }
    }
  }
  //funcion para calcular fechas
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
  fecha_plazo(form: NgForm) {
    const fecha_unidad = form.value.fecha_plazo
    this.tiempo_unidad = this.OnGetNewName(new Date(), new Date(fecha_unidad))
    this.time_unidad = true
  }
  fecha_plazo_respuesta(form: NgForm) {
    const fecha_unidad = form.value.fecha_plazo_respuesta
    this.tiempo_respuesta = this.OnGetNewName(new Date(), new Date(fecha_unidad))
    this.time_respuesta = true
  }
  mostrar_fecha(form: NgForm) {
    const respuesta = form.value.respuesta
    if (respuesta === "SI") {
      this.fecha_res = true
    } else {
      this.fecha_res = false
    }
  }
  asignar_plazos(documentos: string) {
    this.documentos_ = documentos
    this.doc_ver = ""
    this.doc_ver = this.ducumento + documentos + "#zoom=110%"
    this.orfeo = documentos

    var view_dumentos = document.getElementById("view_dumentos_s")
    view_dumentos?.classList.toggle("oculto")


  }
  cerrar() {
    var view_dumentos = document.getElementById("view_dumentos_s")
    view_dumentos?.classList.toggle("oculto")
  }

  cargar_for_data_check(nombre: string, valor: boolean) {

    if (valor) {
      this.formData.append(nombre, "OK")
    } else {
      this.formData.append(nombre, "---")
    }

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
  exppdir() {
    var documento_pdf = document.getElementById("documento_pdf")
    var documento_pdf_asignar = document.getElementById("documento_pdf_asignar")
    documento_pdf?.classList.remove("col-md-7")
    documento_pdf?.classList.add("col-md-12")
    documento_pdf_asignar?.classList.add("ocultar_panel")

    this.expandir = false
    this.contrae = true

  }
  contraer() {
    var documento_pdf = document.getElementById("documento_pdf")
    var documento_pdf_asignar = document.getElementById("documento_pdf_asignar")
    documento_pdf?.classList.remove("col-md-12")
    documento_pdf?.classList.add("col-md-7")
    documento_pdf_asignar?.classList.remove("ocultar_panel")

    this.expandir = true
    this.contrae = false
  }
  clear() {
    window.location.reload()
    this.div1 = ""
    this.div2 = ""
    this.div3 = ""
    this.div4 = ""
    this.div5 = ""
    this.div6 = ""
    this.div7 = ""
    this.div8 = ""
    this.davaa = ""
    this.divfe = ""
    this.futco = ""
    this.ftcec = ""
  }
  valicacion_array_funcion(valicaion_array: string[]) {

    for (let index in valicaion_array) {
      if (valicaion_array[index] === "false") {
        return false
      }
    }
    return true
  }
  asignar_plazo(form: NgForm) {
    const confirmacion = window.confirm("¿Estás seguro de que deseas continuar?");

    if (confirmacion) {
      const responsable_inf = form.value.responsable
      const cargo = form.value.cargo
      const op_inmedita = form.value.op_inmedita
      const estrito_cumplimiento = form.value.estrito_cumplimiento
      const para_su_control = form.value.para_su_control
      const autorizado = form.value.autorizado
      const no_autorizado = form.value.no_autorizado
      const lo_de_su_cargo = form.value.lo_de_su_cargo
      const firma_coejc = form.value.firma_coejc
      const firma_secej = form.value.firma_secej
      const firma_jemop = form.value.firma_jemop
      const firma_dirop = form.value.firma_dirop
      const resuelva_informe = form.value.resuelva_informe
      const seguimiento = form.value.seguimiento
      const estudie_recomiende = form.value.estudie_recomiende
      const trate_conmigo = form.value.trate_conmigo
      const de_acuerdo_norma = form.value.de_acuerdo_norma
      const asistir = form.value.asistir
      const archivar = form.value.archivar
      const agendar = form.value.agendar
      const difundir = form.value.difundir
      const remitir = form.value.remitir
      const div1 = form.value.div1
      const div2 = form.value.div2
      const div3 = form.value.div3
      const div4 = form.value.div4
      const div5 = form.value.div5
      const div6 = form.value.div6
      const div7 = form.value.div7
      const div8 = form.value.div8
      const davaa = form.value.davaa
      const divfe = form.value.divfe
      const futco = form.value.futco
      const ftcec = form.value.ftcec
      const devolver = form.value.devolver

      const orden = form.value.orden
      const fecha_plazo = form.value.fecha_plazo
      const respuesta = form.value.respuesta
      const fecha_plazo_respuesta = form.value.fecha_plazo_respuesta


      this.validar_informacion(responsable_inf, "responsable")
      this.validar_informacion(cargo, "cargo")

      this.cargar_for_data_check("op_inmedita", op_inmedita)
      this.cargar_for_data_check("estrito_cumplimiento", estrito_cumplimiento)
      this.cargar_for_data_check("para_su_control", para_su_control)
      this.cargar_for_data_check("autorizado", autorizado)
      this.cargar_for_data_check("no_autorizado", no_autorizado)
      this.cargar_for_data_check("lo_de_su_cargo", lo_de_su_cargo)
      this.cargar_for_data_check("firma_coejc", firma_coejc)
      this.cargar_for_data_check("firma_secej", firma_secej)
      this.cargar_for_data_check("firma_jemop", firma_jemop)
      this.cargar_for_data_check("firma_dirop", firma_dirop)
      this.cargar_for_data_check("resuelva_informe", resuelva_informe)
      this.cargar_for_data_check("seguimiento", seguimiento)
      this.cargar_for_data_check("estudie_recomiende", estudie_recomiende)
      this.cargar_for_data_check("trate_conmigo", trate_conmigo)
      this.cargar_for_data_check("de_acuerdo_norma", de_acuerdo_norma)
      this.cargar_for_data_check("asistir", asistir)
      this.cargar_for_data_check("archivar", archivar)
      this.cargar_for_data_check("agendar", agendar)
      this.cargar_for_data_check("difundir", difundir)
      this.cargar_for_data_check("remitir", remitir)
      this.cargar_for_data_check("div1", div1)
      this.cargar_for_data_check("div2", div2)
      this.cargar_for_data_check("div3", div3)
      this.cargar_for_data_check("div4", div4)
      this.cargar_for_data_check("div5", div5)
      this.cargar_for_data_check("div6", div6)
      this.cargar_for_data_check("div7", div7)
      this.cargar_for_data_check("div8", div8)
      this.cargar_for_data_check("davaa", davaa)
      this.cargar_for_data_check("divfe", divfe)
      this.cargar_for_data_check("futco", futco)
      this.cargar_for_data_check("devolver", devolver)


      this.validDates(fecha_plazo, "fecha_plazo")
      this.validar_informacion(fecha_plazo, "fecha_plazo")
      this.validar_informacion(respuesta, "respuesta")

      if (respuesta == "SI") {
        this.validDates(fecha_plazo_respuesta, "fecha_plazo_respuesta")
        this.validar_informacion(fecha_plazo_respuesta, "fecha_plazo_respuesta")
      } else {
        this.formData.append("fecha_plazo_respuesta", "----")
      }

      this.formData.append("orden", orden)
      this.formData.append("documento", this.orfeo)
      this.formData.append("respuesta", respuesta)
      this.formData.append("funcionario", this.responsable)
      this.formData.append("correo_ejc", this.correo)



      //asignacion

      this.formData.append("permiso", String("permiso"));

      var espiner = document.getElementById("espiner")
      espiner?.classList.add("lds-spinner")
      this.validacion = this.valicacion_array_funcion(this.valicaion_array)
      if (!this.validacion) {
        this.inf_a = true

        this.inf_c_g = String("Debe de llenar toda la información")
        for (let i in this.valicaion_array) {
          this.valicaion_array.splice(parseInt(i))
        }
        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")


      } else {

        this.api_serve.asignacion(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            //console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key


              //this.router.navigate(["/ver_informacon_personal"])
              this.plazos_signar = JSON.parse(sessionStorage.getItem("plazos_sinasignar")!)
              this.clear()
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
  listado() {


    this.formData.append("permiso", String("permiso"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //plazos
    this.api_serve.plazos(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "plazos") {
            sessionStorage.removeItem("plazos_sinasignar")
            sessionStorage.setItem("plazos_sinasignar", JSON.stringify(dato))

          }
          //this.router.navigate(["/ver_informacon_personal"])
          this.plazos_signar = JSON.parse(sessionStorage.getItem("plazos_sinasignar")!)
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
