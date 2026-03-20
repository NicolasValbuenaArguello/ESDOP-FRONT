import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor() { }

  carga(archivos:string[]){
    for (let arcvivo of archivos) {
      
      let scrpit = document.createElement("script");
      scrpit.src = "./assets/"+arcvivo+".js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(scrpit);
    }
  }
}
