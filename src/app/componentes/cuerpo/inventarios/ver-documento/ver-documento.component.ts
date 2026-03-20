import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InfEventoService } from 'src/app/servicios_generales/informacion/inf-evento.service';

@Component({
  selector: 'app-ver-documento',
  templateUrl: './ver-documento.component.html',
  styleUrls: ['./ver-documento.component.css']
})
export class VerDocumentoComponent {
  nombre_dumento = this.informacion.documento
  direcion = this.informacion.direcion
  // ver = this.informacion.ver
  ruta = this.informacion.ruta

  @Input() server:string
 

  constructor(private informacion: InfEventoService, private router: Router) {
    // console.log(this.server)
  }
cerrar(){
  var view_dumentos =  document.getElementById("view_dumentos")
  view_dumentos?.classList.toggle("documento_oculto")

  // this.router.navigate([this.ruta])
}
}
