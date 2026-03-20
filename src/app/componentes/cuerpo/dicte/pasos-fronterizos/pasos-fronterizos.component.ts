import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PointServiceService } from 'src/app/servicios_generales/mapa/point-service.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { MapaDigitalComponent } from '../../eventos_c/mapa-digital/mapa-digital.component';
import html2canvas from "html2canvas";
import { Router } from '@angular/router';


@Component({
  selector: 'app-pasos-fronterizos',
  templateUrl: './pasos-fronterizos.component.html',
  styleUrls: ['./pasos-fronterizos.component.css']
})
export class PasosFronterizosComponent {
  @ViewChild(MapaDigitalComponent) mapa_digital!: MapaDigitalComponent

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  constructor(private api_serve: ServiceConecionService, private cookie: CookieService, private usuarios: SelectoresService, private point: PointServiceService, private router: Router) {
    //this.listado_insitop()
  }


  inf_u: boolean = false
  inf_c: string

  inf_r: boolean = false
  inf_c_r: string

  inf_h: boolean = false
  inf_c_h: string

  inf_g: boolean = false
  inf_c_g: string

  inf_i: boolean = false
  inf_i_g: string

  inf_a: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData = new FormData()

  cargue_excel: boolean = false
  reporte: boolean = false
  mapa_pazos: boolean = false

  validacion: boolean = false
  valor: number = 2

  link: string = ""
  nombre: string = ""
  mapa_pazos_actualizar: boolean = false
  actualizar_pazos_fronteras: boolean = false

  descargar_imagen() {
    this.nombre = String("plasos_fronterizos");
    this.link = "../../../../../assets/plantillas/plasos_fronterizos.xlsx";
    const a_href = document.createElement('a')

    a_href.href = this.link
    a_href.download = this.nombre
    //  console.log("http://172.22.2.36:5198" +this.link)
    a_href.click()
  }
  dash() {
    //this.router.navigate(["/PasosFronterizosCargueComponent"])
    var mapa_dicte = document.getElementById("mapa_dicte")
    mapa_dicte?.classList.add("oculto")

    var mapa_dash = document.getElementById("mapa_dash")
    mapa_dash?.classList.remove("oculto")
  }
  dash_2() {
    //this.router.navigate(["/PasosFronterizosCargueComponent"])
    var mapa_dicte = document.getElementById("mapa_dicte")
    mapa_dicte?.classList.remove("oculto")

    var mapa_dash = document.getElementById("mapa_dash")
    mapa_dash?.classList.add("oculto")
    
  }
  hechos() {
    const file_hechos = document.getElementById("pazos_fronterizos")
    file_hechos?.click()
  }

  pasos() {
    const file_hechos = document.getElementById("pazos_fronterizos_actulizar")
    file_hechos?.click()
  }
  leer_pasos(event: Event) {

    const file_hechos = document.getElementById("pazos_fronterizos_actulizar") as HTMLInputElement
    let leer_hechos_name = file_hechos.files![0].name

    const target = event.target as HTMLInputElement;
    const file: FileList | null = target.files

    if (file!.length < 0 && file != null) {
      Array.prototype.forEach.call(file, (file: File) => {
        this.formData.append("pazos_fronterizos", file)
      })
    }
    this.inf_u = true
    this.inf_c = leer_hechos_name

  }
mostrar_sub_menu(numero: number) {
  const mapa_dicte = document.getElementById("mapa_dicte");

  const paneles = {
    1: "cargue_excel",
    2: "reporte",
    3: "mapa_pazos",
    4: "mapa_pazos_actualizar",
    5: "actualizar_pazos_fronteras"
  } as const;

  // Cerrar todos los paneles
  for (const key of Object.values(paneles)) {
    this[key] = false;
  }

  // Si el número no es 0, activar solo el panel correspondiente
  if (numero !== 0) {
    const propiedad = paneles[numero as keyof typeof paneles];
    this[propiedad] = true;
  }

  // Actualizar clases del mapa
  if (this.cargue_excel || this.reporte || this.mapa_pazos || this.mapa_pazos_actualizar || this.actualizar_pazos_fronteras) {
    mapa_dicte?.classList.remove("mapa_dicte", "mapa_dicte_2");
    mapa_dicte?.classList.add("mapa_dicte");
  } else {
    mapa_dicte?.classList.remove("mapa_dicte", "mapa_dicte_2");
    mapa_dicte?.classList.add("mapa_dicte_2");
  }
}


  leer_hechos(event: Event) {

    const file_hechos = document.getElementById("pazos_fronterizos") as HTMLInputElement
    let leer_hechos_name = file_hechos.files![0].name

    const target = event.target as HTMLInputElement;
    const file: FileList | null = target.files

    if (file!.length < 0 && file != null) {
      Array.prototype.forEach.call(file, (file: File) => {
        this.formData.append("pazos_fronterizos", file)
      })
    }
    this.inf_u = true
    this.inf_c = leer_hechos_name

  }
  llenar_documentos_acta(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
      this.formData.append("pazos_fronterizos_2", "---");
    } else {
      this.formData.append(nombre, "---");
      this.formData.append("pazos_fronterizos_2", "-//-");
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
  clear() {
    window.location.reload()
    this.inf_btn = true
    this.inf_btnuew = false

  }
  guardar(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div

    const pazos_fronterizos_2 = document.getElementById("pazos_fronterizos") as HTMLInputElement
    let pazos_fronterizos = pazos_fronterizos_2.files![0]
    this.llenar_documentos_acta("pazos_fronterizos", pazos_fronterizos)

    // console.log(typeof(m_l))
    // console.log(m_l)

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));


    const fecha_pasos = form.value.fecha_pasos
    this.validDates(fecha_pasos, "fecha_pasos")
    this.validar_informacion(fecha_pasos, "fecha_pasos")

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    //url_cargar_inf_pasos_fronteras: 5011

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

      this.api_serve.Cargar_inf_pasos_fronteras(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "informacion_insitop") {
              this.inf_i_g = String(dato)
            }
          });


          this.inf_i = true
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
  guardar_pasos(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div

    const pazos_fronterizos_2 = document.getElementById("pazos_fronterizos_actulizar") as HTMLInputElement
    let pazos_fronterizos_actulizar = pazos_fronterizos_2.files![0]
    this.llenar_documentos_acta("pazos_fronterizos_actulizar", pazos_fronterizos_actulizar)

    // console.log(typeof(m_l))
    // console.log(m_l)

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));


    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    //url_cargar_inf_pasos_fronteras: 5011

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
      this.api_serve.Cargar_actualizar_pasos_fronteras(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key
            if (key === "informacion_insitop") {
              this.inf_i_g = String(dato)
            }
          });


          this.inf_i = true
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
  ver_fronterizos() {


    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));


    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    this.api_serve.ver_pasos_fronteras(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        // console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "info_mapa_pasos_directiva") {
            sessionStorage.removeItem("info_mapa_pasos_directiva")
            sessionStorage.setItem("info_mapa_pasos_directiva", JSON.stringify(dato))

          }
        });
        var info_mapa_pasos_directiva = this.point.array_listados(JSON.parse(sessionStorage.getItem("info_mapa_pasos_directiva")!))
        this.mapa_digital.crear_point_pasos_directiva(info_mapa_pasos_directiva)

        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
        // this.router.navigate(["/mapa_alertas"])

      },
      error: (err: HttpErrorResponse) => {

        alert("error de conexion")
      }
    })

  }
  paso_fronterizos(form: NgForm) {

    const fecha_pasos_informacion = form.value.fecha_pasos_informacion


    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));


    this.formData.append("fecha_pasos_informacion", fecha_pasos_informacion);

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")



    this.api_serve.ver_inf_pasos_fronteras(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        // console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "info_mapa_pasos") {
            sessionStorage.removeItem("info_mapa_pasos")
            sessionStorage.setItem("info_mapa_pasos", JSON.stringify(dato))

          }
        });
        var info_mapa = this.point.array_listados(JSON.parse(sessionStorage.getItem("info_mapa_pasos")!))
        this.mapa_digital.crear_point_pasos(info_mapa)

        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
        // this.router.navigate(["/mapa_alertas"])

      },
      error: (err: HttpErrorResponse) => {

        alert("error de conexion")
      }
    })

  }
  paso_fronterizos_reporte(form: NgForm) {

    const fecha_pasos_informacion = form.value.fecha_reporte


    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));


    this.formData.append("fecha_pasos_informacion", fecha_pasos_informacion);

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    this.api_serve.ver_reporte_pasos_fronteras(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        // console.log(result)
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

        alert("error de conexion")
      }
    })

  }
  // mapa_alertas_get


}
