import { Component, ViewChild } from '@angular/core';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-alerta',
  templateUrl: './editar-alerta.component.html',
  styleUrls: ['./editar-alerta.component.css']
})
export class EditarAlertaComponent {
  constructor(private selector: SelectoresService, private menu_service :  SelectoresService,  private cookie: CookieService, private api_serve: ServiceConecionService, private informacion: InfEventoService, private router: Router){}

  unidad_selecionada_div: string[] = []
  unidad_selecionada_municipios: string[] = []

  division = this.selector.duplicados()
  departamentos_filtrados = this.selector.departamentos_unicos()
  amenaza_select = this.selector.amenaza_select()
  amenaza: string = "---"

  amenazados_aelertas = this.selector.amenazados_aelertas
  amenaza_alertas: string = "---"
  

  departamento: string = "---"
  municipios: string = "---"

  grd_recibe = this.menu_service.gr_cdte
  grd_remitente = this.menu_service.gr_cdte

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

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData = new FormData();
  validacion: boolean = false
  validar_nombre: boolean = false

  editar: boolean = true
  cambiar: boolean = false

  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent

  id_alerta = this.informacion.id_alerta
  numero_alerta = this.informacion.numero_alerta
  
  fecha_alerta = this.informacion.fecha_alerta
  hora_alerta = this.informacion.hora_alerta
  origen = this.informacion.origen
  destino = this.informacion.destino
  gr_recibe = this.informacion.gr_recibe
  quien_recibe = this.informacion.quien_recibe
  cargo_recibe = this.informacion.cargo_recibe
  telefono_recibe = this.informacion.telefono_recibe
  gr_remitente = this.informacion.gr_remitente
  quien_remitente = this.informacion.quien_remitente
  cargo_remitente = this.informacion.cargo_remitente
  telefono_remitente = this.informacion.telefono_remitente

  departamento_alerta = this.informacion.departamento_alerta
  municipio_alerta = this.informacion.municipio_alerta
  sitio_alerta = this.informacion.sitio_alerta

  ln_alerta = this.informacion.ln_alerta
  ln_g_alerta = this.informacion.ln_g_alerta
  ln_m_alerta = this.informacion.ln_m_alerta
  ln_s_alerta = this.informacion.ln_s_alerta
  lw_alerta = this.informacion.lw_alerta
  lw_g_alerta = this.informacion.lw_g_alerta
  lw_m_alerta = this.informacion.lw_m_alerta
  lw_s_alerta = this.informacion.lw_s_alerta

  amenaza_alerta = this.informacion.amenaza_alerta
  accion_aelrta = this.informacion.accion_aelrta
  amenazados = this.informacion.amenazados

  fecha_registro_alerta = this.informacion.fecha_registro_alerta
  hora_registro_alerta = this.informacion.hora_registro_alerta
  folio_libro = this.informacion.folio_libro


  coordenadas_alerta = this.informacion.coordenadas_alerta

  destino_criptografo = this.informacion.destino_criptografo
  gr_recibe_criptografo = this.informacion.gr_recibe_criptografo
  quien_recibe_criptografo = this.informacion.quien_recibe_criptografo
  cargo_recibe_criptografo = this.informacion.cargo_recibe_criptografo
  telefono_recibe_criptografo = this.informacion.telefono_recibe_criptografo

  x = this.informacion.x
  y = this.informacion.y

  server:string 
  acta_reserva_ruta = this.informacion.doc
  acta_reserva_2  = this.informacion.doc

  documento = "http://172.22.2.36:5198" + this.informacion.doc

  inf_r: boolean = false
  inf_c_r: string = "datos "
  ngAfterViewInit(): void {
    var cordenada_x = parseFloat(this.x)
    var cordenada_y = parseFloat(this.y)
  
    console.log(cordenada_x)
    console.log(cordenada_y)
    this.mapa_digital.crear_point(cordenada_x, cordenada_y, this.accion_aelrta, this.fecha_alerta)
  }


  div_hija(evaluar: number, respuesta: number) {
    for (let i in this.unidad_selecionada_div) {
      this.unidad_selecionada_div.splice(parseInt(i))
    }

    this.unidad_selecionada_div = this.selector.unidades_filtradas(this.destino, evaluar, respuesta)

  }
  departamentos(evaluar: number, respuesta: number) {
    this.editar = false
    this.cambiar = true
    for (let i in this.departamentos_filtrados) {
      this.unidad_selecionada_municipios.splice(parseInt(i))
    }

    this.unidad_selecionada_municipios = this.selector.unidades_filtradas(this.departamento_alerta, evaluar, respuesta)

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
  clear() {
    this.router.navigate(["/alertas_listados"])
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
  validar_informacion_2(infor: number, nombre: string) {
    const elemento = document.getElementById(nombre) as HTMLElement
    if (!infor) {

      if (infor == 0) {
        var infor_str =  infor.toString()
        elemento!.style.cssText = "background-color: darkgreen; color: white"
        this.formData.append(nombre, infor_str);
  
        this.valicaion_array.push("true")
      }else{
      
        elemento!.style.cssText = "background-color: darkred; color: white;"

        this.valicaion_array.push("false")
      }

    } else {
     
      var infor_str =  infor.toString()
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
      this.formData.append("acta_alerta_2", this.acta_reserva_ruta);
    }
  }

  cargar_acta_alerta() {

    const radiograma_unidad = document.getElementById("acta_alerta")
    radiograma_unidad?.click()
  }
  leer_acta_alerta(event: Event) {
    const acta_reserva = document.getElementById("acta_alerta") as HTMLInputElement
    let acta_reserva_name = acta_reserva.files![0].name
    this.inf_r = true
    this.inf_c_r = acta_reserva_name
  }
  ver_documento(){
    var view_dumentos =  document.getElementById("view_dumentos")
    view_dumentos?.classList.toggle("documento_oculto")
    this.server = this.documento  
    this.informacion.ver_documento_view()
    
    // this.router.navigate(["/ver_document"])
  }
  //coadigo para la conexion de la api y eliminacion de los resultados 
  editar_evento(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div

    
    const acta_reserva = document.getElementById("acta_alerta") as HTMLInputElement
    let acta_alerta = acta_reserva.files![0]
    this.llenar_documentos_acta("acta_alerta", acta_alerta)
    this.formData.append("alerta_scaneada", this.acta_reserva_ruta);
 
    const numero = form.value.numero
    const fecha = form.value.fecha
    const hora = form.value.hora
    const origen = form.value.origen
    const destino = form.value.destino
    const grd_recibe = form.value.grd_recibe
    const nombre_recibe = form.value.nombre_recibe
    const cargo = form.value.cargo
    const telefono = form.value.telefono
    const grd_remitente = form.value.grd_remitente
    const nombre_remitente = form.value.nombre_remitente
    const cargo_remitente = form.value.cargo_remitente
    const telefono_remitente = form.value.telefono_remitente
    const departamento = form.value.departamento
    const municipio = form.value.municipio
    const sitio = form.value.sitio
    const latitud = form.value.latitud
    const gr_n = form.value.gr_n
    const m_n = form.value.m_n
    const s_n = form.value.s_n
    const longitud = form.value.longitud
    const gr_l = form.value.gr_l
    const m_l = form.value.m_l
    const s_l = form.value.s_l
    const fecha_registro = form.value.fecha_registro
    const hora_registro = form.value.hora_registro
    const numero_folio_registro = form.value.numero_folio_registro
    const enemigo = form.value.enemigo
    const accion_enemiga = form.value.accion_enemiga
    const fuerza = form.value.fuerza

    const destino_criptografo = form.value.destino_criptografo
    const grd_recibe_criptografo = form.value.grd_recibe_criptografo
    const nombre_recibe_criptografo = form.value.nombre_recibe_criptografo
    const telefono_criptografo = form.value.telefono_criptografo
    const cargo_criptografo = form.value.cargo_criptografo

    // console.log(typeof(m_l))
    console.log(accion_enemiga)
    
    this.validar_informacion(numero, "numero")
    this.validar_informacion(fecha, "fecha")
    this.validar_informacion(hora, "hora")
    this.validar_informacion(origen, "origen")
    this.validar_informacion(destino, "destino")
    this.validar_informacion(grd_recibe, "grd_recibe")
    this.validar_informacion(nombre_recibe, "nombre_recibe")
    this.validar_informacion(cargo, "cargo")
    this.validar_informacion(telefono, "telefono")
    this.validar_informacion(grd_remitente, "grd_remitente")
    this.validar_informacion(nombre_remitente, "nombre_remitente")
    this.validar_informacion(cargo_remitente, "cargo_remitente")
    this.validar_informacion(telefono_remitente, "telefono_remitente")
    this.validar_informacion(departamento, "departamento")
    this.validar_informacion(municipio, "municipio")
    this.validar_informacion(sitio, "sitio")
    this.validar_informacion(latitud, "latitud")
    this.validar_informacion_2(gr_n, "gr_n")
    this.validar_informacion_2(m_n, "m_n")
    this.validar_informacion_2(s_n, "s_n")
    this.validar_informacion(longitud, "longitud")
    this.validar_informacion_2(gr_l, "gr_l")
    this.validar_informacion_2(m_l, "m_l")
    this.validar_informacion_2(s_l, "s_l")
    this.validar_informacion(fecha_registro, "fecha_registro")
    this.validar_informacion(hora_registro, "hora_registro")
    this.validar_informacion(numero_folio_registro, "numero_folio_registro")
    this.validar_informacion(enemigo, "enemigo")
    this.validar_informacion(accion_enemiga, "accion_enemiga")
    this.validar_informacion(fuerza, "fuerza")

    this.validar_informacion(destino_criptografo, "destino_criptografo")
    this.validar_informacion(grd_recibe_criptografo, "grd_recibe_criptografo")
    this.validar_informacion(nombre_recibe_criptografo, "nombre_recibe_criptografo")
    this.validar_informacion(telefono_criptografo, "telefono_criptografo")
    this.validar_informacion(cargo_criptografo, "cargo_criptografo")

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.formData.append("id_alerta", this.id_alerta);

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
      
      // alertas_eliminar
      

        this.api_serve.alertas_editar(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            // console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
              if (key === "respuesta") {
                this.inf_c_g = String(dato)
              }
              if (key === "alertas") {
                sessionStorage.removeItem("alertas")
                sessionStorage.setItem("alertas", JSON.stringify(dato))
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
    //coadigo para la conexion de la api y eliminacion de los resultados 
  eliminar_evento() {

  
      // console.log(typeof(m_l))
      // console.log(m_l)
      

  
      this.formData.append("permiso", this.cookie.get("permiso"));
      this.formData.append("unidad", this.cookie.get("unidad"));
      this.formData.append("id_alerta", this.id_alerta);
      this.formData.append("alerta_scaneada", this.acta_reserva_ruta);
  
  
        
        // alertas_eliminar
        
  
          this.api_serve.alertas_eliminar(this.formData).subscribe({
            next: (result: HttpResponse<any>) => {
              // console.log(result)
              Object.entries(result).forEach(([key, value]) => {
                var dato = value
                var key = key
                if (key === "respuesta") {
                  this.inf_c_g = String(dato)
                }
                if (key === "alertas") {
                  sessionStorage.removeItem("alertas")
                  sessionStorage.setItem("alertas", JSON.stringify(dato))
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
