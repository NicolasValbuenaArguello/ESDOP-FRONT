import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import { Chart, ChartType } from 'chart.js/auto';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-graficas-insitop-estado-mayor',
  templateUrl: './graficas-insitop-estado-mayor.component.html',
  styleUrls: ['./graficas-insitop-estado-mayor.component.css']
})
export class GraficasInsitopEstadoMayorComponent implements OnInit {
  constructor(private api_serve: ServiceConecionService, private cookie: CookieService,  private menu_service: SelectoresService) {
    //this.grafica_listado_insitop()
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

  labels_insitop: string[] = []

  valor_div01: number[] = []
  valor_div02: number[] = []
  valor_div03: number[] = []
  valor_div04: number[] = []
  valor_div05: number[] = []

  public chart_1: Chart;
  public chart_2: Chart;
  public chart_3: Chart;
  public chart_4: Chart;
  public chart_5: Chart;

  fecha_insitop = JSON.parse(sessionStorage.getItem("fecha_insitop")!)
  tipo_filtro:string=""
  
  unidad_f:string=""

  ngOnInit(): void {
 
      this.grafica_listado_insitop()
      

  }
  graficios(){
      
    var data = {
      labels: this.labels_insitop,
      datasets: [{
        label: 'PERSONAL EN DESCANSO',
        data: this.valor_div01,
        backgroundColor: [

          'rgba(153, 102, 255, 0.2)',
          
        ],
        borderColor: [

          'rgb(153, 102, 255)',
          
        ],
        borderWidth: 1
      }]
    };

    // Creamos la gráfica
    
    this.chart_1 = new Chart("chart_1", {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data: data, // datos 
      options: { // opciones de la gráfica 
        
          // This chart will not respond to mousemove, etc
       
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
    
    var data_2 = {
      labels: this.labels_insitop,
      datasets: [{
        label: 'PERSONAL EN ENTRENAMIENTO',
        data: this.valor_div02,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',

        ],
        borderColor: [
          'rgba(54, 162, 235)',

        ],
        borderWidth: 1
      }]
    };
    // Creamos la gráfica
    this.chart_2 = new Chart("chart_2", {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data: data_2, // datos 
      options: { // opciones de la gráfica 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
    var data_3 = {
      labels: this.labels_insitop,
      datasets: [{
        label: 'PERSONAL EN OPERACIONES',
        data: this.valor_div03,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',

        ],
        borderColor: [
          'rgba(75, 192, 192)',

        ],
        borderWidth: 1
      }]
    };
    // Creamos la gráfica
    this.chart_3 = new Chart("chart_3", {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data: data_3, // datos 
      options: { // opciones de la gráfica 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
    var data_4 = {
      labels: this.labels_insitop,
      datasets: [{
        label: 'PERSONAL EN ESTADOS MAYORES',
        data: this.valor_div04,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',

        ],
        borderColor: [
          'rgba(255, 159, 64)',

        ],
        borderWidth: 1
      }]
    };
    // Creamos la gráfica
    this.chart_4 = new Chart("chart_4", {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data: data_4, // datos 
      options: { // opciones de la gráfica 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
    var data_5 = {
      labels: this.labels_insitop,
      datasets: [{
        label: 'NOVEDADES',
        data: this.valor_div04,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',

        ],
        borderColor: [
          'rgb(255, 99, 132)',

        ],
        borderWidth: 1
      }]
    };
    // Creamos la gráfica
    this.chart_5 = new Chart("chart_5", {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data: data_5, // datos 
      options: { // opciones de la gráfica 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
            
    this.chart_1.update();
    this.chart_2.update();
    this.chart_3.update();
    this.chart_4.update();
    this.chart_5.update();

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
  destrui(){
    this.chart_1.destroy()
    this.chart_2.destroy()
    this.chart_3.destroy()
    this.chart_4.destroy()
    this.chart_5.destroy()
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

  grafica_listado_insitop() {

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("fecha_insitop", this.fecha_insitop);

    //alert(this.fecha_insitop)

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //plazos


    //

    this.api_serve.estado_mayor_inistop_grafico(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key


          if (key === "total_descanso_data") {

            sessionStorage.removeItem("total_descanso_data")
            sessionStorage.setItem("total_descanso_data", JSON.stringify(dato))
            this.valor_div01 = JSON.parse(sessionStorage.getItem("total_descanso_data")!)


          }
          if (key === "total_entrenamiento_data") {
            sessionStorage.removeItem("total_entrenamiento_data")
            sessionStorage.setItem("total_entrenamiento_data", JSON.stringify(dato))
            this.valor_div02 = JSON.parse(sessionStorage.getItem("total_entrenamiento_data")!)

          }
          if (key === "total_operaciones_data") {
            sessionStorage.removeItem("total_operaciones_data")
            sessionStorage.setItem("total_operaciones_data", JSON.stringify(dato))
            this.valor_div03 = JSON.parse(sessionStorage.getItem("total_operaciones_data")!)

          }
          if (key === "total_emb_data") {
            sessionStorage.removeItem("total_emb_data")
            sessionStorage.setItem("total_emb_data", JSON.stringify(dato))
            this.valor_div04 = JSON.parse(sessionStorage.getItem("total_emb_data")!)

          }
          if (key === "total_novedades_data") {
            sessionStorage.removeItem("total_novedades_data")
            sessionStorage.setItem("total_novedades_data", JSON.stringify(dato))
            this.valor_div05 = JSON.parse(sessionStorage.getItem("total_novedades_data")!)

          }
          if (key === "label") {
            sessionStorage.removeItem("label")
            sessionStorage.setItem("label", JSON.stringify(dato))
            this.labels_insitop = JSON.parse(sessionStorage.getItem("label")!)

          }
          if (key === "tipo_filtro") {
            this.tipo_filtro = dato

          }
          
          //this.router.navigate(["/ver_informacon_personal"])

        });

        this.graficios()

        
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
  grafica_listado_insitop_unidad(form: NgForm) {
    const unidad =  form.value.unidad
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("fecha_insitop", this.fecha_insitop);
    this.formData.append("tipo_filtro", this.tipo_filtro);
    this.formData.append("unidad", unidad);
    this.formData.append("unidad_f", this.unidad_f);

    //alert(this.fecha_insitop)

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //plazo
    this.api_serve.estado_mayor_inistop_grafico_unidad(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key


          if (key === "total_descanso_data") {

            sessionStorage.removeItem("total_descanso_data")
            sessionStorage.setItem("total_descanso_data", JSON.stringify(dato))
            this.valor_div01 = JSON.parse(sessionStorage.getItem("total_descanso_data")!)


          }
          if (key === "total_entrenamiento_data") {
            sessionStorage.removeItem("total_entrenamiento_data")
            sessionStorage.setItem("total_entrenamiento_data", JSON.stringify(dato))
            this.valor_div02 = JSON.parse(sessionStorage.getItem("total_entrenamiento_data")!)

          }
          if (key === "total_operaciones_data") {
            sessionStorage.removeItem("total_operaciones_data")
            sessionStorage.setItem("total_operaciones_data", JSON.stringify(dato))
            this.valor_div03 = JSON.parse(sessionStorage.getItem("total_operaciones_data")!)

          }
          if (key === "total_emb_data") {
            sessionStorage.removeItem("total_emb_data")
            sessionStorage.setItem("total_emb_data", JSON.stringify(dato))
            this.valor_div04 = JSON.parse(sessionStorage.getItem("total_emb_data")!)

          }
          if (key === "total_novedades_data") {
            sessionStorage.removeItem("total_novedades_data")
            sessionStorage.setItem("total_novedades_data", JSON.stringify(dato))
            this.valor_div05 = JSON.parse(sessionStorage.getItem("total_novedades_data")!)

          }
          if (key === "label") {
            sessionStorage.removeItem("label")
            sessionStorage.setItem("label", JSON.stringify(dato))
            this.labels_insitop = JSON.parse(sessionStorage.getItem("label")!)

          }
          if (key === "tipo_filtro") {
            this.tipo_filtro = dato

          }
          if (key === "unidad_f") {
            this.unidad_f = dato

          }
          //this.router.navigate(["/ver_informacon_personal"])

        });
        this.destrui()
        this.graficios()
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

