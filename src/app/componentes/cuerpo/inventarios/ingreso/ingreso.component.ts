import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {

  constructor(private menu_service :  SelectoresService, private cookie: CookieService, private api_serve: ServiceConecionService){}

  array_accesorio:any[]=[]
  elemento:Array<string>=[]
  recorrer_elementos:string[]=[]

  observaciones:String[]=[]

  numero_activo: string = ""
  denominacion: string = ""
  numero_de_serie: string = ""
  numero_de_inventario: string = ""
  valor: string = ""
  ubicacion: string = ""

  observaciones_ele:string = ""

  cargo_dir :string = ""

  director:string
  seccion:string
  responsable:string

  director_seccion :string = ""
  responsable_cargo:string = ""
  lis_usuarios:{} = JSON.parse(sessionStorage.getItem("listado_personal")!)
  listado_usurios:String[]=[]
  img:string = "../../../../../assets/img/invetarios.png"

  
  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData = new FormData();
  validacion: boolean = false
  validar_nombre: boolean = false


  ngOnInit(): void {

    this.listado_usurios =  this.menu_service.array_listados(this.lis_usuarios)
    // console.log(this.lis_usuarios)
  }

  cargar_foto(){
    var foto_user =  document.getElementById("foto_user") as HTMLInputElement 
    foto_user.click()
  }

  leer_foto(event: Event){
    let foto_user =  document.getElementById("foto_user")  as HTMLInputElement
     var file = foto_user.files![0];
    //Creamos la url
    var objectURL = URL.createObjectURL(file)
    this.img = objectURL

  }
  nuevo_vehiculo(form: NgForm){

    const numero_activo =  form.value.numero_activo
    const denominacion =  form.value.denominacion
    const numero_de_serie =  form.value.numero_de_serie
    const numero_de_inventario =  form.value.numero_de_inventario
    const valor =  form.value.valor
    const ubicacion =  form.value.ubicacion_material

    // console.log(ubicacion)
    this.elemento.push(numero_activo, denominacion, numero_de_serie, numero_de_inventario, valor, ubicacion)
    // var asesorio = cantidad + " - "+ accesorio + " "
    // this.recorrer_elementos = 
    this.array_accesorio.push(this.elemento)
    // console.log(this.array_accesorio)
    this.elemento = []
    

    this.numero_activo = ""
    this.denominacion = ""
    this.numero_de_serie = ""
    this.numero_de_inventario = ""
    this.valor = ""
    this.ubicacion = ""

  }

  eliminar(item : number){
    this.array_accesorio.splice(item, 1);
  }
  nuevo_observaciones(form: NgForm){
    const observaciones_e = form.value.observaciones_elemento
    this.observaciones.push(observaciones_e)
    this.observaciones_ele = ""
  }

  eliminar_observaciones(item : number){
    this.observaciones.splice(item, 1);
  }

  cargo_direcion(form: NgForm){
    const cordinador = form.value.director
    var id_personal = parseInt(cordinador)
    this.cargo_dir= String(this.listado_usurios[id_personal][5])
    this.director= String(this.listado_usurios[id_personal][1]) +". " +String(this.listado_usurios[id_personal][3]) + " " +String(this.listado_usurios[id_personal][2])
    
  }
  cargo_seccion(form: NgForm){
    const cordinador = form.value.seccion
    var id_personal = parseInt(cordinador)
    this.seccion= String(this.listado_usurios[id_personal][5])
    this.director_seccion= String(this.listado_usurios[id_personal][1]) +". " +String(this.listado_usurios[id_personal][3]) + " " +String(this.listado_usurios[id_personal][2])
  }
  cargo_respomsable(form: NgForm){
    const cordinador = form.value.responsable
    var id_personal = parseInt(cordinador)
    this.responsable_cargo= String(this.listado_usurios[id_personal][5])
    this.responsable= String(this.listado_usurios[id_personal][1]) +". " +String(this.listado_usurios[id_personal][2]) + " " +String(this.listado_usurios[id_personal][3])
  }
  validar_informacion(infor: string, nombre: string) {
    const elemento = document.getElementById(nombre) as HTMLElement
    if (!infor || infor === "" || infor === "---" ) {
      
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
  llenar_documentos(nombre: string, documento: File) {
    if (documento != undefined) {
      this.formData.append(nombre, documento, documento.name);
    } else {
      this.formData.append(nombre, "---");
    }
  }
  clear() {
    window.location.reload()
    this.inf_btn = true
    this.inf_btnuew = false
  }
  guardar(form: NgForm) {
    // const numero_boletin_div = form.value.numero_boletin_div
 
    const foto_user = document.getElementById("foto_user") as HTMLInputElement
    let foto_user_name = foto_user.files![0]
    this.llenar_documentos("foto", foto_user_name)

    const fecha_asignacion = form.value.fecha_asignacion



    // director_cargo

    // seccion_cargo

    // responsable_cargo



    
    
    // console.log(typeof(m_l))
    // console.log(m_l)

    this.validar_informacion(fecha_asignacion, "fecha_asignacion")

    this.validar_informacion(this.director, "director")
    this.validar_informacion(this.seccion, "seccion")
    this.validar_informacion(this.responsable, "responsable")

    this.formData.append("director_cargo", this.cargo_dir);
    this.formData.append("seccion_cargo", this.director_seccion);
    this.formData.append("responsable_cargo", this.responsable_cargo);

    this.formData.append("inventario",  JSON.stringify(this.array_accesorio));
    this.formData.append("observaciones", JSON.stringify(this.observaciones));

    
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));

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
        this.api_serve.inventarios_ingreso(this.formData).subscribe({
          next: (result: HttpResponse<any>) => {
            console.log(result)
            Object.entries(result).forEach(([key, value]) => {
              var dato = value
              var key = key
              if (key === "respuesta") {
                this.inf_c_g = String(dato)
              }
              if (key === "listado_inventarios") {
                sessionStorage.removeItem("listado_inventarios")
                sessionStorage.setItem("listado_inventarios", JSON.stringify(dato))
              }
            });

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
            // console.log(err)
            this.inf_c_g = String("error de conexion")
          }
        })
      
    }
  }


}
