import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor() { }
  cordenada_x: number = 4.60971
  cordenada_y: number = -74.08175

  evento:string = "-"
  fecha:string = "-"

  crear_point(cordenada_x:number, cordenada_y:number, evento:string, fecha:string){
    this.cordenada_x = cordenada_x
    this.cordenada_y = cordenada_y
    this.evento =  evento
    this.fecha =  fecha
  }
}
