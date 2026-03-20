import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Route } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceConecionService } from '../../service-conecion.service'
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CronometroService } from 'src/app/servicios_generales/informacion/cronometro.service';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})

export class LoguinComponent implements OnInit {
  @ViewChild('ventanaLogin') ventanaLogin!: ElementRef;
  data: any[] = []
  password: string = ""
  usuario: string = ""
  inf_u: boolean = false
  inf_c: string = ""
  datos: {} = {}
  mostrarLogin = false;
  mostrarReserva = false;
  formData = new FormData();
  elemento: string[] = ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]
  constructor(private router: Router, private api_serve: ServiceConecionService, private cookie: CookieService, private cronometro: AppComponent
  ) { }

  // Movimiento
  isDragging = false;
  offset = { x: 0, y: 0 };

  @ViewChild('loginBox', { static: false }) loginBox!: ElementRef;

  verLogin() {
    this.mostrarLogin = true;
  }

  cerrarLogin() {
    this.mostrarLogin = false;
    this.usuario = '';
    this.password = '';
  }



  login(form: NgForm) {

    const usuario = form.value.usuario
    const pass = form.value.password
    if (usuario && pass) {
      this.inf_u = false

      this.datos = {
        "nombre": usuario,
        "PASS": pass
      }
      this.formData.append("username", usuario);
      this.formData.append("password", pass);
      var espiner = document.getElementById("espiner")
      espiner?.classList.add("lds-spinner")
      this.api_serve.conexion_api_enpoint(this.formData, ":5199", "/token").subscribe({
        next: (result: HttpResponse<any>) => {

          this.conecion(result)


        },
        error: (err: HttpErrorResponse) => {
          console.log(err)

          Object.entries(err).forEach(([key, value]) => {
            var dato = value
            var key = key
            this.inf_u = true
            this.inf_c = String(dato)
            // Ocultarla automáticamente a los 5 segundos
            setTimeout(() => {
              this.inf_u = false;
            }, 5000);

          });
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")

        }
      })
      // this.router.navigate(["cuerpo"])


    } else {
      this.inf_u = true
      this.inf_c = "dede de llenar toda la informacion"
      var espiner = document.getElementById("espiner")
      // Ocultarla automáticamente a los 5 segundos
      setTimeout(() => {
        this.inf_u = false;
      }, 5000);
      espiner?.classList.remove("lds-spinner")

    }

  }
  conecion(x: {}) {
    Object.entries(x).forEach(([key, value]) => {
      var dato = value

      var key = key

      this.inf_u = false
      if (key === "user_name") {
        this.cookie.set("user_name", String(dato))
      }
      if (key === "nombre") {
        this.cookie.set("fullname", String(dato))
      }
      if (key === "foto") {
        this.cookie.set("foto", String(dato))
      }
      if (key === "permiso") {
        this.cookie.set("permiso", String(dato))
      }
      if (key === "usuario") {
        this.cookie.set("usuario", String(dato))
      }
      if (key === "contrasenia") {
        this.cookie.set("contrasenia", String(dato))
      }
      if (key === "tipo_unidad") {
        this.cookie.set("tipo_unidad", String(dato))
      }
      if (key === "unidad") {
        this.cookie.set("unidad", String(dato))
      }
      //permisos bases de datos 
      if (key === "per_select") {
        this.cookie.set("per_select", String(dato))
      }
      if (key === "per_view") {
        this.cookie.set("per_view", String(dato))
      }
      if (key === "per_insert") {
        this.cookie.set("per_insert", String(dato))
      }
      if (key === "per_update") {
        this.cookie.set("per_update", String(dato))
      }
      if (key === "per_delete") {
        this.cookie.set("per_delete", String(dato))
      }
      if (key === "datos") {
        this.cookie.set("datos", String(dato))
      }
      //permisos componentes 

      if (key === "resultados") {
        this.cookie.set("resultados", String(dato))
      }
      if (key === "per_eventos") {
        this.cookie.set("per_eventos", String(dato))
      }
      if (key === "per_usuarios") {
        this.cookie.set("per_usuarios", String(dato))
      }
            if (key === "cambio_contrasenia") {
        this.cookie.set("cambio_contrasenia", String(dato))
      }
      if (key === "afectaciones_fuera_combate") {
        this.cookie.set("afectaciones_fuera_combate", String(dato))
      }
      //token 
      if (key === "access_token") {
        this.cookie.set("access_token", String(dato))
      }
      if (key === "token_type") {
        this.cookie.set("token_type", String(dato))
      }
      if (key === "dependencia") {
        this.cookie.set("dependencia", String(dato))
      }

      //permisos internos

      if (key === "boletin_coe") {
        this.cookie.set("boletin_coe", String(dato))
      }

      if (key === "boletin_cuadros_coe") {
        this.cookie.set("boletin_cuadros_coe", String(dato))
      }
      if (key === "alerta") {
        this.cookie.set("alerta", String(dato))
      }
      if (key === "personal") {
        this.cookie.set("personal", String(dato))
      }

      if (key === "movimientos") {
        this.cookie.set("movimientos", String(dato))
      }
      if (key === "inventarios") {
        this.cookie.set("inventarios", String(dato))
      }

      if (key === "boletin_res_div") {
        this.cookie.set("boletin_res_div", String(dato))
      }
      if (key === "cartilla_presidencial_larga") {
        this.cookie.set("cartilla_presidencial_larga", String(dato))
      }
      if (key === "cartilla_presidencial_corta") {
        this.cookie.set("cartilla_presidencial_corta", String(dato))
      }
      if (key === "boletin_diseo") {
        this.cookie.set("boletin_diseo", String(dato))
      }
      if (key === "boletin_diseo_semanal") {
        this.cookie.set("boletin_diseo_semanal", String(dato))
      }
      if (key === "comando_general") {
        this.cookie.set("comando_general", String(dato))
      }
      if (key === "Estadistica_resultados") {
        this.cookie.set("Estadistica_resultados", String(dato))
      }
      if (key === "com_resultados_reducido") {
        this.cookie.set("com_resultados_reducido", String(dato))
      }
      if (key === "narcotrafico") {
        this.cookie.set("narcotrafico", String(dato))
      }
      if (key === "artemisa") {
        this.cookie.set("artemisa", String(dato))
      }
      if (key === "narcotrafico_metas_per") {
        this.cookie.set("narcotrafico_metas_per", String(dato))
      }
      if (key === "docna_semanal_per") {
        this.cookie.set("docna_semanal_per", String(dato))
      }
      if (key === "resaltantes_boletin_per") {
        this.cookie.set("resaltantes_boletin_per", String(dato))
      }
      if (key === "artemisa_comparativo") {
        this.cookie.set("artemisa_comparativo", String(dato))
      }
      if (key === "contrabando") {
        this.cookie.set("contrabando", String(dato))
      }
      if (key === "contrabando_comparativo") {
        this.cookie.set("contrabando_comparativo", String(dato))
      }
      if (key === "mineria") {
        this.cookie.set("mineria", String(dato))
      }
      if (key === "mineria_comparativo") {
        this.cookie.set("mineria_comparativo", String(dato))
      }
      if (key === "comparativo_enemigo") {
        this.cookie.set("comparativo_enemigo", String(dato))
      }
      if (key === "comparativo_mapa") {
        this.cookie.set("comparativo_mapa", String(dato))
      }
      if (key === "comparativo_resultados") {
        this.cookie.set("comparativo_resultados", String(dato))
      }
      if (key === "afectacion_a_la_amenaza") {
        this.cookie.set("afectacion_a_la_amenaza", String(dato))
      }
      if (key === "afectacion_comparativa_p_t") {
        this.cookie.set("afectacion_comparativa_p_t", String(dato))
      }
      if (key === "lis_afectaciones") {
        this.cookie.set("lis_afectaciones", String(dato))
      }
      if (key === "afectaciones_mapa") {
        this.cookie.set("afectaciones_mapa", String(dato))
      }
      if (key === "afectaciones_cuadros") {
        this.cookie.set("afectaciones_cuadros", String(dato))
      }
      if (key === "regiones") {
        this.cookie.set("regiones", String(dato))
      }
      if (key === "resaltantes") {
        this.cookie.set("resaltantes", String(dato))
      }
      if (key === "reslatantes_divisiones") {
        this.cookie.set("reslatantes_divisiones", String(dato))
      }
      if (key === "bullets") {
        this.cookie.set("bullets", String(dato))
      }
      if (key === "boltin_dirop") {
        this.cookie.set("boltin_dirop", String(dato))
      }
      if (key === "boletin_mapa_comparativa") {
        this.cookie.set("boletin_mapa_comparativa", String(dato))
      }
      if (key === "excel_ut_per") {
        this.cookie.set("excel_ut_per", String(dato))
      }
      if (key === "excel_amenaza_per") {
        this.cookie.set("excel_amenaza_per", String(dato))
      }
      if (key === "resaltantes_mapa_per") {
        this.cookie.set("resaltantes_mapa_per", String(dato))
      }
      if (key === "resultados_excel_tipo_operaciones_per") {
        this.cookie.set("resultados_excel_tipo_operaciones_per", String(dato))
      }
      if (key === "archivo_spoa_per") {
        this.cookie.set("archivo_spoa_per", String(dato))
      }
      if (key === "mapa_division_dinamico_per") {
        this.cookie.set("mapa_division_dinamico_per", String(dato))
      }

      if (key === "aetcr_permiso") {
        this.cookie.set("aetcr_permiso", String(dato))
      }
      if (key === "ingreso_aetcr_permiso") {
        this.cookie.set("ingreso_aetcr_permiso", String(dato))
      }
      if (key === "listado_aetcr_permiso") {
        this.cookie.set("listado_aetcr_permiso", String(dato))
      }
      if (key === "alerta_aetcr_permiso") {
        this.cookie.set("alerta_aetcr_permiso", String(dato))
      }
      if (key === "plazos_permiso") {
        this.cookie.set("plazos_permiso", String(dato))
      }
      if (key === "asignacion_plazo") {
        this.cookie.set("asignacion_plazo", String(dato))
      }
      if (key === "reasignacion_plazo") {
        this.cookie.set("reasignacion_plazo", String(dato))
      }
      if (key === "validacion_plaz") {
        this.cookie.set("validacion_plaz", String(dato))
      }
      if (key === "creacion_plazo") {
        this.cookie.set("creacion_plazo", String(dato))
      }
      if (key === "cumplimiento_plazo") {
        this.cookie.set("cumplimiento_plazo", String(dato))
      }
      if (key === "seguimineto_plazos_respueta_per") {
        this.cookie.set("seguimineto_plazos_respueta_per", String(dato))
      }

      if (key === "medallas_permiso") {
        this.cookie.set("medallas_permiso", String(dato))
      }
      if (key === "excel_anios_permiso") {
        this.cookie.set("excel_anios_permiso", String(dato))
      }
      //permisos del insitop
      if (key === "insitop_per_per") {
        this.cookie.set("insitop_per_per", String(dato))
      }
      if (key === "cargue_insitop_per") {
        this.cookie.set("cargue_insitop_per", String(dato))
      }
      if (key === "estadistica_insitop_per") {
        this.cookie.set("estadistica_insitop_per", String(dato))
      }
      if (key === "dicte_per") {
        this.cookie.set("dicte_per", String(dato))
      }
      if (key === "dicte_pasos_fronterizos_per") {
        this.cookie.set("dicte_pasos_fronterizos_per", String(dato))
      }
      if (key === "com_div_mapa_per") {
        this.cookie.set("com_div_mapa_per", String(dato))
      }
      if (key === "comp_div_mapa_bal_per") {
        this.cookie.set("comp_div_mapa_bal_per", String(dato))
      }
      if (key === "eventos_relevantes_per") {
        this.cookie.set("eventos_relevantes_per", String(dato))
      }
      if (key === "configuracion_especial_res_per") {
        this.cookie.set("configuracion_especial_res_per", String(dato))
      }
      if (key === "res_linea_obj_4_per") {
        this.cookie.set("res_linea_obj_4_per", String(dato))
      }
      if (key === "linea_estrategica_narcotrafico_per") {
        this.cookie.set("linea_estrategica_narcotrafico_per", String(dato))
      }
      if (key === "ayuda_comparativa_consejos_per") {
        this.cookie.set("ayuda_comparativa_consejos_per", String(dato))
      }
      if (key === "registro_Q5_per") {
        this.cookie.set("registro_Q5_per", String(dato))
      }
      if (key === "obj_1_per") {
        this.cookie.set("obj_1_per", String(dato))
      }
      if (key === "obj_2_per") {
        this.cookie.set("obj_2_per", String(dato))
      }
      if (key === "obj_3_per") {
        this.cookie.set("obj_3_per", String(dato))
      }
      if (key === "obj_4_per") {
        this.cookie.set("obj_4_per", String(dato))
      }

      if (key === "archivo_plano_excel_per") {
        this.cookie.set("archivo_plano_excel_per", String(dato))
      }
      if (key === "res_lineas_estrategicas_per") {
        this.cookie.set("res_lineas_estrategicas_per", String(dato))
      }

      if (key === "porcentaje_luna") {
        sessionStorage.removeItem("porcentaje_luna")
        sessionStorage.setItem("porcentaje_luna", JSON.stringify(dato))
      }
      if (key === "fultimo_registro") {
        sessionStorage.removeItem("fultimo_registro")
        sessionStorage.setItem("fultimo_registro", JSON.stringify(dato))
      }
      

      sessionStorage.setItem("ocultar_menu", JSON.stringify("menu_2"))

      if (key === "unidades") {
        sessionStorage.setItem("unidades", JSON.stringify(dato))
      }
      if (key === "enemigo") {
        sessionStorage.setItem("enemigo", JSON.stringify(dato))
      }
      if (key === "op_mayor") {
        sessionStorage.setItem("op_mayor", JSON.stringify(dato))
      }
      if (key === "eventos") {
        sessionStorage.setItem("eventos", JSON.stringify(dato))
      }
      if (key === "coordinadores") {
        sessionStorage.setItem("coordinadores", JSON.stringify(dato))
      }
      if (key === "alertas") {
        sessionStorage.setItem("alertas", JSON.stringify(dato))
      }
      if (key === "estrategia") {
        sessionStorage.setItem("estrategia", JSON.stringify(dato))
      }
      if (key === "tipo_operacion") {
        sessionStorage.setItem("tipo_operacion", JSON.stringify(dato))
      }
      if (key === "hechos") {
        sessionStorage.setItem("hechos", JSON.stringify(dato))
      }
      if (key === "acam_enemigo") {
        sessionStorage.setItem("acam_enemigo", JSON.stringify(dato))
      }
      if (key === "acam_estructura") {
        sessionStorage.setItem("acam_estructura", JSON.stringify(dato))
      }
      if (key === "ene_estructura") {
        sessionStorage.setItem("ene_estructura", JSON.stringify(dato))
      }

      if (key === "usuarios") {
        sessionStorage.setItem("usuarios", JSON.stringify(dato))
      }
      if (key === "listado_personal") {
        sessionStorage.setItem("listado_personal", JSON.stringify(dato))
      }
      if (key === "listado_inventarios") {
        sessionStorage.setItem("listado_inventarios", JSON.stringify(dato))
      }
      this.router.navigate(["cuerpo"])
      var espiner = document.getElementById("espiner")
      espiner?.classList.remove("lds-spinner")
      this.cronometro.variables()
    });

  }

  // async LoguinComponent(datos: {}) {
  //   return fetch(this.api_serve.url, {
  //     method: 'POST',
  //     body: JSON.stringify({ datos }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => this.conecion(json));
  // }


  aceptarReserva(){

    this.mostrarReserva = false;
    
    this.mostrarLogin = true;
    
    }
    
  ngOnInit(): void {
    this.mostrarReserva = true;
  }
  // === drag and drop ===

  iniciarMovimiento(event: MouseEvent) {
    this.isDragging = true;
    const rect = this.loginBox.nativeElement.getBoundingClientRect();
    this.offset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  @HostListener('document:mousemove', ['$event'])
  mover(event: MouseEvent) {
    if (this.isDragging && this.loginBox) {
      const x = event.clientX - this.offset.x;
      const y = event.clientY - this.offset.y;
      this.loginBox.nativeElement.style.left = `${x}px`;
      this.loginBox.nativeElement.style.top = `${y}px`;
      this.loginBox.nativeElement.style.transform = `none`;
    }
  }

  @HostListener('document:mouseup')
  detenerMovimiento() {
    this.isDragging = false;
  }

}
