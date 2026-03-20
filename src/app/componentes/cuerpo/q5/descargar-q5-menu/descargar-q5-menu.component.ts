import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DescargarQ5ListadoComponent } from '../descargar-q5-listado/descargar-q5-listado.component';

@Component({
  selector: 'app-descargar-q5-menu',
  templateUrl: './descargar-q5-menu.component.html',
  styleUrls: ['./descargar-q5-menu.component.css']
})
export class DescargarQ5MenuComponent {
  constructor( private router: Router){}
  /*
  modulo creado el 14 de marozo del 2025
  el presente escrip oculta un sub menu 
  */
 
 @ViewChild(DescargarQ5ListadoComponent) listado_afectaciones!: DescargarQ5ListadoComponent
  mostrar_menu(identificador:number){
    var oculto_documentos =  document.getElementById("oculto_documentos")
    var oculto_documentos_modificar =  document.getElementById("oculto_documentos_modificar")

    oculto_documentos?.classList.remove("oculto_documentos")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")

    oculto_documentos?.classList.add("oculto_documentos")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")

    if (identificador == 1) {
      oculto_documentos?.classList.toggle("oculto_documentos")
    }
    if (identificador == 2) {
      oculto_documentos_modificar?.classList.toggle("oculto_documentos_modificar")
      this.listado_afectaciones.listado_asignados()

    }
    
  }
}
