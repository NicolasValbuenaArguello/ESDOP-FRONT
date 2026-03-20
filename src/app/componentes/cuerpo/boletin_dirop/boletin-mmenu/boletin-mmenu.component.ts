import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BoletinComponent } from '../boletin/boletin.component';

import { Router } from '@angular/router';
import { AnotacionesBoletinComponent } from '../anotaciones-boletin/anotaciones-boletin.component';



@Component({
  selector: 'app-boletin-mmenu',
  templateUrl: './boletin-mmenu.component.html',
  styleUrls: ['./boletin-mmenu.component.css']
})
export class BoletinMmenuComponent {
  


  constructor( private router: Router){}
  @ViewChild(BoletinComponent) listado_boletines!: BoletinComponent
  @ViewChild(AnotacionesBoletinComponent) listado_boletines_2!: AnotacionesBoletinComponent

  mostrar_menu(identificador:number){
    var regsitro_boletines =  document.getElementById("regsitro_boletines")
    var oculto_documentos_modificar =  document.getElementById("oculto_documentos_modificar")
    var oculto_documentos_planilla_crear =  document.getElementById("oculto_documentos_planilla_crear")
    var oculto_documentos_planilla_firmas =  document.getElementById("oculto_documentos_planilla_firmas")

    regsitro_boletines?.classList.remove("regsitro_boletines")
    oculto_documentos_modificar?.classList.remove("oculto_documentos_modificar")
    oculto_documentos_planilla_crear?.classList.remove("oculto_documentos_planilla_crear")
    oculto_documentos_planilla_firmas?.classList.remove("oculto_documentos_planilla_firmas")

    regsitro_boletines?.classList.add("regsitro_boletines")
    oculto_documentos_modificar?.classList.add("oculto_documentos_modificar")
    oculto_documentos_planilla_crear?.classList.add("oculto_documentos_planilla_crear")
    oculto_documentos_planilla_firmas?.classList.add("oculto_documentos_planilla_firmas")
    
    if (identificador == 1) {
      this.router.navigate(["/Boletin_registro_Dirop"])
      
    }
    if (identificador == 2) {
      this.router.navigate(["/ListadoAnotacionesComponent"])
      
    }
    if (identificador == 3) {

      this.router.navigate(["/anotaciones_dirop_bol"])

    }
    if (identificador == 4) {
      oculto_documentos_planilla_firmas?.classList.toggle("oculto_documentos_planilla_firmas")
    }

    
    
  }
  
}
