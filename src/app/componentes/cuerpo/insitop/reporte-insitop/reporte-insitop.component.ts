import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
interface DepartamentoConMunicipios {
  nombre: string;
  municipios: string[];
}
@Component({
  selector: 'app-reporte-insitop',
  templateUrl: './reporte-insitop.component.html',
  styleUrls: ['./reporte-insitop.component.css']
})
export class ReporteInsitopComponent {
  constructor(private selector: SelectoresService, private api_serve: ServiceConecionService, private cookie: CookieService, private router: Router, private menu_service: SelectoresService) { }
departamentos: DepartamentoConMunicipios[] = [];
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

  nombre: string = ""
  link: string = ""

  validacion: boolean = false

  formData = new FormData()

  aler_p_i: boolean = false
  aler_p_f: boolean = false
  aler_u_i: boolean = false
  aler_u_f: boolean = false
  alerta: string = ""
  fecha_insitop: string = ""
  oculto: boolean = false

  departamentos_filtrados = this.selector.departamentos_unicos()
  departamentos_filtrado: string[] = []
  unidad_selecionada_municipios: string[] = []
  aler_p_datos: boolean = false
  datos_municipios: string[] = []
  divisiones_filtrar: string[] = ["DIV01", "DIV02", "DIV03", "DIV04", "DIV05", "DIV06", "DIV07", "DIV08", "FUTOM", "DAVAA", "CAAID", "CAOCC", "TREJC"]

  divisiones_filtrados: string[] = []

  unidad_selecionada_batallones: string[] = ["Descanso", "Entrenamiento", "Novedades", "Operaciones"]
  subregionSeleccionada: any = null;
  subregiones: any[] = [];
  ventana_activa: 'divisiones' | 'departamentos' | 'municipios' | null = null;
  ngOnInit(): void {

    this.actualizarListaSubregiones();
    this.api_serve.getDepartamentosConMunicipios().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (err) => {
        console.error('Error cargando departamentos:', err);
      }
    });
  }
  mostrar_divisiones() {
    this.ventana_activa = 'divisiones';
  }

  mostrar_dpto() {
    this.ventana_activa = 'departamentos';
  }

  mostrar_mpio() {
    this.ventana_activa = 'municipios';
  }

  cerrar_ventana() {
    this.ventana_activa = null;
  }


  unidad_selecionados(item: string, i: number) {
    const municipios = item
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(i + item)

    this.aler_p_datos = true
    console.log(item)


    if (!this.divisiones_filtrados.includes(item)) {
      this.divisiones_filtrados.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.divisiones_filtrados.indexOf(item); // obtenemos el indice
      this.divisiones_filtrados = this.divisiones_filtrados.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    console.log(this.divisiones_filtrados)

  }
  municipios_selecionados(item: string, i: number) {
    const municipios = item
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(i + item)

    this.aler_p_datos = true
    console.log(item)


    if (!this.datos_municipios.includes(item)) {
      this.datos_municipios.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.datos_municipios.indexOf(item); // obtenemos el indice
      this.datos_municipios = this.datos_municipios.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    console.log(this.datos_municipios)

  }
  departamentos_selecionar(evaluar: number, respuesta: number, item: string) {

    const departamento = item
    // let nuevoTexto = municipios.split(",").join( 'hello!')
    var che_1 = document.getElementById(item)

    this.aler_p_datos = true
    this.unidad_selecionada_municipios = []

    if (!this.departamentos_filtrado.includes(item)) {
      this.departamentos_filtrado.push(item)
      che_1?.classList.toggle("che_1")
    } else {
      var indice = this.departamentos_filtrado.indexOf(item); // obtenemos el indice
      this.departamentos_filtrado = this.departamentos_filtrado.filter(function (i) { return i !== item }); // filtramos

      che_1?.classList.toggle("che_1")
    }

    for (let x in this.departamentos_filtrado) {
      var unidad_selecionada_municipios = this.selector.unidades_filtradas(this.departamentos_filtrado[x], evaluar, respuesta)
      for (let y in unidad_selecionada_municipios) {
        this.unidad_selecionada_municipios.push(unidad_selecionada_municipios[y])

      }

    }

    this.aler_p_datos = true

    for (let i in this.datos_municipios) {
      this.datos_municipios.splice(parseInt(i))
    }
    this.unidad_selecionada_municipios.sort()
  }
  
validar_informacion(infor: string, nombre: string) {
  const elemento = document.getElementById(nombre) as HTMLElement | null;

  if (!elemento) {
    console.warn(`Elemento con id "${nombre}" no encontrado en el DOM`);
    return; // O maneja el error de forma adecuada
  }

  if (!infor || infor === "" || infor === "---") {
    elemento.style.cssText = "background-color: darkred; color: white;";
    this.valicaion_array.push("false");
  } else {
    elemento.style.cssText = "background-color: darkgreen; color: white;";
    this.formData.append(nombre, infor);
    this.valicaion_array.push("true");
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
  ocultar() {
    this.oculto = true
  }
  grafico_estado_m(form: NgForm) {
    this.fecha_insitop = form.value.fecha_insitop_estado

    sessionStorage.removeItem("fecha_insitop")

    sessionStorage.setItem("fecha_insitop", JSON.stringify(this.fecha_insitop))


    this.router.navigate(['/GraficasInsitopEstadoMayorComponent'])

  }

  pelotones_uni_rep(form: NgForm) {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.formData.append("subregion", JSON.stringify(this.subregionSeleccionada!));


    const fecha_insitop = form.value.fecha_insitop

    const CODE = form.value.CODE
    this.formData.append("CODE", CODE);

    this.departamentos_filtrado.sort()
    this.formData.append("dpto", String(this.departamentos_filtrado));
    this.datos_municipios.sort()
    this.formData.append("mpio", String(this.datos_municipios));

    this.divisiones_filtrados.sort()
    this.formData.append("divisiones_filtrados", String(this.divisiones_filtrados));

    this.validDates(fecha_insitop, "fecha_insitop")
    this.validar_informacion(fecha_insitop, "fecha_insitop")


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
      // console.log(this.formData)



      this.api_serve.reporte_insitop_pelotones(this.formData).subscribe({
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
            if (key === "error") {
              this.link = String(dato);
              // this.inf_c_g = String(result)
              var espiner = document.getElementById("espiner")
              espiner?.classList.remove("lds-spinner")

            }
            ""


          });
          const a_href = document.createElement('a')

          a_href.href = this.link
          a_href.download = this.nombre
          //  console.log("http://172.22.2.36:5198" +this.link)


          a_href.click()

          this.inf_g = true
          this.inf_a = false
          // this.inf_c_g = String(result)
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
          //this.filtrar_2()

        },
        error: (err: HttpErrorResponse) => {

          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")
        }
      })

    }
  }

  cantidad_cdte_unidades(form: NgForm) {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.formData.append("subregion", JSON.stringify(this.subregionSeleccionada!));


    const fecha_insitop = form.value.fecha_insitop

    const CODE = form.value.CODE
    this.formData.append("CODE", CODE);

    this.departamentos_filtrado.sort()
    this.formData.append("dpto", String(this.departamentos_filtrado));
    this.datos_municipios.sort()
    this.formData.append("mpio", String(this.datos_municipios));

    this.divisiones_filtrados.sort()
    this.formData.append("divisiones_filtrados", String(this.divisiones_filtrados));

    this.validDates(fecha_insitop, "fecha_insitop")
    this.validar_informacion(fecha_insitop, "fecha_insitop")


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
      // console.log(this.formData)

      this.api_serve.caqntidad_cdte_calculo_unidades(this.formData).subscribe({
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
            if (key === "error") {
              this.link = String(dato);
              // this.inf_c_g = String(result)
              var espiner = document.getElementById("espiner")
              espiner?.classList.remove("lds-spinner")

            }
            ""


          });
          const a_href = document.createElement('a')

          a_href.href = this.link
          a_href.download = this.nombre
          //  console.log("http://172.22.2.36:5198" +this.link)


          a_href.click()

          this.inf_g = true
          this.inf_a = false
          // this.inf_c_g = String(result)
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
          //this.filtrar_2()

        },
        error: (err: HttpErrorResponse) => {

          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")
        }
      })

    }
  }
  reporte_boletin(form: NgForm) {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.formData.append("subregion", JSON.stringify(this.subregionSeleccionada!));


    const fecha_insitop = form.value.fecha_insitop

    const CODE = form.value.CODE
    this.formData.append("CODE", CODE);

    this.departamentos_filtrado.sort()
    this.formData.append("dpto", String(this.departamentos_filtrado));
    this.datos_municipios.sort()
    this.formData.append("mpio", String(this.datos_municipios));

    this.divisiones_filtrados.sort()
    this.formData.append("divisiones_filtrados", String(this.divisiones_filtrados));

    this.validDates(fecha_insitop, "fecha_insitop")
    this.validar_informacion(fecha_insitop, "fecha_insitop")

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
      // console.log(this.formData)


      this.api_serve.reporte_insitop_f(this.formData).subscribe({
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
            if (key === "error") {
              this.link = String(dato);
              // this.inf_c_g = String(result)
              var espiner = document.getElementById("espiner")
              espiner?.classList.remove("lds-spinner")

            }
            ""


          });
          const a_href = document.createElement('a')

          a_href.href = this.link
          a_href.download = this.nombre
          //  console.log("http://172.22.2.36:5198" +this.link)


          a_href.click()

          this.inf_g = true
          this.inf_a = false
          // this.inf_c_g = String(result)
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
          //this.filtrar_2()

        },
        error: (err: HttpErrorResponse) => {

          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")
        }
      })

    }
  }
  pelotones_divisiones(form: NgForm) {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.formData.append("subregion", JSON.stringify(this.subregionSeleccionada!));


    const fecha_insitop = form.value.fecha_insitop

    const CODE = form.value.CODE
    this.formData.append("CODE", CODE);

    this.departamentos_filtrado.sort()
    this.formData.append("dpto", String(this.departamentos_filtrado));
    this.datos_municipios.sort()
    this.formData.append("mpio", String(this.datos_municipios));

    this.divisiones_filtrados.sort()
    this.formData.append("divisiones_filtrados", String(this.divisiones_filtrados));

    this.validDates(fecha_insitop, "fecha_insitop")
    this.validar_informacion(fecha_insitop, "fecha_insitop")

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
      // console.log(this.formData)

      this.api_serve.reporte_insitop_pelotones_divisiones(this.formData).subscribe({
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
            if (key === "error") {
              this.link = String(dato);
              // this.inf_c_g = String(result)
              var espiner = document.getElementById("espiner")
              espiner?.classList.remove("lds-spinner")

            }
            ""


          });
          const a_href = document.createElement('a')

          a_href.href = this.link
          a_href.download = this.nombre
          //  console.log("http://172.22.2.36:5198" +this.link)


          a_href.click()

          this.inf_g = true
          this.inf_a = false
          // this.inf_c_g = String(result)
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")
          //this.filtrar_2()

        },
        error: (err: HttpErrorResponse) => {

          this.inf_a = true
          this.inf_g = false
          this.inf_c_g = String("error de conexion")
        }
      })

    }
  }

  actualizarListaSubregiones() {
    this.api_serve.obtenerSubregiones().subscribe({
      next: data => {
        this.subregiones = data;
        console.log("🔁 Lista actualizada");
      },
      error: err => console.error("Error al cargar subregiones", err)
    });
  }
  ventanaVisible = false;
  subregionDetalleVisible: string | null = null;

  // Aquí defines tus datos reales desde la API o backend


  subregionSeleccionEmergente: string | null = null; // Solo para ventana emergente

  subregionSeleccionadaId: string | null = null;


  toggleDetalleSubregion(id: string) {
    if (this.subregionDetalleVisible === id) {
      this.subregionDetalleVisible = null;
    } else {
      this.subregionDetalleVisible = id;
    }
  }
  contarMunicipios(subregion: any): number {
    return subregion.departamentos.reduce((acc: number, dep: any) => acc + dep.municipios.length, 0);
  }
  abrirVentanaSubregiones() {
    this.ventanaVisible = true;
    this.subregionSeleccionEmergente = null;
    this.subregionDetalleVisible = null;
  }


  subregionSeleccionadaNombre: string | null = null;



  confirmarSeleccion() {
    const sub = this.subregiones.find(s => s.id === this.subregionSeleccionadaId);
    if (!sub) {
      alert("Debe seleccionar una subregión");
      return;
    }
    this.subregionSeleccionadaNombre = sub.nombre;
    this.subregionSeleccionadaId = sub.id;
    this.subregionSeleccionada = sub
    this.ventanaVisible = false;
  }
  limpiarSubregion() {
    this.subregionSeleccionadaNombre = null;
    this.subregionSeleccionadaId = null;
    this.subregionSeleccionada = null;
  }


  quitarSeleccion() {
    this.subregionSeleccionEmergente = null;
    this.subregionDetalleVisible = null;

  }

}
