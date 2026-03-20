import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-detalle-inventario',
  templateUrl: './detalle-inventario.component.html',
  styleUrls: ['./detalle-inventario.component.css']
})
export class DetalleInventarioComponent {
  per_update:boolean

  per_update_1:boolean = false
  per_update_2:boolean = true

  per_update_3: boolean = true
  per_update_4: boolean = false

  constructor(private permisos: PermisosService, private api_serve: ServiceConecionService, private router: Router, private menu_service :  SelectoresService, private cookie: CookieService, private informacion: InfEventoService) { 
    this.per_update = this.validar_estado(this.cookie.get("per_update"))
  }

  img = "http://172.22.2.36:5198" + this.permisos.foto_inventario

  // doc = "http://172.22.2.36:5198" + this.permisos.documento

  doc = "http://172.22.2.36:5198/documentos_asignacion_inventarios/CUADRO RESULTADOS DEL EJÉRCITO NACIONAL.pdf"
  server:string 
  

  id_inventarios_unidad = this.permisos.id_inventarios_unidad
  fecha_asignacion =  this.permisos.fecha_asignacion
  director = this.permisos.director
  director_cargo = this.permisos.director_cargo
  seccion = this.permisos.seccion
  seccion_cargo = this.permisos.seccion_cargo
  responsable = this.permisos.responsable
  responsable_cargo = this.permisos.responsable_cargo
  foto_inventario = this.permisos.foto_inventario
  documento = this.permisos.documento

  asesorios:String[]=[]
  asesorios_inventarios: {} = JSON.parse(sessionStorage.getItem("asesorios_inventarios")!)

  observacion:String[]=[]
  observaciones_inventarios: {} = JSON.parse(sessionStorage.getItem("observaciones_inventarios")!)
  // console.log(this.menu_service.listado_usurios )

  img_2:string = "../../../../../assets/img/invetarios.png"

  
  inf_a: boolean = false
  inf_c_g: string = "datos"
  inf_g: boolean = false

  inf_btn: boolean = true
  inf_btnuew: boolean = false
  valicaion_array: string[] = []

  formData = new FormData();
  validacion: boolean = false
  validar_nombre: boolean = false
  
  inf_b: boolean = false
  inf_c_b: string = "datos "

  director_seccion :string = ""
  lis_usuarios:{} = JSON.parse(sessionStorage.getItem("listado_personal")!)
  listado_usurios:String[]=[]

  ngOnInit(): void {


    this.asesorios = this.menu_service.array_listados(this.asesorios_inventarios)
    this.observacion = this.menu_service.array_listados(this.observaciones_inventarios)
    this.listado_usurios =  this.menu_service.array_listados(this.lis_usuarios)
    // console.log(this.lis_usuarios)
  }
  ver_documento(){
    var view_dumentos =  document.getElementById("view_dumentos")
    view_dumentos?.classList.toggle("documento_oculto")
    this.server = this.doc  
    this.informacion.ver_documento_view()
    
    // this.router.navigate(["/ver_document"])
  }

  validar_estado(dato:string){

    var dato_r = false
  
    if (dato==="1") {
      dato_r = true
    }else{
      dato_r = false
    }
    return dato_r
  
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
    //funciones para el cargue de los boletines edocumentos
    cargar_boletin() {

      const boletin_fisico = document.getElementById("boletin_fisico")
      boletin_fisico?.click()
    }
    leer_boletin(event: Event) {
      const boletin_fisico = document.getElementById("boletin_fisico") as HTMLInputElement
      let boletin_fisico_name = boletin_fisico.files![0].name
      this.inf_b = true
      this.inf_c_b = boletin_fisico_name
      // this.validar_nombre_documneto(boletin_fisico_name)
    }
    
  cambio_editar(){
    if (this.per_update_1) {
      this.per_update_1 = false
      this.per_update_2 = true
    } else {
      this.per_update_1 = true
      this.per_update_2 = false
    }
    // var lis_cargos: {} = JSON.parse(sessionStorage.getItem("cargo_personal")!)
    // this.listado_cargos = this.menu_service.array_listados(lis_cargos)

  }
      
  cambio_editar_director(){
    if (this.per_update_3) {
      this.per_update_3 = false
      this.per_update_4 = true
    } else {
      this.per_update_3 = true
      this.per_update_4 = false
    }
    // var lis_cargos: {} = JSON.parse(sessionStorage.getItem("cargo_personal")!)
    // this.listado_cargos = this.menu_service.array_listados(lis_cargos)

  }
  cargo_direcion(form: NgForm){
    const cordinador = form.value.director
    var id_personal = parseInt(cordinador)
    this.director_cargo= String(this.listado_usurios[id_personal][5])
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
}
