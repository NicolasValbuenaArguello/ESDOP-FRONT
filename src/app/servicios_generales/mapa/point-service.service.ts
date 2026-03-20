import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointServiceService {

  constructor() { }
  unidad:string
  
  array_listados(listado:{}){
    const resultados = Object.keys(listado).map((key) => {
      return { [key]: listado[key as keyof typeof listado] };
    });

    const listado_control:String[]=[]
    for (let x in resultados){
      const dato = resultados[x]
      for(let j in dato){
        this.unidad = dato[j]
        listado_control.push(this.unidad )
      }
    }
    return listado_control
  }
}
