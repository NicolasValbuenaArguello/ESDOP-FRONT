import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';




@Component({
  selector: 'app-plazos-con-respuesta',
  templateUrl: './plazos-con-respuesta.component.html',
  styleUrls: ['./plazos-con-respuesta.component.css'],


})
export class PlazosConRespuestaComponent {
  reasignacion_plazo: boolean

  constructor(private usuarios: SelectoresService, private router: Router, private permisos: PermisosService, private cookie: CookieService, private api_serve: ServiceConecionService) {

    this.listado_asignados()
    this.contar()
    //this.per_update = this.validar_estado(this.cookie.get("per_update"))
    // *ngIf="per_update"
    //console.log(this.listado_aetcr)
    this.reasignacion_plazo = this.validar_estado(this.cookie.get("reasignacion_plazo"))

  }
  validar_estado(dato: string) {

    var dato_r = false

    if (dato === "1") {
      dato_r = true
    } else {
      dato_r = false
    }
    return dato_r

  }
  cantidad: number
  per_update: boolean
  id_aetcr: string

  plazos_asignados: string[] = []
  formData = new FormData();

  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false
  responsable: string = ""
  documentos_: string
  ducumento: string = "http://172.22.2.36:5198"
  doc_ver: string = ""
  orfeo: string = ""
  div1: string = ""
  div2: string = ""
  div3: string = ""
  div4: string = ""
  div5: string = ""
  div6: string = ""
  div7: string = ""
  div8: string = ""
  davaa: string = ""
  divfe: string = ""
  futco: string = ""
  devolver: string = ""
  ordenes: string = ""
  cargo: string = ""
  funcionario: string = ""
  op_inmedita: string = ""
  estrito_cumplimiento: string = ""

  para_su_control: string = ""
  autorizado: string = ""

  no_autorizado: string = ""
  lo_de_su_cargo: string = ""

  firma_coejc: string = ""
  firma_secej: string = ""
  firma_jemop: string = ""
  firma_dirop: string = ""
  resuelva_informe: string = ""
  seguimiento: string = ""
  estudie_recomiende: string = ""

  trate_conmigo: string = ""
  de_acuerdo_norma: string = ""
  asistir: string = ""
  archivar: string = ""
  agendar: string = ""
  difundir: string = ""
  remitir: string = ""
  id: string

  fecha_cumplimiento: string = ""
  respuesta: string = ""
  fecha_respuesta: string = ""
  resiacinacion = true
  resiacinacion_false = true


  lis_plasos_asignados: {} = JSON.parse(sessionStorage.getItem("plazos_asignados_pendientes")!)
  lis_usuarios: {} = JSON.parse(sessionStorage.getItem("listado_personal")!)
  plazos_asigandos_dirop_pendiente: any[] = []
  listado_usurios: String[] = []
  correo: string = ""
  ocultar_pla: boolean = false
  fecha_res: boolean = false
  valicaion_array: string[] = []
  validacion: boolean = false
  documento_reg: string = ""
  inf_r: boolean = false
  inf_c_r: string = "datos "
  fecha: string
  days: string
  listado_plazos: string[] = []
  cambio_valor_respuesta_pendiente: String[] = []
  valor: number
  expandir: boolean = true
  contrae: boolean = false

  unidades: string[] = []
  estado_plazos: string[] = ["Vencido", "Vence hoy", "Vence Mañana", "Con Tiempo"]
  estado_plazo_valor: string = ""
  actulizar_plazo_temp: String[]

  nombre: string = ""
  link: string = ""

  cumplio:string = ""
  observaciones:string=""
  soporte:string=""
  fecha_cumplimiento_plazo:string=""
ver(){
  var cumplir_plazos =  document.getElementById("cumplir_plazos")
  cumplir_plazos?.classList.toggle("cumplir_plazos")
}
  ngOnInit(): void {

    this.plazos_asigandos_dirop_pendiente = this.usuarios.array_listados(this.lis_plasos_asignados)
    this.listado_usurios = this.usuarios.array_listados(this.lis_usuarios)
    this.listado_asignados()
    this.contar()

  }
  filtrar_2() {

    var view_dumentos = document.getElementById("view_dumentos_s_3")
    view_dumentos?.classList.toggle("oculto_3")
  }
  filtrar() {

    var view_dumentos = document.getElementById("view_dumentos_s_2")
    view_dumentos?.classList.toggle("oculto_2")
  }
  filtrar_informacion(item: string) {
    var view_dumentos = document.getElementById("view_dumentos_s_2")
    view_dumentos?.classList.toggle("oculto_2")

    this.cantidad = 0
    this.cambio_valor_respuesta_pendiente = []
    for (let x in this.plazos_asigandos_dirop_pendiente) {

      if (this.plazos_asigandos_dirop_pendiente[x][3].includes(item)) {
        
        if (this.plazos_asigandos_dirop_pendiente[x][48] != "SI") {
          this.cantidad = this.cantidad + 1
        }
        

        this.fecha = this.plazos_asigandos_dirop_pendiente[x][38] + "T00:01:00"

        this.days = ""
        this.days = this.OnGetNewName(new Date(), new Date(this.fecha), "Falta ")
        if (this.days == "error") {
          this.days = ""
          this.days = this.OnGetNewName(new Date(this.fecha), new Date(), "Tiene Vencido ")
        }
        this.plazos_asigandos_dirop_pendiente[x].push(this.days)
        if (this.days.includes("Tiene Vencido")) {
          if (this.valor == 0) {
            this.plazos_asigandos_dirop_pendiente[x].push("naranja")
            this.plazos_asigandos_dirop_pendiente[x].push("image_naranja")
          } else {
            this.plazos_asigandos_dirop_pendiente[x].push("rojo")
            this.plazos_asigandos_dirop_pendiente[x].push("image_rojo")
          }

        }
        else {
          if (this.valor == 1) {
            this.plazos_asigandos_dirop_pendiente[x].push("amarillo")
            this.plazos_asigandos_dirop_pendiente[x].push("image_amarillo")
          } else {
            this.plazos_asigandos_dirop_pendiente[x].push("tiempo")
            this.plazos_asigandos_dirop_pendiente[x].push("image_tiempo")
          }

        }

        if (!this.unidades.includes(this.plazos_asigandos_dirop_pendiente[x][3])) {
          this.unidades.push(this.plazos_asigandos_dirop_pendiente[x][3])
         
          
        }

        this.cambio_valor_respuesta_pendiente.push(this.plazos_asigandos_dirop_pendiente[x])

        //
      }
      this.unidades.sort()
      console.log(this.cantidad)

    }

  }
  filtrar_informacion_estado(item: string) {
    var view_dumentos = document.getElementById("view_dumentos_s_2")
    view_dumentos?.classList.toggle("oculto_2")

    this.cantidad = 0

    this.actulizar_plazo_temp = []
    this.contar()

    if (item == "Vencido") {
      this.estado_plazo_valor = "rojo"
    }
    if (item == "Vence hoy") {
      this.estado_plazo_valor = "naranja"
    }
    if (item == "Vence Mañana") {
      this.estado_plazo_valor = "amarillo"
    }
    if (item == "Con Tiempo") {
      this.estado_plazo_valor = "tiempo"
    }
  
    for (let x in this.cambio_valor_respuesta_pendiente) {

      if (this.cambio_valor_respuesta_pendiente[x][55] == this.estado_plazo_valor) {

        this.cantidad = this.cantidad + 1

        this.actulizar_plazo_temp.push(this.cambio_valor_respuesta_pendiente[x])


        //
      }

    }
    this.cambio_valor_respuesta_pendiente = []

    this.cambio_valor_respuesta_pendiente = this.actulizar_plazo_temp
    
  }
  OnGetNewName(desde: Date, hasta: Date, dato: string) {
    if (hasta.getTime() - desde.getTime() <= 0) return "error";

    let dias = hasta.getDate() - desde.getDate();
    let meses = hasta.getMonth() - desde.getMonth();
    let anios = hasta.getFullYear() - desde.getFullYear();


    if (dias < 0) {
      let primer_dia_proximo_mes = new Date(desde.getFullYear(), desde.getMonth() + 1, 1);
      let diff = primer_dia_proximo_mes.getTime() - desde.getTime();
      let dias_hasta_fin_mes = Math.floor(diff / (60 * 60 * 24 * 1000));
      dias = dias_hasta_fin_mes + hasta.getDate() - 1;
      meses--;
    }

    if (meses < 0) {
      meses = 12 + meses;
      anios--;
    }
    this.valor = dias
    return `${dato}${anios} años ${meses} meses ${dias} dias`;
  }
  contar() {
    this.cantidad = 0
    this.cambio_valor_respuesta_pendiente = []
    for (let x in this.plazos_asigandos_dirop_pendiente) {

      if (this.plazos_asigandos_dirop_pendiente[x][48] != "SI") {
        this.cantidad = this.cantidad + 1
        this.fecha = this.plazos_asigandos_dirop_pendiente[x][38] + "T00:01:00"

        this.days = ""
        this.days = this.OnGetNewName(new Date(), new Date(this.fecha), "Falta ")
        if (this.days == "error") {
          this.days = ""
          this.days = this.OnGetNewName(new Date(this.fecha), new Date(), "Tiene Vencido ")
        }
        this.plazos_asigandos_dirop_pendiente[x].push(this.days)
        if (this.days.includes("Tiene Vencido")) {
          if (this.valor == 0) {
            this.plazos_asigandos_dirop_pendiente[x].push("naranja")
            this.plazos_asigandos_dirop_pendiente[x].push("image_naranja")
          } else {
            this.plazos_asigandos_dirop_pendiente[x].push("rojo")
            this.plazos_asigandos_dirop_pendiente[x].push("image_rojo")
          }

        }
        else {
          if (this.valor == 1) {
            this.plazos_asigandos_dirop_pendiente[x].push("amarillo")
            this.plazos_asigandos_dirop_pendiente[x].push("image_amarillo")
          } else {
            this.plazos_asigandos_dirop_pendiente[x].push("tiempo")
            this.plazos_asigandos_dirop_pendiente[x].push("image_tiempo")
          }

        }

        if (!this.unidades.includes(this.plazos_asigandos_dirop_pendiente[x][3])) {
          this.unidades.push(this.plazos_asigandos_dirop_pendiente[x][3])
        }


        this.cambio_valor_respuesta_pendiente.push(this.plazos_asigandos_dirop_pendiente[x])

        //
      }

      this.unidades.sort()
     // console.log(this.cambio_valor_respuesta_pendiente)
     
    }


  }
  reasignar() {
    this.listado_usurios = this.usuarios.array_listados(this.lis_usuarios)
    if (this.resiacinacion == false) {
      this.resiacinacion = true
      this.resiacinacion_false = true
      this.ocultar_pla = false
    } else {
      this.resiacinacion = false
      this.resiacinacion_false = false
      this.ocultar_pla = true
    }

  }
  divisiones_def() {

    if (this.div1) {
      this.div1 = ""
    }
    else {
      this.div1 = "OK"
    }
    if (this.div2) {
      this.div2 = ""
    }
    else {
      this.div2 = "OK"
    }
    if (this.div3) {
      this.div3 = ""
    }
    else {
      this.div3 = "OK"
    }
    if (this.div4) {
      this.div4 = ""
    }
    else {
      this.div4 = "OK"
    }
    if (this.div5) {
      this.div5 = ""
    }
    else {
      this.div5 = "OK"
    }
    if (this.div6) {
      this.div6 = ""
    }
    else {
      this.div6 = "OK"
    }
    if (this.div7) {
      this.div7 = ""
    }
    else {
      this.div7 = "OK"
    }
    if (this.div8) {
      this.div8 = ""
    }
    else {
      this.div8 = "OK"
    }
    if (this.davaa) {
      this.davaa = ""
    }
    else {
      this.davaa = "OK"
    }
    if (this.divfe) {
      this.divfe = ""
    }
    else {
      this.divfe = "OK"
    }
    if (this.futco) {
      this.futco = ""
    }
    else {
      this.futco = "OK"
    }


  }
  asignar_cargo(form: NgForm) {
    var id = Number(form.value.responsable)
    for (let x in this.listado_usurios) {
      var numero = Number(this.listado_usurios[x][0])

      if (id === numero) {
        this.cargo = this.listado_usurios[x][21]
        this.responsable = this.listado_usurios[x][1] + ". " + this.listado_usurios[x][2] + " " + this.listado_usurios[x][3]
        this.correo = this.listado_usurios[x][7]
      }
    }
  }
  mostrar_fecha(form: NgForm) {
    const respuesta = form.value.respuesta
    if (respuesta === "SI") {
      this.fecha_res = true
    } else {
      this.fecha_res = false
    }
  }
  asignar_plazos(i: number) {

    this.doc_ver = ""
    this.documento_reg = ""
    this.documento_reg = this.cambio_valor_respuesta_pendiente[i][39]
    this.id = this.cambio_valor_respuesta_pendiente[i][0]
    this.doc_ver = this.ducumento + this.cambio_valor_respuesta_pendiente[i][39]

    this.orfeo = this.cambio_valor_respuesta_pendiente[i][1]
    this.cargo = this.cambio_valor_respuesta_pendiente[i][3]
    this.funcionario = this.cambio_valor_respuesta_pendiente[i][2]
    this.op_inmedita = this.cambio_valor_respuesta_pendiente[i][4]
    this.estrito_cumplimiento = this.cambio_valor_respuesta_pendiente[i][5]

    this.para_su_control = this.cambio_valor_respuesta_pendiente[i][6]
    this.autorizado = this.cambio_valor_respuesta_pendiente[i][7]
    this.no_autorizado = this.cambio_valor_respuesta_pendiente[i][8]
    this.lo_de_su_cargo = this.cambio_valor_respuesta_pendiente[i][9]

    this.firma_coejc = this.cambio_valor_respuesta_pendiente[i][10]
    this.firma_secej = this.cambio_valor_respuesta_pendiente[i][11]
    this.firma_jemop = this.cambio_valor_respuesta_pendiente[i][12]
    this.firma_dirop = this.cambio_valor_respuesta_pendiente[i][13]
    this.resuelva_informe = this.cambio_valor_respuesta_pendiente[i][14]
    this.seguimiento = this.cambio_valor_respuesta_pendiente[i][15]
    this.estudie_recomiende = this.cambio_valor_respuesta_pendiente[i][16]

    this.trate_conmigo = this.cambio_valor_respuesta_pendiente[i][17]
    this.de_acuerdo_norma = this.cambio_valor_respuesta_pendiente[i][18]
    this.asistir = this.cambio_valor_respuesta_pendiente[i][19]
    this.archivar = this.cambio_valor_respuesta_pendiente[i][20]
    this.agendar = this.cambio_valor_respuesta_pendiente[i][21]
    this.difundir = this.cambio_valor_respuesta_pendiente[i][22]
    this.remitir = this.cambio_valor_respuesta_pendiente[i][23]

    this.div1 = this.cambio_valor_respuesta_pendiente[i][24]
    this.div2 = this.cambio_valor_respuesta_pendiente[i][25]
    this.div3 = this.cambio_valor_respuesta_pendiente[i][26]
    this.div4 = this.cambio_valor_respuesta_pendiente[i][27]
    this.div5 = this.cambio_valor_respuesta_pendiente[i][28]
    this.div6 = this.cambio_valor_respuesta_pendiente[i][29]
    this.div7 = this.cambio_valor_respuesta_pendiente[i][30]
    this.div8 = this.cambio_valor_respuesta_pendiente[i][31]
    this.davaa = this.cambio_valor_respuesta_pendiente[i][32]
    this.divfe = this.cambio_valor_respuesta_pendiente[i][33]
    this.futco = this.cambio_valor_respuesta_pendiente[i][34]

    this.ordenes = this.cambio_valor_respuesta_pendiente[i][35]

    this.fecha_cumplimiento = this.cambio_valor_respuesta_pendiente[i][36]
    this.respuesta = this.cambio_valor_respuesta_pendiente[i][37]
    this.fecha_respuesta = this.cambio_valor_respuesta_pendiente[i][38]

    this.devolver = this.cambio_valor_respuesta_pendiente[i][45]
    this.cumplio = this.cambio_valor_respuesta_pendiente[i][40]
    this.soporte = this.cambio_valor_respuesta_pendiente[i][41]

    this.observaciones = this.cambio_valor_respuesta_pendiente[i][43]
    
    this.fecha_cumplimiento_plazo = this.cambio_valor_respuesta_pendiente[i][42]

    var view_dumentos = document.getElementById("view_dumentos_s")
    view_dumentos?.classList.toggle("oculto")

    console.log(this.doc_ver)


  }
  cerrar() {
    var view_dumentos = document.getElementById("view_dumentos_s")
    view_dumentos?.classList.toggle("oculto")
  }
  exppdir() {
    var documento_pdf = document.getElementById("documento_pdf")
    var documento_pdf_asignar = document.getElementById("documento_pdf_asignar")
    documento_pdf?.classList.remove("col-md-7")
    documento_pdf?.classList.add("col-md-12")
    documento_pdf_asignar?.classList.add("ocultar_panel")

    // this.doc_ver = ""
    //this.doc_ver = this.ducumento + this.documentos_+"#zoom=170%"

    this.expandir = false
    this.contrae = true


  }
  contraer() {
    var documento_pdf = document.getElementById("documento_pdf")
    var documento_pdf_asignar = document.getElementById("documento_pdf_asignar")
    documento_pdf?.classList.remove("col-md-12")
    documento_pdf?.classList.add("col-md-7")
    documento_pdf_asignar?.classList.remove("ocultar_panel")

    this.expandir = true
    this.contrae = false
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

  cargar_for_data_check(nombre: string, valor: boolean) {

    if (valor) {
      this.formData.append(nombre, "OK")
    } else {
      this.formData.append(nombre, "---")
    }

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
  valicacion_array_funcion(valicaion_array: string[]) {

    for (let index in valicaion_array) {
      if (valicaion_array[index] === "false") {
        return false
      }
    }
    return true
  }
  cargar_acta_alerta() {

    const radiograma_unidad = document.getElementById("cumplido_soporte")
    radiograma_unidad?.click()
  }
  leer_acta_alerta(event: Event) {
    const acta_reserva = document.getElementById("cumplido_soporte") as HTMLInputElement
    let acta_alerta_name = acta_reserva.files![0].name
    this.inf_r = true
    this.inf_c_r = acta_alerta_name
  }
  llenar_documentos_acta(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
      this.formData.append("cumplido_soporte_2", "---");
    } else {
      this.formData.append(nombre, "---");
      this.formData.append("cumplido_soporte_2", "-//-");
    }
  }



// =========================
// 📌 Funciones reutilizables
// =========================
private showSpinner() {
  document.getElementById("espiner")?.classList.add("lds-spinner");
}

private hideSpinner() {
  document.getElementById("espiner")?.classList.remove("lds-spinner");
}

private actualizarSessionStorage(key: string, value: any) {
  sessionStorage.removeItem(key);
  sessionStorage.setItem(key, JSON.stringify(value));
  this.plazos_asigandos_dirop_pendiente = JSON.parse(sessionStorage.getItem(key)!);
}

private manejarRespuesta(result: HttpResponse<any>, key: string, reload: boolean = false) {
  Object.entries(result).forEach(([k, v]) => {
    if (k === key) {
      this.actualizarSessionStorage(key, v);
    }
  });

  this.inf_g = true;
  this.inf_a = false;
  this.hideSpinner();

  if (reload) window.location.reload();
}

private manejarError() {
  this.inf_a = true;
  this.inf_g = false;
  this.inf_c_g = "error de conexion";
  this.hideSpinner();
}


// =========================
// 📌 FUNCIONES PRINCIPALES
// =========================

// ✅ Eliminar plazo
eliminar_plazo(form: NgForm) {
  if (!window.confirm("¿Estás seguro de que deseas continuar?")) return;

  this.formData.append("id", this.id);
  this.formData.append("documento_pdf", this.documento_reg);
  this.formData.append("permiso", "permiso");

  this.showSpinner();

  this.api_serve.eliminar_asignacion(this.formData).subscribe({
    next: (res: HttpResponse<any>) => this.manejarRespuesta(res, "plazos_asignados_pendientes", true),
    error: () => this.manejarError()
  });
}


// ✅ Actualizar plazo
actulizar_plazo(form: NgForm) {
  if (!window.confirm("¿Estás seguro de que deseas continuar?")) return;

  const cumplido_soporte_2 = document.getElementById("cumplido_soporte") as HTMLInputElement;
  let cumplido_soporte = cumplido_soporte_2.files![0];
  this.llenar_documentos_acta("cumplido_soporte", cumplido_soporte);

  this.formData.append("id", this.id);
  this.formData.append("funcionario", this.funcionario);
  this.formData.append("orfeo", this.orfeo);

  const observaciones_respuesta = form.value.observaciones_respuesta;
  this.validar_informacion(observaciones_respuesta, "observaciones_respuesta");
  this.formData.append("permiso", "permiso");

  this.showSpinner();

  this.validacion = this.valicacion_array_funcion(this.valicaion_array);
  if (!this.validacion) {
    this.inf_a = true;
    this.inf_c_g = "Debe de llenar toda la información";
    this.valicaion_array.splice(0); // limpiar
    this.hideSpinner();
    return;
  }

  this.api_serve.cumplir_asignacion_respuesta(this.formData).subscribe({
    next: (res: HttpResponse<any>) => {
      this.manejarRespuesta(res, "plazos_asignados_pendientes", true);
      this.contar();
    },
    error: () => this.manejarError()
  });
}


// ✅ Reasignar plazo
reasignar_plazo(form: NgForm) {
  if (!window.confirm("¿Estás seguro de que deseas continuar?")) return;

  // 🔹 Variables del formulario
  const {
    responsable, cargo, op_inmedita, estrito_cumplimiento, para_su_control,
    autorizado, no_autorizado, lo_de_su_cargo, firma_coejc, firma_secej,
    firma_jemop, firma_dirop, resuelva_informe, seguimiento, estudie_recomiende,
    trate_conmigo, de_acuerdo_norma, asistir, archivar, agendar, difundir, remitir,
    div1, div2, div3, div4, div5, div6, div7, div8, davaa, divfe, futco, ftcec, devolver,
    orden, fecha_plazo, respuesta, fecha_plazo_respuesta
  } = form.value;

  // 🔹 Validaciones
  this.validar_informacion(responsable, "responsable");
  this.validar_informacion(cargo, "cargo");

  [
    ["op_inmedita", op_inmedita], ["estrito_cumplimiento", estrito_cumplimiento],
    ["para_su_control", para_su_control], ["autorizado", autorizado],
    ["no_autorizado", no_autorizado], ["lo_de_su_cargo", lo_de_su_cargo],
    ["firma_coejc", firma_coejc], ["firma_secej", firma_secej],
    ["firma_jemop", firma_jemop], ["firma_dirop", firma_dirop],
    ["resuelva_informe", resuelva_informe], ["seguimiento", seguimiento],
    ["estudie_recomiende", estudie_recomiende], ["trate_conmigo", trate_conmigo],
    ["de_acuerdo_norma", de_acuerdo_norma], ["asistir", asistir],
    ["archivar", archivar], ["agendar", agendar], ["difundir", difundir],
    ["remitir", remitir], ["div1", div1], ["div2", div2], ["div3", div3],
    ["div4", div4], ["div5", div5], ["div6", div6], ["div7", div7],
    ["div8", div8], ["davaa", davaa], ["divfe", divfe], ["futco", futco],
    ["ftcec", ftcec], ["devolver", devolver]
  ].forEach(([campo, valor]) => this.cargar_for_data_check(campo as string, valor));

  this.validDates(fecha_plazo, "fecha_plazo");
  this.validar_informacion(fecha_plazo, "fecha_plazo");
  this.validar_informacion(respuesta, "respuesta");

  if (respuesta === "SI") {
    this.validDates(fecha_plazo_respuesta, "fecha_plazo_respuesta");
    this.validar_informacion(fecha_plazo_respuesta, "fecha_plazo_respuesta");
  } else {
    this.formData.append("fecha_plazo_respuesta", "----");
  }

  // 🔹 Cargar datos
  this.formData.append("orden", orden);
  this.formData.append("id", this.id);
  this.formData.append("documento", this.orfeo);
  this.formData.append("respuesta", respuesta);
  this.formData.append("funcionario", this.responsable);
  this.formData.append("correo_ejc", this.correo);
  this.formData.append("documento_pdf", this.documento_reg);
  this.formData.append("permiso", "permiso");

  this.showSpinner();

  this.validacion = this.valicacion_array_funcion(this.valicaion_array);
  if (!this.validacion) {
    this.inf_a = true;
    this.inf_c_g = "Debe de llenar toda la información";
    this.valicaion_array.splice(0);
    this.hideSpinner();
    return;
  }

  this.api_serve.reporte_pdf_respuesta(this.formData).subscribe({
    next: (res: HttpResponse<any>) => {
      this.manejarRespuesta(res, "plazos_asignados_pendientes", true);
      this.contar();
    },
    error: () => this.manejarError()
  });
}


// ✅ Listado asignados
listado_asignados() {
  this.formData.append("permiso", this.cookie.get("permiso"));
  this.formData.append("unidad", this.cookie.get("unidad"));

  this.showSpinner();

  this.api_serve.plazos_asignados_seguimiento(this.formData).subscribe({
    next: (res: HttpResponse<any>) => {
      this.manejarRespuesta(res, "plazos_asignados_pendientes");
      this.contar();
    },
    error: () => this.manejarError()
  });
}



  reporte_pdf() {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("reporte", "where respuesta = 'SI'");
    this.formData.append("reporte_2", "and respuesta = 'SI'");
    this.formData.append("numero_variable", "38");
    this.formData.append("numero_variable_2", "48");
    this.formData.append("orden", "fecha_plazo_respuesta");
    

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")


    this.api_serve.reporte_pdf_respuesta(this.formData).subscribe({
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

        this.filtrar_2()
      },
      error: (err: HttpErrorResponse) => {

        this.inf_a = true
        this.inf_g = false
        this.inf_c_g = String("error de conexion")
      }
    })

  }

  reporte_pdf_balance() {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("reporte", "where respuesta = 'SI'");
    this.formData.append("reporte_2", "and respuesta = 'SI'");
    this.formData.append("numero_variable", "38");
    this.formData.append("numero_variable_2", "48");
    this.formData.append("orden", "fecha_plazo_respuesta");

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    this.api_serve.reporte_pdf_respuesta_balance(this.formData).subscribe({
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
        this.filtrar_2()

      },
      error: (err: HttpErrorResponse) => {

        this.inf_a = true
        this.inf_g = false
        this.inf_c_g = String("error de conexion")
      }
    })

  }

  reporte_pdf_estadistica() {

    this.formData.append("fullname", this.cookie.get("fullname"));
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

    this.formData.append("reporte", "where respuesta = 'SI'");
    this.formData.append("reporte_2", "and respuesta = 'SI'");
    this.formData.append("numero_variable", "38");
    this.formData.append("numero_variable_2", "48");
    this.formData.append("orden", "fecha_plazo_respuesta");
    
    

    var espiner = document.getElementById("espiner")
    espiner?.classList.add("lds-spinner")

    this.api_serve.reporte_pdf_respuesta_estadistica(this.formData).subscribe({
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
        this.filtrar_2()

      },
      error: (err: HttpErrorResponse) => {

        this.inf_a = true
        this.inf_g = false
        this.inf_c_g = String("error de conexion")
      }
    })

  }


}
