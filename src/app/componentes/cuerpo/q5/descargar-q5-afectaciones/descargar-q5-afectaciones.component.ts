import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-descargar-q5-afectaciones',
  templateUrl: './descargar-q5-afectaciones.component.html',
  styleUrls: ['./descargar-q5-afectaciones.component.css']
})
export class DescargarQ5AfectacionesComponent {
    constructor(private selector: SelectoresService, private menu_service :  SelectoresService,  private cookie: CookieService, private api_serve: ServiceConecionService){}
  /*
  modulo creado el 14 de marozo del 2025
  el presente escrip oculta un sub menu 
  */
  amenaza_select = this.selector.amenaza_select()
}
