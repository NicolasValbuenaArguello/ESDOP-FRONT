import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, ChartType } from 'chart.js/auto';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PointServiceService } from 'src/app/servicios_generales/mapa/point-service.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-pasos-fronterizos-cargue',
  templateUrl: './pasos-fronterizos-cargue.component.html',
  styleUrls: ['./pasos-fronterizos-cargue.component.css']
})
export class PasosFronterizosCargueComponent {

  constructor(private api_serve: ServiceConecionService, private cookie: CookieService, private usuarios: SelectoresService, private point: PointServiceService, private router: Router) {
    //this.listado_insitop()
  }
  formData = new FormData()
  das_general: string[] = []
  control: any[] = []
  dash_divisiones: string[] = []
  paso: string[] = []
  dash_unidades: string[] = []
  dash_label: string[] = []


  general: boolean = true
  general_2: boolean = false
  general_3: boolean = false
  general_4: boolean = false

  valor_informacion:number[]=[0,0,0,0,0,0,0]
  valor_informacion_control:number[]=[]

   public chart_1: Chart;
  cambio_informacion() {
    

    if (this.general == true) {
      this.general = false
      this.general_2 = true
      this.general_3 = false
      this.general_4 = false
    } else {
      this.general = true
      this.general_2 = false
      this.general_3 = false
      this.general_4 = false
    }
  }
  //(change)="cambio_dash(1)"
  cambio_dash(form: NgForm){
    
    const dash_res = form.value.dash_res
    this.valor_informacion=[]
    this.valor_informacion_control=[]
    for (let x = 0; x < this.dash_divisiones.length; x++) {

      for (let index = 0; index < 48; index++) {

        if(dash_res == this.dash_divisiones[x][index]){
          this.valor_informacion_control.push(parseInt(this.dash_divisiones[x][index+2]))
        }
        
      }
      
      
    }
    
    this.destruir()
    this.valor_informacion= this.valor_informacion_control
    this.construir()
    //this.chart_1.update()
  }
  das_indi(){

    var oculto = document.getElementById("oculto")
    //;
    if (this.general_4 == true) {
      this.general = true
      this.general_2 = false
      this.general_3 = false
      this.general_4 = false
      this.destruir()
      oculto?.classList.add("oculto")
      
      
    } else {
      this.general = false
      this.general_2 = false
      this.general_3 = false
      this.general_4 = true
      //this.chart_1.update()
      this.construir()
      oculto?.classList.remove("oculto")
      
    } 
  }
  construir(){

    var data = {
      labels: this.dash_unidades,
      datasets: [{
        label: 'PERSONAL EN DESCANSO',
        data: this.valor_informacion,
        display: true,
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
    
  }
destruir(){
  this.chart_1.destroy()
}
  cambio_informacion_2(item: number) {


    //console.log(this.dash_divisiones[item])

    this.control=[]
    var a =0
    var b = 1
    var c = 2
   for (let index = 0; index < 16; index++) {
    this.paso=[]
    this.paso.push(this.dash_divisiones[item][a])
    this.paso.push(this.dash_divisiones[item][b])
    this.paso.push(this.dash_divisiones[item][c])
    a = a + 3
    b = b + 3
    c = c + 3
    this.control.push(this.paso)
    
   }
  
    if (this.general_2 == true) {
      this.general = false
      this.general_2 = false
      this.general_3 = true
      this.general_4 = false
    } else {
      this.general = false
      this.general_2 = true
      this.general_3 = false
      this.general_4 = false
    }
  }
  paso_fronterizos(form: NgForm) {

    const fecha_pasos_informacion = form.value.fecha_pasos_informacion


    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));


    this.formData.append("fecha_pasos_informacion", fecha_pasos_informacion);

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")


    //

    this.api_serve.ver_inf_pasos_fronteras_dash(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        // console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "das_general") {
            sessionStorage.removeItem("das_general")
            sessionStorage.setItem("das_general", JSON.stringify(dato))
            this.das_general = JSON.parse(sessionStorage.getItem("das_general")!)
          }
          if (key === "dash_divisiones") {
            sessionStorage.removeItem("dash_divisiones")
            sessionStorage.setItem("dash_divisiones", JSON.stringify(dato))
            this.dash_divisiones = JSON.parse(sessionStorage.getItem("dash_divisiones")!)
          }
          if (key === "dash_unidades") {
            sessionStorage.removeItem("dash_unidades")
            sessionStorage.setItem("dash_unidades", JSON.stringify(dato))
            this.dash_unidades = JSON.parse(sessionStorage.getItem("dash_unidades")!)
          }
          if (key === "dash_label") {
            sessionStorage.removeItem("dash_label")
            sessionStorage.setItem("dash_label", JSON.stringify(dato))
            this.dash_label = JSON.parse(sessionStorage.getItem("dash_label")!)
          }
          
        });



        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
        // this.router.navigate(["/mapa_alertas"])

      },
      error: (err: HttpErrorResponse) => {

        alert("error de conexion")
        var espiner = document.getElementById("espiner")
        espiner?.classList.remove("lds-spinner")
      }
    })

  }
}
