import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PointServiceService } from 'src/app/servicios_generales/mapa/point-service.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';



@Component({
  selector: 'app-menu-das-resultados',
  templateUrl: './menu-das-resultados.component.html',
  styleUrls: ['./menu-das-resultados.component.css']
})
export class MenuDasResultadosComponent {
  constructor(private api_serve: ServiceConecionService, private cookie: CookieService, private service: SelectoresService, private point: PointServiceService, private router: Router) {
    //this.listado_insitop()
  }
  oculto: boolean = true
  alerta: string = "---"
  aler_p_i: boolean = false
  aler_p_f: boolean = false
  formData = new FormData()
  das_general_ejc = this.service.das_general_ejc

  /** el presente modulo es para la gestion del menú */
  cerrar_menu() {
    var menu = document.getElementById("menu")
    var menu_cerrar = document.getElementById("menu_cerrar")
    var fondo = document.getElementById("fondo")
    var resultado_das_ejc = document.getElementById("resultado_das_ejc")
    
    if (this.oculto) {
      menu?.classList.add("ocultar")
      resultado_das_ejc?.classList.remove("resultado_das_ejc")
      resultado_das_ejc?.classList.add("resultado_das_ejc_2")
      menu_cerrar?.classList.remove("derecha")
      menu_cerrar?.classList.add("izquierda")

      fondo?.classList.remove("bg_menu_x")
      fondo?.classList.add("bg_menu_2")
      this.oculto = false
    } else {
      menu?.classList.remove("ocultar")
      resultado_das_ejc?.classList.add("resultado_das_ejc")
      resultado_das_ejc?.classList.remove("resultado_das_ejc_2")
      menu_cerrar?.classList.add("derecha")
      menu_cerrar?.classList.remove("izquierda")

      fondo?.classList.add("bg_menu_x")
      fondo?.classList.remove("bg_menu_2")
      this.oculto = true
    }

  }

  paso_fronterizos(form: NgForm) {


    const fechal_primer_lapso_inicial = form.value.fecha_inicio_p
    const fechal_primer_lapso_final = form.value.fecha_final_p
    const obj = form.value.obj
/*
    const fechal_anterior_inicia = form.value.fecha_inicio_u
    const fechal_anterior_final = form.value.fecha_final_u

    const agr_div = form.value.divi_padre
    const Div_FT = form.value.divi_hija
    const br = form.value.brigada
    const dpto = form.value.departamento
    const filtro = form.value.filtro
    const delco_cap= form.value.delco_cap
    const spoa = form.value.spoa
    const op_mayores = form.value.op_mayor
    const apoyo_unidad = form.value.apoyo_unidad
    const afectaciones = form.value.listado_a
    const estrategia = form.value.estrategia
    const tipo_operacion =  form.value.tipo_operacion
    const gaulas = form.value.gaulas

    const coordinadas = form.value.coordinadas
    const conjuntas = form.value.conjuntas 
    const tipo_afectaciones = form.value.tipo_afectaciones 

    const documneto_requerido = form.value.documento
    const cdte = form.value.cdte
    const hechos = form.value.hechos
    
    */

    const fechal_anterior_inicia = ""
    const fechal_anterior_final = ""
    const agr_div = ""
    const Div_FT = ""
    const br = ""
    const dpto = ""
    const filtro = ""
    const delco_cap= ""
    const spoa = ""
    const op_mayores = "---"
    const apoyo_unidad = ""
    const afectaciones = ""
    const estrategia = ""
    const tipo_operacion =  ""
    const gaulas = ""

    const coordinadas = ""
    const conjuntas = ""
    const tipo_afectaciones = "" 

    const documneto_requerido = ""
    const cdte = ""
    const hechos = ""


    // console.log(this.cookie.get("permiso"))
    // var permiso = this.cookie.get("permiso")
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.formData.append("fullname", this.cookie.get("fullname"));

    this.formData.append("fecha_primer_lapso_inicial", fechal_primer_lapso_inicial);
    this.formData.append("fecha_ultimo_lapso_inicial", fechal_primer_lapso_final);
    this.formData.append("fecha_primer_lapso_final", fechal_anterior_inicia);
    this.formData.append("fecha_ultimo_lapso_final", fechal_anterior_final);

    this.formData.append("agr_div", agr_div);
    this.formData.append("Div_FT", Div_FT);

    this.formData.append("br", "");

    this.formData.append("ut", "");


    this.formData.append("dpto", "");

    this.formData.append("mpio", "");
    this.formData.append("filtro", filtro);
    this.formData.append("delco_cap", delco_cap);
    
    this.formData.append("spoa", spoa);
 
    this.formData.append("acam_enemigo", "");
    this.formData.append("acam_estructura", "");
    this.formData.append("ene_estructura", "");

    this.formData.append("enemigo", "");
    this.formData.append("op_mayores", op_mayores);
    this.formData.append("apoyo_unidad", apoyo_unidad);

    this.formData.append("afectaciones", afectaciones);
    this.formData.append("estrategia", estrategia);
    this.formData.append("tipo_operacion", tipo_operacion);
    
    this.formData.append("gaulas", gaulas);

    this.formData.append("coordinadas", coordinadas);
    this.formData.append("conjuntas", conjuntas);
    this.formData.append("tipo_afectaciones", tipo_afectaciones);
    
    this.formData.append("tipo_titulo", "LOGO EJC");
    this.formData.append("documento", documneto_requerido);
    this.formData.append("datos_resultados","");

    this.formData.append("cdte", cdte);
    this.formData.append("hechos", hechos);
    this.formData.append("obj", obj);
    

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    
    //url_ver_inf_resultados_dash
    this.api_serve.ver_inf_resultados_dash(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        // console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "das_general_ejc") {
            sessionStorage.removeItem("das_general_ejc")
            sessionStorage.setItem("das_general_ejc", JSON.stringify(dato))
            this.das_general_ejc = JSON.parse(sessionStorage.getItem("das_general_ejc")!)
            
            this.service.das_general_ejc = this.das_general_ejc

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
