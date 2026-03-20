import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';
import { MapaService } from 'src/app/servicios_generales/mapa/mapa.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-pelotones-aetcr',
  templateUrl: './pelotones-aetcr.component.html',
  styleUrls: ['./pelotones-aetcr.component.css']
})
export class PelotonesAetcrComponent {



  listado_aetcr: {} = JSON.parse(sessionStorage.getItem("informacion_aetcr")!)
  cant_personal: {} = JSON.parse(sessionStorage.getItem("cantidad_anios")!)
  servicios_pubicos: {} = JSON.parse(sessionStorage.getItem("servicios_pubicos")!)
  alertas: String[] = []
  cantidad_personal: String[] = []
  servicios: String[] = []
  nombre_aetcr: string
  nivel: string
  numero: string
  lugar: string
  cordenadas: string
  fecha: string
  foto_aetcr: string

  nombre_aectr: string
  seudonimo: string
  celular: string
  Ubicion_aetcr: string
  foto_user: string

  cant_hombres: string
  cant_mujeres: string
  disminucion: string
  x: string
  y: string


  lat = this.listados.lat
  lot = this.listados.lot
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

  divi_padre: string = "---"
  divi_hija: string = "---"
  brigada: string = "---"
  batallon: string = "---"

  unidad_selecionada_div: string[] = []
  unidad_selecionada_brigada: string[] = []
  unidad_selecionada_batallones: string[] = []

  grados: string[] = ['CT', 'TE', 'ST', 'SV', 'SS', 'CP', 'CS,', 'C3']
  servicio_publico: any[] = []
  elemento_oculto_tabla: boolean = false

  division = this.listados.duplicados()

  
  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false

  formData = new FormData();

  valicaion_array: string[] = []
  validacion: boolean = false

  constructor(private router: Router, private mapa: MapaService, private informacion: InfEventoService, private listados: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService) {

  }
  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent
  ngOnInit(): void {
    this.alertas = this.listados.array_listados(this.listado_aetcr)
    this.cantidad_personal = this.listados.array_listados(this.cant_personal)
    this.servicios = this.listados.array_listados(this.servicios_pubicos)


    for (let index = 0; index < this.alertas.length; index++) {
      this.nombre_aetcr = this.alertas[index][5];
      this.nivel = this.alertas[index][6];
      this.numero = this.alertas[index][3];

      this.lugar = this.alertas[index][9] + " - " + this.alertas[index][10] + " - " + this.alertas[index][11];

      this.cordenadas = this.alertas[index][12] + "  " + this.alertas[index][13] + "° " + this.alertas[index][14] + "' " + this.alertas[index][15] + "'' " + this.alertas[index][16] + "  " + this.alertas[index][17] + "° " + this.alertas[index][18] + "' " + this.alertas[index][19] + "'' "

      this.fecha = this.alertas[index][4];
      this.foto_aetcr = this.alertas[index][1];

      this.nombre_aectr = this.alertas[index][22];
      this.seudonimo = this.alertas[index][23];
      this.celular = this.alertas[index][24];
      this.Ubicion_aetcr = this.alertas[index][25];
      this.foto_user = this.alertas[index][2];
      this.cant_hombres = this.alertas[index][7];
      this.cant_mujeres = this.alertas[index][8];

      this.x = this.alertas[index][20];
      this.y = this.alertas[index][21];

    }




    var ultimo = this.cantidad_personal[this.cantidad_personal.length - 1]
    var primer = this.cantidad_personal[0]
    let resultados = 0

    resultados = ((parseInt(ultimo[4]) / parseInt(primer[4])) * 100) - 100

    this.disminucion = 'ausencia ' + String(Math.round(resultados)) + '%'

  }
  ngAfterViewInit(): void {
    
    var cordenada_x = parseFloat(this.x)
    var cordenada_y = parseFloat(this.y)


    this.mapa_digital.crear_point_aetcr(cordenada_x, cordenada_y, this.cordenadas, this.nombre_aetcr, this.nivel)
  }
  tamanio_foto_aetcr() {

    var foto = document.getElementById("foto_aetcr")

    foto?.classList.toggle("foto_aetcr_2")

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
  graficar(form: NgForm) {

    var cantidad_infor_servicios = '----'

    const fecha_registro = form.value.fecha_registro
    const numero_hr = form.value.numero_hr
    const divi_padre = form.value.divi_padre
    const divi_hija = form.value.divi_hija
    const brigada = form.value.brigada
    const batallon = form.value.batallon
    const compania = form.value.compania
    const peloton = form.value.peloton
    const grd = form.value.grd
    const nombre_cdte = form.value.nombre_cdte
    const telefono_cdte = form.value.telefono_cdte
    const ofi = form.value.ofi
    const sub = form.value.sub
    const slp = form.value.slp
    const sl_18 = form.value.sl_18
    const latitud = form.value.latitud
    const gr_n = form.value.gr_n
    const m_n = form.value.m_n
    const s_n = form.value.s_n
    const longitud = form.value.longitud
    const gr_l = form.value.gr_l
    const m_l = form.value.m_l
    const s_l = form.value.s_l
    const vereda = form.value.vereda

    this.validDates(fecha_registro, "fecha_registro")

    this.validar_informacion(numero_hr, "numero_hr")
    this.validar_informacion(divi_padre, "divi_padre")
    this.validar_informacion(divi_hija, "divi_hija")
    this.validar_informacion(brigada, "brigada")
    this.validar_informacion(batallon, "batallon")

    this.validar_informacion(compania, "compania")
    this.validar_informacion(peloton, "peloton")
    this.validar_informacion(grd, "grd")
    this.validar_informacion(nombre_cdte, "nombre_cdte")
    this.validar_informacion(telefono_cdte, "telefono_cdte")

    this.validar_informacion(ofi, "ofi")
    this.validar_informacion(sub, "sub")
    this.validar_informacion(slp, "slp")
    this.validar_informacion(sl_18, "sl_18")
    this.validar_informacion(vereda, "vereda")

    this.validar_informacion(latitud, "latitud")
    this.validar_informacion_2(gr_n, "gr_n")
    this.validar_informacion_2(m_n, "m_n")
    this.validar_informacion_2(s_n, "s_n")
    this.validar_informacion(longitud, "longitud")
    this.validar_informacion_2(gr_l, "gr_l")
    this.validar_informacion_2(m_l, "m_l")
    this.validar_informacion_2(s_l, "s_l")


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

    }else{
      this.inf_a = false

      

    const cordinador = [this.cordenada_x, this.cordenada_y, fecha_registro, numero_hr, divi_padre, divi_hija, brigada, batallon, compania, peloton, grd, nombre_cdte, telefono_cdte, ofi, sub, slp, sl_18, latitud, gr_n, m_n, s_n, longitud, gr_l, m_l, s_l, vereda, this.nombre_aetcr, this.numero]

    this.servicio_publico.push(cordinador)
    this.elemento_oculto_tabla = true

    var dato_uno = compania + " - " + peloton
    var dato_dos = grd + ". " + nombre_cdte

    console.log(this.servicio_publico)
    this.mapa_digital.crear_point_peoloton(this.cordenada_x, this.cordenada_y, dato_uno, dato_dos)
  }
  }

  eliminar_servicio(item: number) {
    //this.mapa_digital.eliminar()
    this.servicio_publico.splice(item, 1);
    

  
    if (this.servicio_publico.length == 0) {
      this.elemento_oculto_tabla = false
    } 
    
    

  }
  div_hija(evaluar: number, respuesta: number) {
    for (let i in this.unidad_selecionada_div) {
      this.unidad_selecionada_div.splice(parseInt(i))
    }
    this.unidad_selecionada_brigada = []
    this.unidad_selecionada_batallones = []

    this.unidad_selecionada_div = this.listados.unidades_filtradas(this.divi_padre, evaluar, respuesta)

  }
  brigadas(evaluar: number, respuesta: number) {

    for (let i in this.unidad_selecionada_brigada) {
      this.unidad_selecionada_brigada.splice(parseInt(i))
    }

    this.unidad_selecionada_batallones = []
    this.unidad_selecionada_brigada = this.listados.unidades_filtradas(this.divi_hija, evaluar, respuesta)

  }
  batallones(evaluar: number, respuesta: number) {

    for (let i in this.unidad_selecionada_brigada) {
      this.unidad_selecionada_batallones.splice(parseInt(i))
    }
    this.unidad_selecionada_batallones = this.listados.unidades_filtradas(this.brigada, evaluar, respuesta)
  }
  clear() {
    window.location.reload()
    this.inf_btn = true
    this.inf_btnuew = false
  }
  
  validar_informacion(infor: string, nombre: string) {
    const elemento = document.getElementById(nombre) as HTMLElement
    if (!infor || infor === "" || infor === "---") {

      elemento!.style.cssText = "background-color: darkred; color: white;"

      this.valicaion_array.push("false")
    } else {

      elemento!.style.cssText = "background-color: darkgreen; color: white"

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
  validar_informacion_2(infor: number, nombre: string) {
    const elemento = document.getElementById(nombre) as HTMLElement
    if (!infor) {

      if (infor == 0) {
        var infor_str = infor.toString()
        elemento!.style.cssText = "background-color: darkgreen; color: white"


        this.valicaion_array.push("true")
      } else {

        elemento!.style.cssText = "background-color: darkred; color: white;"

        this.valicaion_array.push("false")
      }

    } else {

      var infor_str = infor.toString()
      elemento!.style.cssText = "background-color: darkgreen; color: white"
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
  guardar_evento(form: NgForm) {

    if (this.servicio_publico.length != 0) {
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("informacion_peloton", String(this.servicio_publico));
    
      this.api_serve.aetcr_peloton(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key

            if (key === "respuesta") {
              this.inf_c_g = String(dato)
            }
          });

          this.inf_g = true
          this.inf_a = false
          
          this.inf_btn = true
          this.inf_btnuew = false

          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")

          this.router.navigate(["/listado_aetcr"])

        },
        error: (err: HttpErrorResponse) => {

          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")

          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
        }
      })

    
  }
}
}
