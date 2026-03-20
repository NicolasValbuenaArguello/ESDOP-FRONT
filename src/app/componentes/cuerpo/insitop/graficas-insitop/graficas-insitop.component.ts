import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chart, ChartType } from 'chart.js/auto';
import { marker } from 'leaflet';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-graficas-insitop',
  templateUrl: './graficas-insitop.component.html',
  styleUrls: ['./graficas-insitop.component.css']
})
export class GraficasInsitopComponent implements OnInit {
  data_set: { label: string; data: number[]; fill: boolean; borderColor: string; tension: number; };
  constructor(private api_serve: ServiceConecionService, private cookie: CookieService, private usuarios: SelectoresService,) {
    //this.grafica_listado_insitop()
  }
  public chart: Chart;
  public chart_1: Chart;



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

  labels_insitop: string[] = []
  data_insitop: number[] = []
  valor_div01: any[] = []

  datos_srt: any[] = []
  labe_unidades: string[] = []
  serie2: number[] = []
  tipo_filtro:string=""
  unidad_f:string=""
 

  ngOnInit(): void {
    this.grafica_listado_insitop()
  }
  actulizar(){
    this.grafica_listado_insitop()
  }
  destrui(){
    this.chart.destroy()
    this.chart_1.destroy()
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

    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")

    if (identificador == 1) {
      oculto_documentos?.classList.toggle("oculto_documentos")
    }
    if (identificador == 2) {
      oculto_documentos_modificar?.classList.toggle("oculto_documentos_modificar")
    }

  }

  graficas() {
    var r = 128
    var g = 35
    var b = 0
    this.datos_srt=[]

    for (let index = 0; index < this.labe_unidades.length; index++) {
      this.serie2 = []
      var color = 'rgb(' + r + ', ' + g + ', ' + b + ')'

      for (let index_2 = 0; index_2 < this.valor_div01.length; index_2++) {
        this.serie2.push(this.valor_div01[index][index_2])

      }
      if (r < 250 && g < 250 && b < 250) {
        r = Math.floor(Math.random() * 250)
        g = Math.floor(Math.random() * 250)
        b = Math.floor(Math.random() * 250)
      } else {
        r = 128
        g = 0
        b = 0
      }


      this.data_set = {
        label: this.labe_unidades[index],
        data: this.valor_div01[index],
        fill: false,
        borderColor: color,
        tension: 0.1,


      }
      this.datos_srt.push(this.data_set)

    }

    //this.contar()
    
    if (this.unidad_f=="") {
     var label = 'CANTIDAD DEPERSONAL INSITOP'
    } else {
      var label = 'CANTIDAD DEPERSONAL '+ this.unidad_f
    }
    
    const data = {
      labels: this.labels_insitop,
      datasets: [{
        label: label,
        data: this.data_insitop,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      }],
      display: false
    };

    const data_1 = {
      labels: this.labels_insitop,
      datasets: this.datos_srt,


    };


    // Creamos la gráfica
    this.chart = new Chart("chart", {
      type: 'line' as ChartType, // tipo de la gráfica 
      data: data // datos 
    });
    this.chart_1 = new Chart("chart_1", {
      type: 'line' as ChartType, // tipo de la gráfica 
      data: data_1,



    });

    this.chart_1.update();
    this.chart.update();

  }
  grafica_listado_insitop() {

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //plazos


    //
    this.api_serve.listado_inistop_grafico(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "labels_insitop") {
            sessionStorage.removeItem("labels_insitop")
            sessionStorage.setItem("labels_insitop", JSON.stringify(dato))
            this.labels_insitop = JSON.parse(sessionStorage.getItem("labels_insitop")!)

          }
          if (key === "data_insitop") {
            sessionStorage.removeItem("data_insitop")
            sessionStorage.setItem("data_insitop", JSON.stringify(dato))
            this.data_insitop = JSON.parse(sessionStorage.getItem("data_insitop")!)

          }
          if (key === "valor_div01") {
            sessionStorage.removeItem("valor_div01")
            sessionStorage.setItem("valor_div01", JSON.stringify(dato))
            this.valor_div01 = JSON.parse(sessionStorage.getItem("valor_div01")!)

          }
          if (key === "labe_unidades") {
            sessionStorage.removeItem("labe_unidades")
            sessionStorage.setItem("labe_unidades", JSON.stringify(dato))
            this.labe_unidades = JSON.parse(sessionStorage.getItem("labe_unidades")!)

          }
          if (key === "tipo_filtro") {
            this.tipo_filtro = dato

          }

          //this.router.navigate(["/ver_informacon_personal"])

        });
        this.graficas()
        // this.inf_c_g = String(result)

        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")


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

  grafica_listado_insitop_unidad(form: NgForm) {
    const unidad =  form.value.unidad
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("tipo_filtro", this.tipo_filtro);
    this.formData.append("unidad", unidad);
    this.formData.append("unidad_f", this.unidad_f);


    //alert(this.fecha_insitop)

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //plazo
    
    this.api_serve.cargue_listado_inistop_grafico_unidad(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "labels_insitop") {
            sessionStorage.removeItem("labels_insitop")
            sessionStorage.setItem("labels_insitop", JSON.stringify(dato))
            this.labels_insitop = JSON.parse(sessionStorage.getItem("labels_insitop")!)

          }
          if (key === "data_insitop") {
            sessionStorage.removeItem("data_insitop")
            sessionStorage.setItem("data_insitop", JSON.stringify(dato))
            this.data_insitop = JSON.parse(sessionStorage.getItem("data_insitop")!)

          }
          if (key === "valor_div01") {
            sessionStorage.removeItem("valor_div01")
            sessionStorage.setItem("valor_div01", JSON.stringify(dato))
            this.valor_div01 = JSON.parse(sessionStorage.getItem("valor_div01")!)


          }
          if (key === "labe_unidades") {
            sessionStorage.removeItem("labe_unidades")
            sessionStorage.setItem("labe_unidades", JSON.stringify(dato))
            this.labe_unidades = JSON.parse(sessionStorage.getItem("labe_unidades")!)

          }

          if (key === "unidad_f") {
            this.unidad_f = dato

          }
          if (key === "tipo_filtro") {
            this.tipo_filtro = dato


          }
          
          //this.router.navigate(["/ver_informacon_personal"])

        });
        this.destrui()
        this.graficas()
        this.mostrar_proyecto()
        // this.inf_c_g = String(result)

        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")

        // Creamos la gráfica
        
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
