import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ServiceConecionService } from 'src/app/service-conecion.service';


@Component({
  selector: 'app-estadistica-excel',
  templateUrl: './estadistica-excel.component.html',
  styleUrls: ['./estadistica-excel.component.css']
})
export class EstadisticaExcelComponent {
  constructor(private api_serve: ServiceConecionService) { }
  datos: {} = {}
  @Input() registrado: boolean;
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

  form_data = new FormData()
  channelForm: FormGroup;

  hechos() {
    const file_hechos = document.getElementById("hechos_file")
    file_hechos?.click()
  }

  leer_hechos(event: Event) {

    const file_hechos = document.getElementById("hechos_file") as HTMLInputElement
    let leer_hechos_name = file_hechos.files![0].name

    const target = event.target as HTMLInputElement;
    const file: FileList | null = target.files

    if (file!.length < 0 && file != null) {

      Array.prototype.forEach.call(file, (file: File) => {
        this.form_data.append("hechos", file)
      })

    }
    this.inf_u = true
    this.inf_c = leer_hechos_name


  }

  resultados() {

    const leer_resultados = document.getElementById("leer_resultados")
    leer_resultados?.click()

  }
  leer_resultados_exel(event: Event) {
    const leer_resultados = document.getElementById("leer_resultados") as HTMLInputElement
    let leer_resultados_name = leer_resultados.files![0].name
    const target = event.target as HTMLInputElement;
    const file: FileList | null = target.files

    if (file!.length < 0 && file != null) {

      Array.prototype.forEach.call(file, (file: File) => {
        this.form_data.append("Resultados", file)
      })

    }

    this.inf_r = true
    this.inf_c_r = leer_resultados_name
  }
  herracion() {
    const leer_herradicacion = document.getElementById("leer_herradicacion")
    leer_herradicacion?.click()
  }
  leer_herradicacion_exel(event: Event) {
    const leer_herradicacion = document.getElementById("leer_herradicacion") as HTMLInputElement
    let file = leer_herradicacion.files![0].name

    this.inf_h = true
    this.inf_c_h = file
  }


  guardar(form: FormData) {
    const hechos_file = document.getElementById("hechos_file") as HTMLInputElement
    let hechos_file_inf = hechos_file.files![0]

    const leer_resultados = document.getElementById("leer_resultados") as HTMLInputElement
    let leer_resultados_name = leer_resultados.files![0]

    const formData = new FormData();

    formData.append("hechos", hechos_file_inf, hechos_file_inf.name);
    formData.append("resultados", leer_resultados_name, leer_resultados_name.name);

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    this.api_serve.conexion_api_enpoint(formData, ":5030", "/api").subscribe({
      next: (result: HttpResponse<any>) => {
        // console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key
          if (key === "informacion") {
            this.inf_i = true
            this.inf_i_g = String(dato)
          }
          if (key === "fultimo_registro") {
            sessionStorage.removeItem("fultimo_registro")
            sessionStorage.setItem("fultimo_registro", JSON.stringify(dato))
          }

        });
        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        this.inf_i = true
        this.inf_i_g = String(err.status)
        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
      }
    })





  }

  // conecion(x: {}) {

  //   Object.entries(x).forEach(([key, value]) => {
  //     var dato = value
  //     var key = key

  //     this.inf_i = true
  //     this.inf_i_g = String(dato)

  //     var espiner = document.getElementById("espiner")
  //     espiner?.classList.remove("lds-spinner")
  //   });

  // }


}

