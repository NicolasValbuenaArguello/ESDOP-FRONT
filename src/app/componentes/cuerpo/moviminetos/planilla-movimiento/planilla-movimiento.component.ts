import { Component } from '@angular/core';

@Component({
  selector: 'app-planilla-movimiento',
  templateUrl: './planilla-movimiento.component.html',
  styleUrls: ['./planilla-movimiento.component.css']
})
export class PlanillaMovimientoComponent {

  personal_listado_medallas: string[] = ["-"]
  personal_listado_medallas_final: String[] = []
  /*
  modulo creado el 14 de marozo del 2025
  el presente escrip oculta un sub menu 
  */
  mostrar_proyecto(){
    var proyecto =  document.getElementById("proyecto_ingreso")
    proyecto?.classList.toggle("oculto")

    var oculto_documentos =  document.getElementById("oculto_documentos")
    var oculto_documentos_modificar =  document.getElementById("oculto_documentos_modificar")

    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
  }
  cerrar(){
    var oculto_documentos =  document.getElementById("oculto_documentos")
    var oculto_documentos_modificar =  document.getElementById("oculto_documentos_modificar")
    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
  }
  /*
  modulo creado el 14 de marozo del 2025
  el presente escrip oculta un sub menu 
  */
  mostrar_menu(identificador:number){
    var oculto_documentos =  document.getElementById("oculto_documentos")
    var oculto_documentos_modificar =  document.getElementById("oculto_documentos_modificar")
    var oculto_documentos_planilla_crear =  document.getElementById("oculto_documentos_planilla_crear")
    var oculto_documentos_planilla_firmas =  document.getElementById("oculto_documentos_planilla_firmas")

    
    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")
    oculto_documentos_planilla_crear?.classList.remove("oculto_documentos_planilla_crear")
    oculto_documentos_planilla_firmas?.classList.remove("oculto_documentos_planilla_firmas")

    

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
    oculto_documentos_planilla_crear?.classList.add("oculto_documentos_planilla_crear")
    oculto_documentos_planilla_firmas?.classList.add("oculto_documentos_planilla_firmas")
    
    if (identificador == 1) {
      oculto_documentos?.classList.toggle("oculto_documentos")
    }
    if (identificador == 2) {
      oculto_documentos_modificar?.classList.toggle("oculto_documentos_modificar")
    }
    if (identificador == 3) {
      oculto_documentos_planilla_crear?.classList.toggle("oculto_documentos_planilla_crear")
    }
    if (identificador == 4) {
      oculto_documentos_planilla_firmas?.classList.toggle("oculto_documentos_planilla_firmas")
    }

    
    
  }
}
