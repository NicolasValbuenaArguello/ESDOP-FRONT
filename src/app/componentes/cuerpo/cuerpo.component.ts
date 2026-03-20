import { style } from '@angular/animations';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit {
  constructor(private selector:SelectoresService, private api_serve: ServiceConecionService, private cookie: CookieService){}
  formData = new FormData();
  ngOnInit(): void {
 const cuerpo = document.getElementById("directiva")
    // const a_href = document.createElement('a')
    // a_href.classList.add("btn")
    // a_href.classList.add("btn-outline-dark")
    // a_href.classList.add("col-md-12")
  
    // a_href.href = "this.link"
    // a_href.download = "this.nombre"
    // a_href.innerHTML ="Directiva 002-2017"
    // cuerpo?.appendChild(a_href)
  }
  
}
