import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PointServiceService } from 'src/app/servicios_generales/mapa/point-service.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';


@Component({
  selector: 'app-mapa-aetcr',
  templateUrl: './mapa-aetcr.component.html',
  styleUrls: ['./mapa-aetcr.component.css']
})
export class MapaAetcrComponent {

  constructor(private selector: SelectoresService, private point: PointServiceService, private api_serve: ServiceConecionService, private cookie: CookieService, private router: Router){
    sessionStorage.removeItem("mapa_aetcr")
    sessionStorage.removeItem("mapa_aetcr_pelotones")
  }

  mapa_aetcr:{} = JSON.parse(sessionStorage.getItem("mapa_aetcr")!)
  mapa_aetcr_pelotones:{} = JSON.parse(sessionStorage.getItem("mapa_aetcr_pelotones")!)

  mapa_aetcr_gra:String[]=[]
  mapa_aetcr_pelotones_mapa:String[]=[]


  valicaion_array: string[] = []
  formData = new FormData();
  validacion: boolean = false

  aler_p_datos: boolean = false
  datos_resultados:string[]=[]

  resultados_oculto(){
    var resultados_oculto = document.getElementById("resultados_oculto")
    resultados_oculto?.classList.toggle("resultados_oculto")

    var buton_x = document.getElementById("buton_x")
    buton_x?.classList.toggle("resultados_oculto")

    var btn_buscar = document.getElementById("btn_buscar")
    btn_buscar?.classList.toggle("resultados_oculto")
    
    
  }
  @ViewChild(MapaDigitalComponent) mapa_digital: MapaDigitalComponent
  ngOnInit(): void {
    
    this.mapa_aetcr_gra =  this.selector.array_listados(this.mapa_aetcr)
    this.mapa_aetcr_pelotones_mapa =  this.selector.array_listados(this.mapa_aetcr_pelotones)
}

  ngAfterViewInit(): void {
    
    //this.mapa_digital.eliminar()
    this.mapa_digital.crear_point_aetcr_mapa(this.mapa_aetcr_gra)
    this.mapa_digital.crear_point_aetcr_mapa_peloton(this.mapa_aetcr_pelotones_mapa)

    
  }
  resultados_selecionados(item:string){
    const municipios = item
    
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)
    
    this.aler_p_datos=true
    

      if (!this.datos_resultados.includes(item)) {
        this.datos_resultados.push(item)
        che_1?.classList.toggle("che_1")
      }else{
        var indice = this.datos_resultados.indexOf(item); // obtenemos el indice
        this.datos_resultados = this.datos_resultados.filter(function(i) { return i !== item }); // filtramos
        
        che_1?.classList.toggle("che_1")
      }
      
      // console.log(this.datos_municipios)
    
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
  graficar_mapa(form: NgForm){
   
    const fecha_ingreso = form.value.fecha_ingreso

    // this.validar_informacion(sigla_unidad, "sigla_unidad")

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.validDates(fecha_ingreso, "fecha_ingreso")
    this.validar_informacion(fecha_ingreso, "fecha_ingreso")

   

    this.validacion = this.valicacion_array_funcion(this.valicaion_array)
    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    
    if (!this.validacion) {
      alert("Debe de llenar toda la información")
      for (let i in this.valicaion_array) {
        this.valicaion_array.splice(parseInt(i))
      }
      var espiner = document.getElementById("espiner")
      espiner?.classList.remove("lds-spinner")


    } else {
      
        this.api_serve.mapa_aetcr(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            // console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
        
              if (key === "mapa_aetcr") {
                sessionStorage.removeItem("mapa_aetcr")
                sessionStorage.setItem("mapa_aetcr", JSON.stringify(dato))
        
              }
              if (key === "mapa_aetcr_pelotones") {
                sessionStorage.removeItem("mapa_aetcr_pelotones")
                sessionStorage.setItem("mapa_aetcr_pelotones", JSON.stringify(dato))
        
              }
 

            });

            location.reload()
            var espiner = document.getElementById("espiner")
            espiner?.classList.remove("lds-spinner")
            // this.router.navigate(["/mapa_alertas"])

          },
          error: (err: HttpErrorResponse) => {

            alert("error de conexion")
          }
        })
      
    }
    // mapa_alertas_get
   
  }
}
