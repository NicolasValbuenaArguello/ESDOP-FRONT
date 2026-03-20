import { Component, ViewChild } from '@angular/core';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ingreso-aetcr',
  templateUrl: './ingreso-aetcr.component.html',
  styleUrls: ['./ingreso-aetcr.component.css']
})
export class IngresoAetcrComponent {
  constructor(private selector: SelectoresService, private menu_service: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService) {
    var today = new Date();
    var year = today.getFullYear();
    var i = 2016
    year = year + 1
    var anio_p = year
    while (i != year) {
      anio_p = anio_p -1
      this.anios.push(anio_p)
      i++;
    }
   }

  unidad_selecionada_div: string[] = []
  destino: string = "---"
  departamento: string = "---"
  municipios: string = "---"
  unidad_selecionada_municipios: string[] = []

  division = this.selector.duplicados()

  departamentos_filtrados = this.selector.departamentos_unicos()


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

  formData = new FormData();

  valicaion_array: string[] = []
  validacion: boolean = false
  cantidad_per_anio: any[] = []
  listado_personal: string[] = []
  anios: number[] = []
  personal:boolean = false
  servicio_publico : any[] = []

  anio_f: string = ''
  cantidad_f: string = ''

  ausencia:string = ''
  img:string = "../../../../../assets/img_user/user.jpg"

  img_atcr:string = "../../../../../assets/img_user/casa.jpg"

  servicios_basicos:string[]=['SERVICIOS PÚBLICOS BÁSICOS', 'INGENIEROS', 'INFRAESTRUCTURA']

  tipo_servicio:string[]=[]
  elemento:string=''

  elemento_oculto:boolean = false
  elemento_oculto_tabla:boolean = false
  elemento_oculto_p:boolean = false

  cantidad_s:string=''
  cantidad_s_s:string='---'
  clasificacion:string[]=['MUY ALTO','ALTO','MEDIANO','BAJO','MINIMO','NO EJC']

  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent
  div_hija(evaluar: number, respuesta: number) {
    for (let i in this.unidad_selecionada_div) {
      this.unidad_selecionada_div.splice(parseInt(i))
    }

    this.unidad_selecionada_div = this.selector.unidades_filtradas(this.destino, evaluar, respuesta)

  }
  departamentos(evaluar: number, respuesta: number) {

    for (let i in this.departamentos_filtrados) {
      this.unidad_selecionada_municipios.splice(parseInt(i))
    }
    this.unidad_selecionada_municipios = this.selector.unidades_filtradas(this.departamento, evaluar, respuesta)

  }
  cambio_color(form: NgForm) {
    
    
    const nivel_de_seguridad = form.value.nivel_de_seguridad
    var colores = document.getElementById('colores')
    colores?.classList.remove('muy_alto')
    colores?.classList.remove('alto')
    colores?.classList.remove('mediano')
    colores?.classList.remove('bajo')
    colores?.classList.remove('minimo')
    colores?.classList.remove('no_ejc')
    
    if (nivel_de_seguridad === "MUY ALTO") {
       colores?.classList.add('muy_alto')
       colores?.classList.remove('alto')
       colores?.classList.remove('mediano')
       colores?.classList.remove('bajo')
       colores?.classList.remove('minimo')
       colores?.classList.remove('no_ejc')


    }
    if (nivel_de_seguridad === "ALTO") {

      colores?.classList.remove('muy_alto')
      colores?.classList.add('alto')
      colores?.classList.remove('mediano')
      colores?.classList.remove('bajo')
      colores?.classList.remove('minimo')
      colores?.classList.remove('no_ejc')
        
    }
    if (nivel_de_seguridad === "MEDIANO") {

      colores?.classList.remove('muy_alto')
      colores?.classList.remove('alto')
      colores?.classList.add('mediano')
      colores?.classList.remove('bajo')
      colores?.classList.remove('minimo')
      colores?.classList.remove('no_ejc') 
        
    }
    if (nivel_de_seguridad === "BAJO") {

      colores?.classList.remove('muy_alto')
      colores?.classList.remove('alto')
      colores?.classList.remove('mediano')
      colores?.classList.add('bajo')
      colores?.classList.remove('minimo')
      colores?.classList.remove('no_ejc')
        
    }
    if (nivel_de_seguridad === "MINIMO") {

      colores?.classList.remove('muy_alto')
      colores?.classList.remove('alto')
      colores?.classList.remove('mediano')
      colores?.classList.remove('bajo')
      colores?.classList.add('minimo')
      colores?.classList.remove('no_ejc')
        
    }
    if (nivel_de_seguridad === "NO EJC") {

      colores?.classList.remove('muy_alto')
      colores?.classList.remove('alto')
      colores?.classList.remove('mediano')
      colores?.classList.remove('bajo')
      colores?.classList.remove('minimo')
      colores?.classList.add('no_ejc')
        
    }


  }
  basicos(form: NgForm) {
    
    const servicios_basicos_selecionados = form.value.servicios_basicos
    this.tipo_servicio = []
    this.elemento_oculto = false
    this.elemento_oculto_p = false

    if (servicios_basicos_selecionados === "SERVICIOS PÚBLICOS BÁSICOS") {
      this.tipo_servicio = ['AGUA POTABLE',"LUZ", "SEÑAR CELULAR", "ALCANTARILLADO" ]
    }
    if (servicios_basicos_selecionados === "INGENIEROS") {
      this.tipo_servicio = ["OBRAS REALIZADAS"]
    }
    if (servicios_basicos_selecionados === "INFRAESTRUCTURA") {
      this.tipo_servicio = ["ESTADO"]

    }

  }

  basicos_selecionados(form: NgForm) {
    
    
    const servicios_basicos_selecionados = form.value.servicios_basicos_selecionados
    this.elemento_oculto = false
    this.elemento_oculto_p=false

    if (servicios_basicos_selecionados === "AGUA POTABLE" || servicios_basicos_selecionados === "LUZ" || servicios_basicos_selecionados === "SEÑAR CELULAR" || servicios_basicos_selecionados === "ALCANTARILLADO" ) {
      this.elemento = 'Inf.'
      this.elemento_oculto = true
      this.elemento_oculto_p=false

    }
    if (servicios_basicos_selecionados === "OBRAS REALIZADAS") {
      this.elemento = 'Cant.'
      this.elemento_oculto = true
      this.elemento_oculto_p=true

    }
    if (servicios_basicos_selecionados === "ESTADO") {
        this.elemento = '%.'
        this.elemento_oculto = true
        this.elemento_oculto_p=true

    }

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
  nuevo_cordinado(form: NgForm) {

    const anio = form.value.anio
    const cant_personas = form.value.cant_personas

    const cordinador = [anio, cant_personas]  
  
    this.cantidad_per_anio.push(cordinador)
    this.personal = true
    this.anio_f = ''
    this.cantidad_f = ''

    var ultimo = this.cantidad_per_anio[this.cantidad_per_anio.length - 1]
    var primer = this.cantidad_per_anio[0]
    let resultados = 0
    resultados = ((ultimo[1] / primer[1])*100)-100

    this.ausencia  = 'ausencia ' + String(Math.round(resultados))+'%'
    
  }
  eliminar_coordinador(item: number) {
    
    this.cantidad_per_anio.splice(item, 1);
    var ultimo = this.cantidad_per_anio[this.cantidad_per_anio.length - 1]
    var primer = this.cantidad_per_anio[0]
    let resultados = 0
    resultados = ((ultimo[1] / primer[1])*100)-100

    this.ausencia  = 'ausencia ' + String(Math.round(resultados))+'%'
    if(this.cantidad_per_anio.length  == 0){
      this.personal = false
    }
  }
  nuevo_servicio(form: NgForm) {
    var cantidad_infor_servicios = '----'
    
    const servicios_basicos = form.value.servicios_basicos
    const servicios_basicos_selecionados = form.value.servicios_basicos_selecionados
    const cantidad_tipo = form.value.cantidad_tipo
    const cantidad_infor_servicios_ingreso = form.value.cantidad_infor_servicios

    if (cantidad_infor_servicios_ingreso) {
      cantidad_infor_servicios = cantidad_infor_servicios_ingreso
    }
    
    const cordinador = [servicios_basicos, servicios_basicos_selecionados, cantidad_tipo, cantidad_infor_servicios]  
  
    this.servicio_publico.push(cordinador)
    this.elemento_oculto_tabla = true
    this.cantidad_s = ''
    this.cantidad_s_s= '---'
    
  }
  eliminar_servicio(item: number) {
    
    this.servicio_publico.splice(item, 1);

    if(this.servicio_publico.length  == 0){
      this.elemento_oculto_tabla = false
    }
  }

  cargar_foto(){
    var foto_user =  document.getElementById("foto_user") as HTMLInputElement 
    foto_user.click()
  }
  leer_foto(event: Event){
    let foto_user =  document.getElementById("foto_user")  as HTMLInputElement
     var file = foto_user.files![0];
    //Creamos la url
    var objectURL = URL.createObjectURL(file)
    this.img = objectURL

  }
  cargar_foto_aetcr(){
    var foto_aetcr =  document.getElementById("foto_aetcr") as HTMLInputElement 
    foto_aetcr.click()
  }
  leer_foto_aetcr(event: Event){
    let foto_aetcr =  document.getElementById("foto_aetcr")  as HTMLInputElement
     var file = foto_aetcr.files![0];
    //Creamos la url
    var objectURL = URL.createObjectURL(file)
    this.img_atcr = objectURL

  }
  

  llenar_documentos_acta(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
      nombre = nombre +'_2'
      this.formData.append(nombre, "---");
    } else {
      this.formData.append(nombre, "---");
      nombre = nombre +'_2'
      this.formData.append(nombre, "-//-");
    }
  }

  guardar_evento(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div

    const acta_reserva = document.getElementById("foto_aetcr") as HTMLInputElement
    let foto_aetcr = acta_reserva.files![0]
    this.llenar_documentos_acta("foto_aetcr", foto_aetcr)

    const numero = form.value.numero
    const fecha = form.value.fecha
    const nombre_aetcr = form.value.nombre_aetcr
    const nivel_de_seguridad = form.value.nivel_de_seguridad
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

    const cant_mujeres = form.value.cant_mujeres
    const cant_hombres = form.value.cant_hombres
   
   
    const foto_user = document.getElementById("foto_user") as HTMLInputElement
    let foto_user_name = foto_user.files![0]
    this.llenar_documentos_acta("foto_user_name", foto_user_name)

    const nombre_aetcr_encargado = form.value.nombre_aetcr_encargado
    const seudonimo_aetcr_encargado = form.value.seudonimo_aetcr_encargado
    const celular_aetcr_encargado = form.value.celular_aetcr_encargado
    const ubicacion_aetcr_encargado = form.value.ubicacion_aetcr_encargado

    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(numero, "numero")

    this.validar_informacion(fecha, "fecha")
    this.validDates(fecha, "fecha")

    this.validar_informacion(nombre_aetcr, "nombre_aetcr")
    this.validar_informacion(nivel_de_seguridad, "nivel_de_seguridad")

    this.validar_informacion(cant_mujeres, "cant_mujeres")
    this.validar_informacion(cant_hombres, "cant_hombres")


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

    this.validar_informacion(nombre_aetcr_encargado, "nombre_aetcr_encargado")
    this.validar_informacion(seudonimo_aetcr_encargado, "seudonimo_aetcr_encargado")
   
    this.validar_informacion(celular_aetcr_encargado, "celular_aetcr_encargado")
    this.validar_informacion(ubicacion_aetcr_encargado, "ubicacion_aetcr_encargado")

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("cantidad_per_anio", String(this.cantidad_per_anio));
    this.formData.append("servicio_publico", String(this.servicio_publico));

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



      this.api_serve.aetcr(this.formData).subscribe({
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
          
          this.inf_btn = false
          this.inf_btnuew = true

          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")

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
