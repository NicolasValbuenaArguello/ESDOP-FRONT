import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-eventos-relevantes',
  templateUrl: './ver-eventos-relevantes.component.html',
  styleUrls: ['./ver-eventos-relevantes.component.css'],

})
export class VerEventosRelevantesComponent {
  @ViewChild(MapaDigitalComponent) mapa_digital!: MapaDigitalComponent
  constructor(private selector: SelectoresService, private api_serve: ServiceConecionService,  private cookie: CookieService, private router: Router) {
   }

  inf_u:boolean=false
  inf_c:string

  inf_r:boolean = false
  inf_c_r:string

  inf_h: boolean =false
  inf_c_h:string

  inf_g: boolean =false
  inf_c_g:string

  inf_i:boolean = false
  inf_i_g:string 

  inf_a: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData =  new FormData()

  listado_eventos_app: string[] = []
  listado_eventos_app_final: string[] = []

  document_boletin: string = "activo"
  color:string

  fecha_evento:string=JSON.parse(sessionStorage.getItem("fecha_evento")!)
  fecha_evento_final:string=JSON.parse(sessionStorage.getItem("fecha_evento_final")!)
  tipo_evento:string=JSON.parse(sessionStorage.getItem("tipo_evento")!)


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

  tipo_evento_f:string = ""
  fecha_evento_f:string = ""
  hora_evento:string = ""
  cp:string = ""
  pel:string = ""
  municipio:string = ""
  sitio:string = ""
  latitud:string = ""
  gr_n:string = ""
  m_n:string = ""
  s_n:string = ""
  longitud:string = ""
  gr_l:string = ""
  m_l:string = ""
  s_l:string = ""
  enemigo:string = ""
  estructura:string = ""
  hecho:string = ""
  resumen:string = ""
  estado:string = ""
  id_evento:string=""

  nombre: string = ""
  link: string = ""
  server:string=""
  dato:string=""
  eventos_relevantes_selecionados :string[] = []

  ngOnInit(): void {

    this.listado_eventos_app = JSON.parse(sessionStorage.getItem("listado_eventos")!)

  }
  
  celecionar_celda(item: string){
    var celda = document.getElementById(item[0])
    var generar_planilla = document.getElementById("generar_planilla")
    
    celda?.classList.remove("oculto")


    if(!this.eventos_relevantes_selecionados.includes(item[0])){
      this.eventos_relevantes_selecionados.push(item[0])
    }
    else{
      celda?.classList.add("oculto")
    
      var indice = this.eventos_relevantes_selecionados.indexOf(item[0]); // obtenemos el indice
      this.eventos_relevantes_selecionados = this.eventos_relevantes_selecionados.filter(function(i) { return i !== item[0] }); // filtramos
    }

    if (this.eventos_relevantes_selecionados.length > 0) {
      generar_planilla?.classList.remove("oculto")
    } else {
      generar_planilla?.classList.add("oculto")
    }
    
  }
 quitar_selecion(item:string){
  var celda = document.getElementById(item)
  var generar_planilla = document.getElementById("generar_planilla")
  celda?.classList.add("oculto")

  var indice = this.eventos_relevantes_selecionados.indexOf(item); // obtenemos el indice
  this.eventos_relevantes_selecionados = this.eventos_relevantes_selecionados.filter(function(i) { return i !== item }); // filtramos
  if (this.eventos_relevantes_selecionados.length > 0) {
    generar_planilla?.classList.remove("oculto")
  } else {
    generar_planilla?.classList.add("oculto")
  }
 }
  selecionar_evento(form: NgForm){

    const evento_a_selecionar = form.value.evento_a_selecionar
    
    for(let x in this.listado_eventos_app){

      if (evento_a_selecionar == this.listado_eventos_app[x][0]) {
        
        this.id_evento = this.listado_eventos_app[x][0]
        
        this.fecha_evento_f = this.listado_eventos_app[x][1]
        this.hora_evento = this.listado_eventos_app[x][2]
        this.divi_padre = this.listado_eventos_app[x][3]
        
        this.divi_hija = this.listado_eventos_app[x][4]
        this.brigada = this.listado_eventos_app[x][5]
        this.batallon = this.listado_eventos_app[x][6]
        this.cp = this.listado_eventos_app[x][7]
        this.pel = this.listado_eventos_app[x][8]
        this.departamento = this.listado_eventos_app[x][9]
        this.municipio = this.listado_eventos_app[x][10]
        this.sitio = this.listado_eventos_app[x][11]
        this.latitud = this.listado_eventos_app[x][12]
        this.gr_n = this.listado_eventos_app[x][13]
        this.m_n = this.listado_eventos_app[x][14]
        this.s_n = this.listado_eventos_app[x][15]
        this.longitud = this.listado_eventos_app[x][16]
        this.gr_l = this.listado_eventos_app[x][17]
        this.m_l = this.listado_eventos_app[x][18]
        this.s_l = this.listado_eventos_app[x][19]
        this.enemigo = this.listado_eventos_app[x][20]
        this.estructura = this.listado_eventos_app[x][21]
        this.hecho = this.listado_eventos_app[x][22]
        this.resumen = this.listado_eventos_app[x][23]
        this.estado = this.listado_eventos_app[x][24]
        this.tipo_evento_f = this.listado_eventos_app[x][25]
  
        this.id_evento = this.listado_eventos_app[x][0]
      
      }
    }

  }
  departamentos(evaluar: number, respuesta: number) {

    for (let i in this.departamentos_filtrados) {
      this.unidad_selecionada_municipios.splice(parseInt(i))
    }
    this.unidad_selecionada_municipios = this.selector.unidades_filtradas(this.departamento, evaluar, respuesta)
  
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
  clear(){
  this.fecha_evento = ""
  this.fecha_evento_final = ""
  this.tipo_evento = ""
  this.server = ""

  }

  ngAfterViewInit() {
    this.mapa_digital.crear_point_eventos(this.listado_eventos_app)
  }
  info(id:string){
    // console.log(this.listado_usurios[id])
    sessionStorage.removeItem("inf_evento_re")
    sessionStorage.setItem("inf_evento_re", JSON.stringify(id))
    
    this.router.navigate(["/VerBitacoraComponent"])
  }
  mostrar_proyecto(){
    var proyecto =  document.getElementById("proyecto_ingreso")
    proyecto?.classList.toggle("oculto")

    var oculto_documentos =  document.getElementById("oculto_documentos")
    var oculto_documentos_modificar =  document.getElementById("oculto_documentos_modificar")

    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
  }
  mostrar_menu(identificador:number){
    var oculto_documentos =  document.getElementById("oculto_documentos")
    var oculto_documentos_modificar =  document.getElementById("oculto_documentos_modificar")
    var oculto_documentos_descargar =  document.getElementById("oculto_documentos_descargar")
    var oculto_documentos_modificar_cargar =  document.getElementById("oculto_documentos_modificar_cargar")
    var oculto_documentos_descargar_unidades =  document.getElementById("oculto_documentos_descargar_unidades")

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
  cargar_acta_alerta() {

    const radiograma_unidad = document.getElementById("cumplido_soporte")
    radiograma_unidad?.click()
  }
  leer_acta_alerta(event: Event) {
    const acta_reserva = document.getElementById("cumplido_soporte") as HTMLInputElement
    let acta_alerta_name = acta_reserva.files![0].name
    this.inf_r = true
    this.inf_c_r = acta_alerta_name
  }
  llenar_documentos_acta(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
      this.formData.append("documento_guardar_2", "---");
    } else {
      this.formData.append(nombre, "---");
      this.formData.append("documento_guardar_2", "-//-");
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
  guardar_evento(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
  
  
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
      const estado = form.value.estado
  
    // console.log(typeof(m_l))
    // console.log(m_l)
  
  
  
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
  
    this.validar_informacion(hecho, "hecho")
    this.validar_informacion(resumen, "resumen")
    this.validar_informacion(enemigo, "enemigo")
    this.validar_informacion(estructura, "estructura")
    this.validar_informacion(tipo_evento, "tipo_evento")

    this.validar_informacion(estado, "estado")

  
    this.formData.append("cp", cp);
    this.formData.append("pel", pel);
    this.formData.append("id", this.id_evento);
  
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
      
      this.api_serve.editar_eventos_relevantes(this.formData).subscribe({
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
cerrar(){
  var proyecto =  document.getElementById("proyecto_ingreso")
  proyecto?.classList.remove("oculto")
  proyecto?.classList.add("oculto")
  window.location.reload()
}
  mostrar_proyecto_imagen(documento:string){
    this.server = ""
   
    var proyecto =  document.getElementById("proyecto_ingreso")
    proyecto?.classList.remove("oculto")
    proyecto?.classList.add("oculto")

    var lamina =  document.getElementById("lamina")
    lamina?.classList.toggle("oculto")
    
    this.server = "http://172.22.2.36:5198"+documento
    //alert(this.server)


  }
  descargar_eventos(form: NgForm) {

    const fecha_evento = form.value.fecha_evento
    const fecha_evento_final = form.value.fecha_evento_final
    const tipo_evento = form.value.tipo_evento
    const divi_padre = form.value.divi_padre
    const departamento = form.value.departamento
    const id = form.value.id
  
      this.formData.append("permiso", this.cookie.get("permiso"));
      this.formData.append("unidad", this.cookie.get("unidad"));
  
      this.formData.append("fecha_evento", fecha_evento);
      this.formData.append("fecha_evento_final", fecha_evento_final);
      this.formData.append("tipo_evento", tipo_evento);
      this.formData.append("divi_padre", divi_padre);
      this.formData.append("departamento", departamento);
      
      this.formData.append("id", id);
      this.formData.append("eventos_relevantes_selecionados", String(this.eventos_relevantes_selecionados));
      
      var espiner = document.getElementById("espiner")
      espiner?.classList.add("lds-spinner")
  
      sessionStorage.removeItem("fecha_evento")
      sessionStorage.setItem("fecha_evento", JSON.stringify(fecha_evento))
      this.fecha_evento = JSON.parse(sessionStorage.getItem("fecha_evento")!)
  
      sessionStorage.removeItem("fecha_evento_final")
      sessionStorage.setItem("fecha_evento_final", JSON.stringify(fecha_evento_final))
      this.fecha_evento_final = JSON.parse(sessionStorage.getItem("fecha_evento_final")!)
  
      sessionStorage.removeItem("tipo_evento")
      sessionStorage.setItem("tipo_evento", JSON.stringify(tipo_evento))
      this.tipo_evento = JSON.parse(sessionStorage.getItem("tipo_evento")!)
      //plazos
      
      this.api_serve.descargar_eventos_relevantes(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          //console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
  

            if (key === "nombre") {
              this.nombre = String(dato);
  
            }
  
            if (key === "link") {
              this.link = String(dato);
  
            }
            
  
            //this.router.navigate(["/ver_informacon_personal"])
  
          });
  
          // this.inf_c_g = String(result)
  
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
            
          const a_href = document.createElement('a')

          a_href.href = this.link
          a_href.download = this.nombre
          //  console.log("http://172.22.2.36:5198" +this.link)
  
  
          a_href.click()
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
  listado_eventos(form: NgForm) {

  const fecha_evento = form.value.fecha_evento
  const fecha_evento_final = form.value.fecha_evento_final
  const tipo_evento = form.value.tipo_evento
  const departamento = form.value.departamento


    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("fecha_evento", fecha_evento);
    this.formData.append("fecha_evento_final", fecha_evento_final);
    this.formData.append("tipo_evento", tipo_evento);
    this.formData.append("departamento", departamento);


    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    sessionStorage.removeItem("fecha_evento")
    sessionStorage.setItem("fecha_evento", JSON.stringify(fecha_evento))
    this.fecha_evento = JSON.parse(sessionStorage.getItem("fecha_evento")!)

    sessionStorage.removeItem("fecha_evento_final")
    sessionStorage.setItem("fecha_evento_final", JSON.stringify(fecha_evento_final))
    this.fecha_evento_final = JSON.parse(sessionStorage.getItem("fecha_evento_final")!)

    sessionStorage.removeItem("tipo_evento")
    sessionStorage.setItem("tipo_evento", JSON.stringify(tipo_evento))
    this.tipo_evento = JSON.parse(sessionStorage.getItem("tipo_evento")!)
    //plazos
    
    this.api_serve.ver_eventos_relevantes(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "listado_eventos") {
            sessionStorage.removeItem("listado_eventos")
            sessionStorage.setItem("listado_eventos", JSON.stringify(dato))
            this.listado_eventos_app = JSON.parse(sessionStorage.getItem("listado_eventos")!)

          }
          this.mapa_digital.crear_point_eventos(this.listado_eventos_app)

          window.location.reload()

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
  cargar_guardar_evento(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div

    const acta_reserva = document.getElementById("cumplido_soporte") as HTMLInputElement
    let acta_alerta = acta_reserva.files![0]
    this.llenar_documentos_acta("documento_guardar", acta_alerta)

      const fecha_evento = form.value.fecha_evento
      const hora_evento = form.value.hora_evento
      const divi_padre = form.value.divi_padre

      const tipo_documneto = form.value.tipo_documneto

    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(fecha_evento, "fecha_evento")
    this.validDates(fecha_evento, "fecha_evento")
    this.validar_informacion(hora_evento, "hora_evento")
    this.validar_informacion(divi_padre, "divi_padre")
    this.validar_informacion(tipo_documneto, "tipo_documneto")

    this.formData.append("id", this.id_evento);
  
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
      
//
      this.api_serve.cargar_documentos_eventos_relevantes(this.formData).subscribe({
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

  

}
