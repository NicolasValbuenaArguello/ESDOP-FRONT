import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-listado-medallas',
  templateUrl: './listado-medallas.component.html',
  styleUrls: ['./listado-medallas.component.css']
})
export class ListadoMedallasComponent {
  fecha_operacion: string;
  departamento: string;
  municipio: string;
  zona_operaciones: string;
  actor: string;
  resultado_operacional: string;
  tipo_operacion: string;
  fecha_mision: string;

  constructor(private usuarios: SelectoresService, private menu_service: SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService) {
    this.listado_asignados()
  }
  grd_recibe = this.menu_service.gr_cdte
  arma = this.menu_service.arma
  personal_listado_medallas: string[] = []
  personal_listado_medallas_final: String[] = []

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  formData = new FormData();
  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  proyectos_listado: string[] = []
  proyectos_listado_final: String[] = []


  nombre: string = ""
  link: string = ""
  valicaion_array: string[] = []
  unidades_label: string[] = []
  filtro_division: string[] = []
  filtro_medallas: string[] = []
  filtro_tipo: string[] = []
  control: string[] = []
  medalla_label: string[] = []
  estado_medalla_label: string[] = []
  validacion: boolean = false
  tipo_dedallas_mostrar: boolean = false

  nombre_persona: string = ""
  nombre_persona_2: string = ""
  tipo_nombre_persona: string = ""
  cc_nombre_persona: string = ""
  grd_persona: string = ""
  arma_persona: string = ""



  img: string = "../../../../../assets/medallas/JEMOP-DIROP.png"
  id: string = ""

  entrega_difab: string = ""
  estado_medalla: string = ""


  resolucion: string = ""
  decreto: string = ""
  fecha_resolucion: string = ""
  observaciones: string = ""
  tipo_medalla: string = ""

  // Información de operación
nombre_operacion: string = '';



iniciarMovimiento(event: MouseEvent, id: string) {
  const modal = document.getElementById(id);
  if (!modal) return;

  let offsetX = event.clientX - modal.offsetLeft;
  let offsetY = event.clientY - modal.offsetTop;

  const mover = (e: MouseEvent) => {
    modal.style.left = e.clientX - offsetX + 'px';
    modal.style.top = e.clientY - offsetY + 'px';
  };

  const detener = () => {
    document.removeEventListener('mousemove', mover);
    document.removeEventListener('mouseup', detener);
  };

  document.addEventListener('mousemove', mover);
  document.addEventListener('mouseup', detener);
}

cerrarVentana(id: string) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('visible');
}

abrirVentana(id: string) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('visible');
}

  ngOnInit(): void {

    this.personal_listado_medallas_final = this.usuarios.array_listados(this.personal_listado_medallas)
    this.proyectos_listado_final = this.usuarios.array_listados(this.proyectos_listado)
    console.log(this.personal_listado_medallas_final)

    this.listado_asignados()


  }
  divisiones_filtrar(item: string, i: number) {
    const brigada = item
    var che_2 = document.getElementById(i + item)


    // this.unidad_selecionada_brigadas_filtradas=[]
    this.personal_listado_medallas = []

    if (!this.filtro_division.includes(item)) {
      this.filtro_division.push(item)
      che_2?.classList.toggle("che_1")

    } else {
      var indice = this.filtro_division.indexOf(item); // obtenemos el indice
      this.filtro_division = this.filtro_division.filter(function (i) { return i !== item }); // filtramos

      che_2?.classList.toggle("che_1")

    }

    for (let x in this.filtro_division) {

      for (let i in this.control) {

        if (this.filtro_division[x][0] == this.control[i][9]) {

          this.personal_listado_medallas.push(this.control[i])
        }

      }

    }



  }
  divisiones_filtrar_medallas(item: string, i: number) {
    const brigada = item
    var che_2 = document.getElementById(i + item)


    // this.unidad_selecionada_brigadas_filtradas=[]
    this.personal_listado_medallas = []

    if (!this.filtro_medallas.includes(item)) {
      this.filtro_medallas.push(item)
      che_2?.classList.toggle("che_1")

    } else {
      var indice = this.filtro_medallas.indexOf(item); // obtenemos el indice
      this.filtro_medallas = this.filtro_medallas.filter(function (i) { return i !== item }); // filtramos

      che_2?.classList.toggle("che_1")

    }

    for (let x in this.filtro_medallas) {

      for (let i in this.control) {

        if (this.filtro_medallas[x][0] == this.control[i][2]) {

          this.personal_listado_medallas.push(this.control[i])
        }

      }

    }



  }
  divisiones_filtrar_tipo(item: string, i: number) {
    const brigada = item
    var che_2 = document.getElementById(i + item)


    // this.unidad_selecionada_brigadas_filtradas=[]
    this.personal_listado_medallas = []

    if (!this.filtro_tipo.includes(item)) {
      this.filtro_tipo.push(item)
      che_2?.classList.toggle("che_1")

    } else {
      var indice = this.filtro_tipo.indexOf(item); // obtenemos el indice
      this.filtro_tipo = this.filtro_tipo.filter(function (i) { return i !== item }); // filtramos

      che_2?.classList.toggle("che_1")

    }

    for (let x in this.filtro_tipo) {

      for (let i in this.control) {

        if (this.filtro_tipo[x][0] == this.control[i][25]) {

          this.personal_listado_medallas.push(this.control[i])
        }

      }

    }



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
  mostrar_informacion() {

    var opciones_proyecto = document.getElementById("opciones_proyecto")
    var eliminar = document.getElementById("eliminar")
    var opciones_editar = document.getElementById("opciones_editar")

    opciones_proyecto?.classList.remove("oculto_2")
    eliminar?.classList.remove("oculto_2")
    opciones_editar?.classList.remove("oculto_2")

    eliminar?.classList.add("oculto_2")
    opciones_editar?.classList.add("oculto_2")



  }
  mostrar_editar() {

    var opciones_proyecto = document.getElementById("opciones_proyecto")
    var eliminar = document.getElementById("eliminar")
    var opciones_editar = document.getElementById("opciones_editar")

    opciones_proyecto?.classList.remove("oculto_2")
    opciones_editar?.classList.remove("oculto_2")
    eliminar?.classList.remove("oculto_2")

    opciones_proyecto?.classList.add("oculto_2")
    eliminar?.classList.add("oculto_2")


  }
  mostrar_eliminar() {

    var opciones_proyecto = document.getElementById("opciones_proyecto")
    var eliminar = document.getElementById("eliminar")
    var opciones_editar = document.getElementById("opciones_editar")

    opciones_proyecto?.classList.remove("oculto_2")
    eliminar?.classList.remove("oculto_2")
    opciones_editar?.classList.remove("oculto_2")

    opciones_proyecto?.classList.add("oculto_2")
    opciones_editar?.classList.add("oculto_2")


  }

mostrar_proyecto_menu(i: number) {
  const proyecto = document.getElementById("proyecto_ingreso_2");
  proyecto?.classList.toggle("oculto_2");

  const opciones_proyecto = document.getElementById("opciones_proyecto");
  const eliminar = document.getElementById("eliminar");

  opciones_proyecto?.classList.remove("oculto_2");
  eliminar?.classList.remove("oculto_2");

  opciones_proyecto?.classList.add("oculto_2");
  eliminar?.classList.add("oculto_2");

  const data = this.personal_listado_medallas[i];

  this.id  = data[0];
  this.tipo_medalla = data[2];         // Tipo medalla
  this.nombre_persona = `${data[13]}`; // Grado + Nombre
  this.cc_nombre_persona = data[12];
  this.grd_persona = data[10];
  this.arma_persona = data[11];
  this.nombre_persona_2 = data[13];
  this.entrega_difab = data[24];
  this.estado_medalla = data[25];
  this.resolucion = data[26];
  this.decreto = data[27];
  this.fecha_resolucion = data[28];
  this.observaciones = data[32];
  this.fecha_operacion = data[3];
  this.departamento = data[19];
  this.municipio = data[20];
  this.zona_operaciones = data[21];
  this.actor = data[22];
  this.resultado_operacional = data[23];
  this.nombre_operacion = data[15];
  this.tipo_operacion = data[16];
  this.fecha_mision = data[17];

  switch (this.tipo_medalla) {
    case "MEDALLA DESEMPEÑO OPERACIONAL":
      this.img = "../../../../../assets/medallas/ORDEN_PUBLICO.png";
      break;
    case "MEDALLA AL VALOR":
      this.img = "../../../../../assets/medallas/AL_VALOR.png";
      break;
    case "MEDALLA HERIDOS EN ACCIÓN":
      this.img = "../../../../../assets/medallas/HERIDOS.png";
      break;
    case "MEDALLA A LA BANDERA DE GUERRA":
      this.img = "../../../../../assets/medallas/colombia.png";
      break;
    default:
      this.img = "../../../../../assets/medallas/JEMOP-DIROP.png";
      break;
  }
}

  mostrar_proyecto_menu_2() {
    var proyecto = document.getElementById("proyecto_ingreso_2")
    proyecto?.classList.toggle("oculto_2")

    var oculto_documentos = document.getElementById("oculto_documentos")
    var oculto_documentos_modificar = document.getElementById("oculto_documentos_modificar")

    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
    // modulo para la informadcino cargada de la medalla 
  }

  mostrar_menu(identificador: number) {
    var oculto_documentos = document.getElementById("oculto_documentos")
    var oculto_documentos_modificar = document.getElementById("oculto_documentos_modificar")
    var oculto_documentos_filtrar = document.getElementById("oculto_documentos_filtrar")
    var oculto_documentos_filtrar_medallas = document.getElementById("oculto_documentos_filtrar_medallas")
    var oculto_documentos_filtrar_estado = document.getElementById("oculto_documentos_filtrar_estado")
    var oculto_documentos_modificar_estado_medalla = document.getElementById("oculto_documentos_modificar_estado_medalla")

    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")
    oculto_documentos_filtrar?.classList.remove("oculto_documentos_filtrar")
    oculto_documentos_filtrar_medallas?.classList.remove("oculto_documentos_filtrar_medallas")
    oculto_documentos_filtrar_estado?.classList.remove("oculto_documentos_filtrar_estado")
    oculto_documentos_modificar_estado_medalla?.classList.remove("oculto_documentos_modificar_estado_medalla")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
    oculto_documentos_filtrar?.classList.add("oculto_documentos_filtrar")
    oculto_documentos_filtrar_medallas?.classList.add("oculto_documentos_filtrar_medallas")
    oculto_documentos_filtrar_estado?.classList.add("oculto_documentos_filtrar_estado")
    oculto_documentos_modificar_estado_medalla?.classList.add("oculto_documentos_modificar_estado_medalla")
    

    if (identificador == 1) {
      oculto_documentos?.classList.toggle("oculto_documentos")
    }
    if (identificador == 2) {
      oculto_documentos_modificar?.classList.toggle("oculto_documentos_modificar")
    }
    if (identificador == 3) {
      oculto_documentos_filtrar?.classList.toggle("oculto_documentos_filtrar")
    }
    if (identificador == 4) {
      oculto_documentos_filtrar_medallas?.classList.toggle("oculto_documentos_filtrar_medallas")
    }
    if (identificador == 5) {
      oculto_documentos_filtrar_estado?.classList.remove("oculto_documentos_filtrar_estado")
      
    }
    if (identificador == 6) {
      oculto_documentos_modificar_estado_medalla?.classList.toggle("oculto_documentos_modificar_estado_medalla")
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
  listado_asignados() {

    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")
    //plazos

    this.api_serve.listado_medallas(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        //console.log(result)
        const asignaciones: { [key: string]: string } = {
  listado_medallas: 'personal_listado_medallas',
  proyectos: 'proyectos_listado',
  unidades_label: 'unidades_label',
  medalla_label: 'medalla_label',
  estado_medalla_label: 'estado_medalla_label'
};
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key

          if (key === "listado_medallas") {
            sessionStorage.removeItem("listado_medallas")
            sessionStorage.setItem("listado_medallas", JSON.stringify(dato))
            this.personal_listado_medallas = JSON.parse(sessionStorage.getItem("listado_medallas")!)
            this.control = JSON.parse(sessionStorage.getItem("listado_medallas")!)

          }

          if (key === "proyectos") {
            sessionStorage.removeItem("proyectos")
            sessionStorage.setItem("proyectos", JSON.stringify(dato))
            this.proyectos_listado = JSON.parse(sessionStorage.getItem("proyectos")!)
          }

          if (key === "unidades_label") {
            sessionStorage.removeItem("unidades_label")
            sessionStorage.setItem("unidades_label", JSON.stringify(dato))
            this.unidades_label = JSON.parse(sessionStorage.getItem("unidades_label")!)
          }
          if (key === "medalla_label") {
            sessionStorage.removeItem("medalla_label")
            sessionStorage.setItem("medalla_label", JSON.stringify(dato))
            this.medalla_label = JSON.parse(sessionStorage.getItem("medalla_label")!)
          }
          if (key === "estado_medalla_label") {
            sessionStorage.removeItem("estado_medalla_label")
            sessionStorage.setItem("estado_medalla_label", JSON.stringify(dato))
            this.estado_medalla_label = JSON.parse(sessionStorage.getItem("estado_medalla_label")!)
          }
          //this.router.navigate(["/ver_informacon_personal"])



        });

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

  conceptos_medallas(form: NgForm) {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    const proyecto = form.value.proyecto
    const tipo = form.value.tipo
    const medalla = form.value.medalla

    this.validar_informacion(proyecto, "proyecto")
    this.validar_informacion(tipo, "tipo")

    this.validar_informacion(medalla, "medalla")


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

      this.api_serve.conceptos_medallas_descargar(this.formData).subscribe({
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

  eliminar_medalla() {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("id", this.id);

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    // console.log(this.formData)

    this.api_serve.eliminar_medalla(this.formData).subscribe({
      next: (result: HttpResponse<any>) => {
        // console.log(result)
        Object.entries(result).forEach(([key, value]) => {
          var dato = value
          var key = key



          // this.inf_c_g = String(result)
          var espiner = document.getElementById("espiner")
          espiner?.classList.remove("lds-spinner")




        });

        //  console.log("http://172.22.2.36:5198" +this.link)



        this.listado_asignados()
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

  proyecto_difab(form: NgForm) {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));


    const proyecto_difab = form.value.proyecto_difab
    const enrega_medalla_difab = form.value.enrega_medalla_difab

    this.validar_informacion(proyecto_difab, "proyecto_difab")
    this.validar_informacion(enrega_medalla_difab, "enrega_medalla_difab")


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

      //registro_difab_medalla_url  --  voy en este paso fata capturar la informacion y modificar la bd para las observaciones de  la difab
      this.api_serve.registro_informacion_difab(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key


          });

          //  console.log("http://172.22.2.36:5198" +this.link)

          this.mostrar_proyecto()
          this.listado_asignados()

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
  
  proyecto_estado(form: NgForm) {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));


    const proyecto_difab_estado = form.value.proyecto_difab_estado
    const proyecto_estado_medalla = form.value.proyecto_estado_medalla

    this.validar_informacion(proyecto_difab_estado, "proyecto_difab_estado")
    this.validar_informacion(proyecto_estado_medalla, "proyecto_estado_medalla")


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
      
      //registro_estado_proyecto_medalla_url

      //registro_difab_medalla_url  --  voy en este paso fata capturar la informacion y modificar la bd para las observaciones de  la difab
      this.api_serve.registro_informacion_estado_proecto(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key


          });

          //  console.log("http://172.22.2.36:5198" +this.link)

          this.mostrar_proyecto()
          this.listado_asignados()

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
    
  Editar_info(form: NgForm) {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    const grd_persona = form.value.grd_persona
    const arma_persona = form.value.arma_persona
    const cc_nombre_persona = form.value.cc_nombre_persona
    const nombre_persona_2 = form.value.nombre_persona_2
    const fecha_ingreso = form.value.fecha_ingreso
    const proyecto_estado_medalla = form.value.proyecto_estado_medalla
    const fecha_resolucion = form.value.fecha_resolucion
    const resolucion = form.value.resolucion
    const decreto = form.value.decreto
    const observaciones = form.value.observaciones

    this.formData.append("id", this.id);
    this.formData.append("grd_persona", grd_persona);
    this.formData.append("arma_persona", arma_persona);
    this.formData.append("cc_nombre_persona", cc_nombre_persona);
    this.formData.append("nombre_persona_2", nombre_persona_2);
    this.formData.append("fecha_ingreso", fecha_ingreso);
    this.formData.append("proyecto_estado_medalla", proyecto_estado_medalla);
    this.formData.append("fecha_resolucion", fecha_resolucion);
    this.formData.append("resolucion", resolucion);
    this.formData.append("decreto", decreto);
    this.formData.append("observaciones", observaciones);

    this.validacion = this.valicacion_array_funcion(this.valicaion_array)
    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

      this.api_serve.registro_informacion_editar_info(this.formData).subscribe({
        next: (result: HttpResponse<any>) => {
          // console.log(result)
          Object.entries(result).forEach(([key, value]) => {
            var dato = value
            var key = key


          });

          this.listado_asignados()
          this.mostrar_proyecto_menu_2()

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

  
  listado_informacion() {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    console.log(this.filtro_division)
    console.log(this.filtro_medallas)
    console.log(this.filtro_tipo)

    this.formData.append("filtro_division", String(this.filtro_division));
    this.formData.append("filtro_medallas", String(this.filtro_medallas));
    this.formData.append("filtro_tipo", String(this.filtro_tipo));

    
    //conceptos_medallas_descargar_url
      this.api_serve.cdescargar_bd_medallas(this.formData).subscribe({
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
