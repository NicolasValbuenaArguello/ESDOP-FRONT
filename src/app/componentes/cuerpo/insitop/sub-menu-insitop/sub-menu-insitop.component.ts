import { Component, ViewChild } from '@angular/core';
import { CargueInsitopComponent } from '../cargue-insitop/cargue-insitop.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sub-menu-insitop',
  templateUrl: './sub-menu-insitop.component.html',
  styleUrls: ['./sub-menu-insitop.component.css']
})


export class SubMenuInsitopComponent {
  @ViewChild(CargueInsitopComponent) componete_hija!: CargueInsitopComponent
  cargue_insitop_per: boolean
  constructor (private cookie: CookieService){
    this.cargue_insitop_per = this.validar_estado(this.cookie.get("cargue_insitop_per"))
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
mostrar_menu(opcion: number) {
  this.ocultarTodo();

  if (opcion === 1) {
    document.getElementById("oculto_documentos")?.classList.add("activo");
  } else if (opcion === 2) {
    document.getElementById("oculto_documentos_modificar")?.classList.add("activo");
  } else if (opcion === 4) {
    document.getElementById("oculto_documentos_planilla_firmas")?.classList.add("activo");
  } else if (opcion === 3) {
    document.getElementById("oculto_documentos_planilla_calcular")?.classList.add("activo");
  } else if (opcion === 5) {
    document.getElementById("oculto_documentos_unidades_sin_cargar")?.classList.add("activo");
  }else if (opcion === 6) {
    document.getElementById("oculto_documentos_unidades_aisladas")?.classList.add("activo");
  }else if (opcion === 7) {
    document.getElementById("oculto_documentos_unidades_cercanas")?.classList.add("activo");
  }else if (opcion === 8) {
    document.getElementById("oculto_documentos_unidades_resumen")?.classList.add("activo");
  }
  
  
}

ocultarTodo() {
  document.getElementById("oculto_documentos")?.classList.remove("activo");
  document.getElementById("oculto_documentos_modificar")?.classList.remove("activo");
  document.getElementById("oculto_documentos_planilla_firmas")?.classList.remove("activo");
  document.getElementById("oculto_documentos_planilla_calcular")?.classList.remove("activo");
  document.getElementById("oculto_documentos_unidades_sin_cargar")?.classList.remove("activo");
  document.getElementById("oculto_documentos_unidades_aisladas")?.classList.remove("activo");
  document.getElementById("oculto_documentos_unidades_cercanas")?.classList.remove("activo");
  document.getElementById("oculto_documentos_unidades_resumen")?.classList.remove("activo");
  
  
}


}
