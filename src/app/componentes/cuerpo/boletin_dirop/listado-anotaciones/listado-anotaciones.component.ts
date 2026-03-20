import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-listado-anotaciones',
  templateUrl: './listado-anotaciones.component.html',
  styleUrls: ['./listado-anotaciones.component.css']
})
export class ListadoAnotacionesComponent {
  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent
  constructor(private selector: SelectoresService, private menu_service: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService) { }

  ngAfterViewInit(): void {
    this.listado_asignados_boletin()
    this.listado_asignados_inicio()
    const evento = "VERIFICAR"
    const fecha = "----"
    var cordenada_x = 4.60971
    var cordenada_y = -74.08175
    this.mapa_digital.crear_point(cordenada_x, cordenada_y, evento, fecha)
  }
  grd_recibe = this.menu_service.gr_cdte

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  inf_btn_edit: boolean = false

  formData = new FormData();

  istado_boletin_anotaciones: string[] = []

  fecha_evento: string = JSON.parse(sessionStorage.getItem("fecha_evento_anotacion")!)
  fecha_evento_final: string = JSON.parse(sessionStorage.getItem("fecha_evento_final_anotacion")!)
  boletin: string = JSON.parse(sessionStorage.getItem("boletin")!)


  lat = this.selector.lat
  lot = this.selector.lot
  lati: string
  loti: string

  coodnadas_lat_gr: number
  coodnadas_lat_min: number
  coodnadas_lat_seg: number

  coodnadas_lot_gr: number
  coodnadas_lot_min: number
  coodnadas_lot_seg: number

  cordenada_x: number
  cordenada_y: number


  validacion: boolean = false
  validar_nombre: boolean = false


  divi_padre: string = "---"
  divi_hija: string = "---"
  brigada: string = "---"
  batallon: string = "---"
  unidad_selecionada_brigada: string[] = []
  unidad_selecionada_batallones: string[] = []


  unidad_selecionada_div: string[] = []
  unidad_selecionada_municipios: string[] = []

  division = this.selector.duplicados()
  departamentos_filtrados = this.selector.departamentos_unicos()
  amenaza_select = this.selector.amenaza_select()
  amenaza: string = "---"

  destino: string = "---"
  departamento: string = "---"
  municipios: string = "---"

  tipo_evento_f: string = ""
  fecha_evento_f: string = ""
  hora_evento: string = ""
  cp: string = ""
  pel: string = ""
  municipio: string = ""
  sitio: string = ""
  latitud: string = ""
  gr_n: string = ""
  m_n: string = ""
  s_n: string = ""
  longitud: string = ""
  gr_l: string = ""
  m_l: string = ""
  s_l: string = ""
  enemigo: string = ""
  estructura: string = ""
  hecho: string = ""
  resumen: string = ""
  estado: string = ""
  id_evento: string = ""

  nombre: string = ""
  link: string = ""
  server: string = ""
  dato: string = ""
  eventos_relevantes_selecionados: string[] = []
  listado_boletin_ooperacional_registrado: string[] = []
  listado_boletin_ooperacional_registrado_final: String[] = []
  clear() {
    this.fecha_evento = ""
    this.fecha_evento_final = ""
    this.boletin = ""
    this.server = ""

  }

  mostrar_proyecto() {
    var proyecto = document.getElementById("proyecto_ingreso")
    proyecto?.classList.toggle("oculto")

    var oculto_documentos = document.getElementById("oculto_documentos")
    var oculto_documentos_modificar = document.getElementById("oculto_documentos_modificar")

    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
  }
  mostrar_menu(identificador: number) {
    var oculto_documentos = document.getElementById("oculto_documentos")
    var oculto_documentos_modificar = document.getElementById("oculto_documentos_modificar")
    var oculto_documentos_descargar = document.getElementById("oculto_documentos_descargar")
    var oculto_documentos_modificar_cargar = document.getElementById("oculto_documentos_modificar_cargar")
    var oculto_documentos_descargar_unidades = document.getElementById("oculto_documentos_descargar_unidades")

    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")
    oculto_documentos_descargar?.classList.remove("oculto_documentos_descargar")
    oculto_documentos_modificar_cargar?.classList.remove("oculto_documentos_modificar_cargar")
    oculto_documentos_descargar_unidades?.classList.remove("oculto_documentos_descargar_unidades")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
    oculto_documentos_descargar?.classList.add("oculto_documentos_descargar")
    oculto_documentos_modificar_cargar?.classList.add("oculto_documentos_modificar_cargar")
    oculto_documentos_descargar_unidades?.classList.add("oculto_documentos_descargar_unidades")


    if (identificador == 1) {
      oculto_documentos?.classList.toggle("oculto_documentos")
    }
    if (identificador == 2) {
      oculto_documentos_modificar?.classList.toggle("oculto_documentos_modificar")
    }
    if (identificador == 3) {
      oculto_documentos_descargar?.classList.toggle("oculto_documentos_descargar")
      oculto_documentos_descargar_unidades?.classList.toggle("oculto_documentos_descargar_unidades")
    }
    if (identificador == 4) {
      oculto_documentos_modificar_cargar?.classList.toggle("oculto_documentos_modificar_cargar")
    }
    if (identificador == 0) {
      oculto_documentos?.classList.remove("oculto_documentos")
      oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")
      oculto_documentos_descargar?.classList.remove("oculto_documentos_descargar")

      oculto_documentos?.classList.add("oculto_documentos")
      oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
      oculto_documentos_descargar?.classList.add("oculto_documentos_descargar")
      oculto_documentos_descargar_unidades?.classList.add("oculto_documentos_descargar_unidades")
    }

  }
  listado_asignados_inicio() {


    this.formData.append("fecha_evento", this.fecha_evento);
    this.formData.append("fecha_evento_final", this.fecha_evento_final);
    this.formData.append("boletin", this.boletin);

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    /* guardfar las fechas */
    sessionStorage.removeItem("fecha_evento_anotacion")
    sessionStorage.setItem("fecha_evento_anotacion", JSON.stringify(this.fecha_evento))
    this.fecha_evento = JSON.parse(sessionStorage.getItem("fecha_evento_anotacion")!)

    sessionStorage.removeItem("fecha_evento_final_anotacion")
    sessionStorage.setItem("fecha_evento_final_anotacion", JSON.stringify(this.fecha_evento))
    this.fecha_evento_final = JSON.parse(sessionStorage.getItem("fecha_evento_final_anotacion")!)

    sessionStorage.removeItem("boletin")
    sessionStorage.setItem("boletin", JSON.stringify(this.boletin))
    this.boletin = JSON.parse(sessionStorage.getItem("boletin")!)
    //
    this.api_serve.ver_anotaciones_operacionales(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)

        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "istado_boletin_anotaciones") {
            sessionStorage.removeItem("istado_boletin_anotaciones")
            sessionStorage.setItem("istado_boletin_anotaciones", JSON.stringify(dato))
            this.istado_boletin_anotaciones = JSON.parse(sessionStorage.getItem("istado_boletin_anotaciones")!)

          }

        });

        // this.inf_c_g = String(result)
        this.mapa_digital.crear_point_boletin(this.istado_boletin_anotaciones)

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

  listado_asignados(form: NgForm) {

    const fecha_evento = form.value.fecha_evento
    const fecha_evento_final = form.value.fecha_evento_final
    const boletin = form.value.boletin


    this.formData.append("fecha_evento", fecha_evento);
    this.formData.append("fecha_evento_final", fecha_evento_final);
    this.formData.append("boletin", boletin);

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    /* guardfar las fechas */
    sessionStorage.removeItem("fecha_evento_anotacion")
    sessionStorage.setItem("fecha_evento_anotacion", JSON.stringify(fecha_evento))
    this.fecha_evento = JSON.parse(sessionStorage.getItem("fecha_evento_anotacion")!)

    sessionStorage.removeItem("fecha_evento_final_anotacion")
    sessionStorage.setItem("fecha_evento_final_anotacion", JSON.stringify(fecha_evento_final))
    this.fecha_evento_final = JSON.parse(sessionStorage.getItem("fecha_evento_final_anotacion")!)

    sessionStorage.removeItem("boletin")
    sessionStorage.setItem("boletin", JSON.stringify(boletin))
    this.boletin = JSON.parse(sessionStorage.getItem("boletin")!)
    //
    this.api_serve.ver_anotaciones_operacionales(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)

        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "istado_boletin_anotaciones") {
            sessionStorage.removeItem("istado_boletin_anotaciones")
            sessionStorage.setItem("istado_boletin_anotaciones", JSON.stringify(dato))
            this.istado_boletin_anotaciones = JSON.parse(sessionStorage.getItem("istado_boletin_anotaciones")!)

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
  listado_asignados_boletin() {

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    //
    this.api_serve.ver_registro_boletin(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "listado_boletin_ooperacional_registrado") {
            sessionStorage.removeItem("listado_boletin_ooperacional_registrado")
            sessionStorage.setItem("listado_boletin_ooperacional_registrado", JSON.stringify(dato))
            this.listado_boletin_ooperacional_registrado = JSON.parse(sessionStorage.getItem("listado_boletin_ooperacional_registrado")!)

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
