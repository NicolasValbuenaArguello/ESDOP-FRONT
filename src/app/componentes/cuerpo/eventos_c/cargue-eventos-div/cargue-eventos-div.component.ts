import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { MapaDigitalComponent } from '../mapa-digital/mapa-digital.component';
import { NgForm } from '@angular/forms';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cargue-eventos-div',
  templateUrl: './cargue-eventos-div.component.html',
  styleUrls: ['./cargue-eventos-div.component.css']
})
export class CargueEventosDivComponent {
  constructor(private selector: SelectoresService, private api_serve: ServiceConecionService,  private cookie: CookieService,) {

  }
  // ngAfterViewInit(): void {
  //   window.location.reload()
  // }

  division = this.selector.duplicados()
  departamentos_filtrados = this.selector.departamentos_unicos()
  amenaza_select = this.selector.amenaza_eventos
  eventos = this.selector.eventos
  unidad_selecionada_div: string[] = []
  unidad_selecionada_brigada: string[] = []
  unidad_selecionada_batallones: string[] = []

  unidad_selecionada_municipios: string[] = []

  lat = this.selector.lat
  lot = this.selector.lot

  lati: string
  loti: string

  divi_padre: string = "---"
  divi_hija: string = "---"
  brigada: string = "---"
  batallon: string = "---"
  municipios: string = "---"

  departamento: string = "---"
  amenaza: string = "---"

  coodnadas_lat_gr: number
  coodnadas_lat_min: number
  coodnadas_lat_seg: number

  coodnadas_lot_gr: number
  coodnadas_lot_min: number
  coodnadas_lot_seg: number

  cordenada_x: number
  cordenada_y: number


  inf_b: boolean = false
  inf_c_b: string = "datos "

  inf_r: boolean = false
  inf_c_r: string = "datos "

  inf_d: boolean = false
  inf_c_d: string = "datos"

  inf_i: boolean = false
  inf_c_i: string = "datos"

  inf_g: boolean = false

  inf_a: boolean = false
  inf_c_g: string = "datos"

  validacion: boolean = false

  valicaion_array: string[] = []

  formData = new FormData();

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  numero_denuncia: string = "N/A"
  fiscalia: string = "N/A"
  numero: number = 0
  nombre_documentos: string[] = []
  nombre_documentos_2: string[] = []
  valicaion_array_2: string[] = []
  validar_nombre: boolean = false

  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent
  div_hija(evaluar: number, respuesta: number) {
    for (let i in this.unidad_selecionada_div) {
      this.unidad_selecionada_div.splice(parseInt(i))
    }
    this.unidad_selecionada_brigada = []
    this.unidad_selecionada_batallones = []

    this.unidad_selecionada_div = this.selector.unidades_filtradas(this.divi_padre, evaluar, respuesta)

  }
  brigadas(evaluar: number, respuesta: number) {

    for (let i in this.unidad_selecionada_brigada) {
      this.unidad_selecionada_brigada.splice(parseInt(i))
    }

    this.unidad_selecionada_batallones = []
    this.unidad_selecionada_brigada = this.selector.unidades_filtradas(this.divi_hija, evaluar, respuesta)

  }
  batallones(evaluar: number, respuesta: number) {

    for (let i in this.unidad_selecionada_brigada) {
      this.unidad_selecionada_batallones.splice(parseInt(i))
    }
    this.unidad_selecionada_batallones = this.selector.unidades_filtradas(this.brigada, evaluar, respuesta)
  }
  departamentos(evaluar: number, respuesta: number) {

    for (let i in this.departamentos_filtrados) {
      this.unidad_selecionada_municipios.splice(parseInt(i))
    }
    this.unidad_selecionada_municipios = this.selector.unidades_filtradas(this.departamento, evaluar, respuesta)
  }
  acma() {
    alert("la Subestructura debe se de acuerdo al ACCAM")
  }
  coordenadas() {

    const a = this.lati
    const x = this.loti

    if (a === "LN") {
      this.cordenada_x = ((this.coodnadas_lat_gr + this.coodnadas_lat_min / 60) + (this.coodnadas_lat_seg / 3600)) * 1
    } else {
      this.cordenada_x = ((this.coodnadas_lat_gr + this.coodnadas_lat_min / 60) + (this.coodnadas_lat_seg / 3600)) * -1

    }

    if (x === "LW") {
      this.cordenada_y = ((this.coodnadas_lot_gr + this.coodnadas_lot_min / 60) + (this.coodnadas_lot_seg / 3600)) * -1

    } else {
      this.cordenada_y = ((this.coodnadas_lot_gr + this.coodnadas_lot_min / 60) + (this.coodnadas_lot_seg / 3600)) * 1
    }
    // const evento = "EVENTO N0 "
    // const fecha = "28/01/2023"
    // this.mapa_digital.crear_point(this.cordenada_x, this.cordenada_y, evento, fecha)

  }
  graficar() {
    const evento = "VERIFICAR"
    const fecha = "----"
    this.mapa_digital.crear_point(this.cordenada_x, this.cordenada_y, evento, fecha)
  }

  //funciones para el cargue de los boletines edocumentos
  cargar_boletin() {

    const boletin_fisico = document.getElementById("boletin_fisico")
    boletin_fisico?.click()
  }
  leer_boletin(event: Event) {
    const boletin_fisico = document.getElementById("boletin_fisico") as HTMLInputElement
    let boletin_fisico_name = boletin_fisico.files![0].name
    this.inf_b = true
    this.inf_c_b = boletin_fisico_name
    this.validar_nombre_documneto(boletin_fisico_name)
  }

  cargar_radiograma() {

    const radiograma_unidad = document.getElementById("radiograma_unidad")
    radiograma_unidad?.click()
  }
  leer_radiograma(event: Event) {
    const radiograma_unidad = document.getElementById("radiograma_unidad") as HTMLInputElement
    let radiograma_unidad_name = radiograma_unidad.files![0].name
    this.inf_r = true
    this.inf_c_r = radiograma_unidad_name
    this.validar_nombre_documneto(radiograma_unidad_name)
  }

  cargar_denuncia() {

    const denuncia_evento = document.getElementById("denuncia_evento")
    denuncia_evento?.click()
  }
  leer_denuncia(event: Event) {
    const denuncia_evento = document.getElementById("denuncia_evento") as HTMLInputElement
    let denuncia_evento_name = denuncia_evento.files![0].name
    this.inf_d = true
    this.inf_c_d = denuncia_evento_name
    this.validar_nombre_documneto(denuncia_evento_name)
  }

  cargar_informe() {

    const informe_pdf = document.getElementById("informe_pdf")
    informe_pdf?.click()
  }
  leer_informe(event: Event) {
    const informe_pdf = document.getElementById("informe_pdf") as HTMLInputElement
    let informe_pdf_name = informe_pdf.files![0].name
    this.inf_i = true
    this.inf_c_i = informe_pdf_name
    this.validar_nombre_documneto(informe_pdf_name)

  }
  validar_nombre_documneto(nombre: string) {

    if (!this.nombre_documentos.includes(nombre)) {
      this.nombre_documentos.push(String(nombre))
    } else {
      alert("El presento documento ya está seleccionado " + "\n" + "No se va aguardar, verificar los nombres o seleccionar otro.")
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
  llenar_documentos(nombre: string, documento: File) {
    if (documento != undefined) {


      if (!this.nombre_documentos_2.includes(String(documento.name))) {
        this.formData.append(nombre, documento, documento.name);
        this.nombre_documentos_2.push(String(documento.name))
        this.valicaion_array_2.push("true")

      } else {
        this.valicaion_array_2.push("false")
      }


    } else {
      this.formData.append(nombre, "---");
    }
  }

  clear() {
    window.location.reload()
    this.inf_btn = true
    this.inf_btnuew = false
  }
  valicacion_array_funcion(valicaion_array: string[]) {

    for (let index in valicaion_array) {
      if (valicaion_array[index] === "false") {
        return false
      }
    }
    return true
  }

  guardar_evento(form: NgForm) {
    const numero_boletin_div = form.value.numero_boletin_div
    const fecha_evento = form.value.fecha_evento
    const hora_evento = form.value.hora_evento
    const divi_padre = form.value.divi_padre
    const divi_hija = form.value.divi_hija
    const brigada = form.value.brigada
    const batallon = form.value.batallon
    const amenaza = form.value.amenaza
    const subestructura = form.value.subestructura
    const departamento = form.value.departamento
    const municipios = form.value.municipios
    const sitio = form.value.sitio
    const lati = form.value.lati
    const coodnadas_lat_gr = form.value.coodnadas_lat_gr
    const coodnadas_lat_min = form.value.coodnadas_lat_min
    const coodnadas_lat_seg = form.value.coodnadas_lat_seg
    const loti = form.value.loti
    const coodnadas_lot_gr = form.value.coodnadas_lot_gr
    const coodnadas_lot_min = form.value.coodnadas_lot_min
    const coodnadas_lot_seg = form.value.coodnadas_lot_seg
    const evento = form.value.evento
    const resumen = form.value.resumen
    const denuncia = form.value.denuncia
    const numero_de_denuncia = form.value.numero_de_denuncia
    const fiscalia = form.value.fiscalia
    const estado = form.value.estado

    this.validar_informacion(numero_boletin_div, "numero_boletin_div")
    this.validar_informacion(fecha_evento, "fecha_evento")
    this.validar_informacion(hora_evento, "hora_evento")
    this.validar_informacion(divi_padre, "divi_padre")
    this.validar_informacion(divi_hija, "divi_hija")
    this.validar_informacion(brigada, "brigada")
    this.validar_informacion(batallon, "batallon")
    this.validar_informacion(amenaza, "amenaza")
    this.validar_informacion(subestructura, "subestructura")
    this.validar_informacion(departamento, "departamento")
    this.validar_informacion(municipios, "municipios")
    this.validar_informacion(sitio, "sitio")
    this.validar_informacion(lati, "lati")
    this.validar_informacion(coodnadas_lat_gr, "coodnadas_lat_gr")
    this.validar_informacion(coodnadas_lat_min, "coodnadas_lat_min")
    this.validar_informacion(coodnadas_lat_seg, "coodnadas_lat_seg")
    this.validar_informacion(loti, "loti")
    this.validar_informacion(coodnadas_lot_gr, "coodnadas_lot_gr")
    this.validar_informacion(coodnadas_lot_min, "coodnadas_lot_min")
    this.validar_informacion(coodnadas_lot_seg, "coodnadas_lot_seg")
    this.validar_informacion(evento, "evento")
    this.validar_informacion(resumen, "resumen")
    this.validar_informacion(denuncia, "denuncia")
    this.validar_informacion(numero_de_denuncia, "numero_de_denuncia")
    this.validar_informacion(fiscalia, "fiscalia")
    this.validar_informacion(estado, "estado")

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    const leer_boletin_fisico = document.getElementById("boletin_fisico") as HTMLInputElement
    let boletin_fisico = leer_boletin_fisico.files![0]

    const leer_radiograma_unidad = document.getElementById("radiograma_unidad") as HTMLInputElement
    let radiograma_unidad = leer_radiograma_unidad.files![0]

    const leer_denuncia_evento = document.getElementById("denuncia_evento") as HTMLInputElement
    let denuncia_evento = leer_denuncia_evento.files![0]

    const leer_informe_pdf = document.getElementById("informe_pdf") as HTMLInputElement
    let informe_pdf = leer_informe_pdf.files![0]


    for (let i in this.nombre_documentos_2) {
      this.nombre_documentos_2.splice(parseInt(i))
    }

    this.llenar_documentos("boletin_fisico", boletin_fisico)
    this.llenar_documentos("radiograma_unidad", radiograma_unidad)
    this.llenar_documentos("denuncia_evento", denuncia_evento)
    this.llenar_documentos("informe_pdf", informe_pdf)

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
      this.validar_nombre = this.valicacion_array_funcion(this.valicaion_array_2)

      if (!this.validar_nombre) {
        this.inf_a = true
        this.inf_c_g = String("tienes documentos con el mismo nombre")

        for (let i in this.valicaion_array_2) {
          this.valicaion_array_2.splice(parseInt(i))
        }
        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")

      } else {

        this.api_serve.eventos(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            // console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
              if (key === "respuesta") {
                this.inf_c_g = String(dato)
              }
              if (key === "eventos") {
                sessionStorage.removeItem("eventos")
                sessionStorage.setItem("eventos", JSON.stringify(dato))
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
            this.inf_c_g = String("error de conexion")
          }
        })
      }
    }
  }
}
