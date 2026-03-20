import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ViewChild, OnInit  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';

@Component({
  selector: 'app-anotaciones-boletin',
  templateUrl: './anotaciones-boletin.component.html',
  styleUrls: ['./anotaciones-boletin.component.css']
})
export class AnotacionesBoletinComponent {

  constructor(private selector: SelectoresService, private menu_service :  SelectoresService,  private cookie: CookieService, private api_serve: ServiceConecionService){

  }

  ngAfterViewInit(): void {
    this.listado_asignados()
    const evento = "VERIFICAR"
    const fecha = "----"
    var cordenada_x = 4.60971
    var cordenada_y = -74.08175
    this.mapa_digital.crear_point(cordenada_x, cordenada_y, evento, fecha)
  }

  unidad_selecionada_div: string[] = []
  unidad_selecionada_municipios: string[] = []

  division = this.selector.duplicados()
  departamentos_filtrados = this.selector.departamentos_unicos()
  amenaza_select = this.selector.amenaza_select()
  amenaza: string = "---"

  amenazados_aelertas = this.selector.amenazados_aelertas
  amenaza_alertas: string = "---"
  
  destino: string = "---"
  departamento: string = "---"
  municipios: string = "---"

  grd_recibe = this.menu_service.gr_cdte
  grd_remitente = this.menu_service.gr_cdte

  lat = this.selector.lat
  lot = this.selector.lot
  lati= this.selector.lati
  loti= this.selector.loti

  coodnadas_lat_gr = this.selector.coordenadas_lat_g
  coodnadas_lat_min= this.selector.coordenadas_lat_m
  coodnadas_lat_seg= this.selector.coordenadas_lat_s

  coodnadas_lot_gr= this.selector.coordenadas_log_g
  coodnadas_lot_min= this.selector.coordenadas_log_n
  coodnadas_lot_seg= this.selector.coordenadas_log_s


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
  inf_r: boolean = false
  inf_c_r: string = "datos "
  divi_padre: string = "---"
  divi_hija: string = "---"
  brigada: string = "---"
  batallon: string = "---"
  unidad_selecionada_brigada: string[] = []
  unidad_selecionada_batallones: string[] = []

  listado_boletin_ooperacional_registrado:string[] = []

  resultado_boletin_registrar:string[] = []
  resultado_reistrar:any[]=[]
  resultado_reistrar_nuevo:string[]=[]
  dato:string[]=[]
  hecho:string[]=[]


  nuevo:boolean =false
  nuevo_antiguo:boolean =true
  resultado:string =""
  resultado_nuevo:string =""
  cantidad:string =""
  vacio:boolean=false

  hechos_antiguo:boolean =true
  hechos_nuevo:boolean =false

@ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent
ocultar_hechos(form: NgForm){
  const nuew_2 = form.value.nuew_hechos
  if (nuew_2) {
    this.hechos_nuevo =false
    this.hechos_antiguo =true
  } else {
    this.hechos_nuevo =true
    this.hechos_antiguo =false
  }
}
quitar_selecion(item:string){

  var indice = this.resultado_reistrar.indexOf(item); // obtenemos el indice
  this.resultado_reistrar = this.resultado_reistrar.filter(function(i) { return i !== item }); // filtramos
  if (this.resultado_reistrar.length > 0) {
    this.vacio=true
  } else {
    this.vacio=false
  }
 }
ocultar_res(form: NgForm){
  const nuew = form.value.nuew
  if (nuew) {
    this.nuevo =false
    this.nuevo_antiguo =true
  } else {
    this.nuevo =true
    this.nuevo_antiguo =false
  }
}
cargar_resultado(form: NgForm){
  this.dato = []
  this.vacio =true
  const resultado = form.value.resultado
  const resultado_nuevo = form.value.resultado_nuevo
  const cantidad = form.value.cantidad
  let dato_valor = ""

  if (resultado_nuevo) {
    dato_valor = resultado_nuevo
    this.resultado_reistrar_nuevo.push(dato_valor)
  } else {
    dato_valor = resultado
  }

  this.dato.push(dato_valor)
  this.dato.push(cantidad)
  this.resultado_reistrar.push(this.dato)

  this.resultado = ""
  this.resultado_nuevo = ""
  this.cantidad = ""

}
point(){
  const evento = "VERIFICAR"
  const fecha = "----"
  var cordenada_x = 4.60971
  var cordenada_y = -74.08175
  this.mapa_digital.crear_point(cordenada_x, cordenada_y, evento, fecha)
}

clics(){
  this.coodnadas_lat_gr = this.selector.coordenadas_lat_g
  this.coodnadas_lat_min= this.selector.coordenadas_lat_m
  this.coodnadas_lat_seg= this.selector.coordenadas_lat_s

  this.coodnadas_lot_gr= this.selector.coordenadas_log_g
  this.coodnadas_lot_min= this.selector.coordenadas_log_n
  this.coodnadas_lot_seg= this.selector.coordenadas_log_s

  this.lati= this.selector.lati
  this.loti= this.selector.loti

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

  const evento = "VERIFICAR"
  const fecha = "----"
  this.mapa_digital.crear_point(this.cordenada_x, this.cordenada_y, evento, fecha)
}
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
cargar_acta_alerta() {

  const radiograma_unidad = document.getElementById("acta_alerta")
  radiograma_unidad?.click()
}
leer_acta_alerta(event: Event) {
  const acta_reserva = document.getElementById("acta_alerta") as HTMLInputElement
  let acta_alerta_name = acta_reserva.files![0].name
  this.inf_r = true
  this.inf_c_r = acta_alerta_name
}
departamentos(evaluar: number, respuesta: number) {

  for (let i in this.departamentos_filtrados) {
    this.unidad_selecionada_municipios.splice(parseInt(i))
  }
  this.unidad_selecionada_municipios = this.selector.unidades_filtradas(this.departamento, evaluar, respuesta)

}

graficar() {
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

  const evento = "VERIFICAR"
  const fecha = "----"
  this.mapa_digital.crear_point(this.cordenada_x, this.cordenada_y, evento, fecha)
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
guardar_evento(form: NgForm) {
  // const numero_boletin_div = form.value.numero_boletin_div

    const boletin = form.value.boletin
    const estado = form.value.estado
    
    const fecha_evento = form.value.fecha_evento
    const hora_evento = form.value.hora_evento
    const divi_padre = form.value.divi_padre
    const divi_hija = form.value.divi_hija
    const brigada = form.value.brigada
    const batallon = form.value.batallon
    const cp = form.value.cp
    const pel = form.value.pel
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
    const enemigo = form.value.enemigo
    const estructura = form.value.estructura
    const hecho = form.value.hecho
    const resumen = form.value.resumen

    const tipo_evento = form.value.tipo_evento
    const nuew_hechos = form.value.nuew_hechos
    const hecho_nuevo = form.value.hecho_nuevo

  this.validar_informacion(boletin, "boletin")
  this.validar_informacion(estado, "estado")
  this.validar_informacion(fecha_evento, "fecha_evento")
  this.validDates(fecha_evento, "fecha_evento")

  this.validar_informacion(hora_evento, "hora_evento")

  this.validar_informacion(divi_padre, "divi_padre")
  this.validar_informacion(divi_hija, "divi_hija")
  this.validar_informacion(brigada, "brigada")
  this.validar_informacion(batallon, "batallon")

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

  if (nuew_hechos) {
    this.validar_informacion(hecho_nuevo, "hecho_nuevo")
  } else {
    this.validar_informacion(hecho, "hecho")
  }

  this.validar_informacion(resumen, "resumen")
  this.validar_informacion(enemigo, "enemigo")

  this.formData.append("tipo_evento", tipo_evento);

  this.formData.append("hecho_nuevo", hecho_nuevo);
  this.formData.append("hecho", hecho);
  this.formData.append("estructura", estructura);

  this.formData.append("resultado_reistrar", String(this.resultado_reistrar));
  this.formData.append("resultado_reistrar_nuevo", String(this.resultado_reistrar_nuevo));

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
    
    this.api_serve.guardar_anotaciones_operacionales(this.formData).subscribe({
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

listado_asignados() {

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
        if (key === "resultado_boletin_registrar") {
          sessionStorage.removeItem("resultado_boletin_registrar")
          sessionStorage.setItem("resultado_boletin_registrar", JSON.stringify(dato))
          this.resultado_boletin_registrar = JSON.parse(sessionStorage.getItem("resultado_boletin_registrar")!)

        }
        if (key === "hecho") {
          sessionStorage.removeItem("hecho")
          sessionStorage.setItem("hecho", JSON.stringify(dato))
          this.hecho = JSON.parse(sessionStorage.getItem("hecho")!)

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
