import { Component } from '@angular/core';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-estadistica-anexo1',
  templateUrl: './estadistica-anexo1.component.html',
  styleUrls: ['./estadistica-anexo1.component.css']
})
export class EstadisticaAnexo1Component {
  constructor(private selector: SelectoresService){}
  aler_p_i: boolean = false
  aler_p_f: boolean = false
  aler_u_i: boolean = false
  aler_u_f: boolean = false
  alerta: string = ""
  filtro: string = "unidad"
  divi_padre: string = "---"
  divi_hija: string = "---"

  batallon: string = "---"
  municipios: string = "---"
  departamento: string = "---"

  
  unidad_selecionada_div: string[] = []
  unidad_selecionada_brigada: string[] = []
  unidad_selecionada_batallones: string[] = []

  unidad_selecionada_municipios: string[] = []

  departamentos_filtrados = this.selector.departamentos_unicos()


  
  jefactura =  this.selector.jefactura
  comando =  this.selector.comando
  fuerza_tarea =  this.selector.fuerza_tarea
  cede =  this.selector.cede
  
  brigada =  this.selector.brigada
  unidad_diper =  this.selector.unidad_diper

  division = this.selector.duplicados()

  div_hija(evaluar: number, respuesta: number) {
    for (let i in this.unidad_selecionada_div) {
      this.unidad_selecionada_div.splice(parseInt(i))
    }
    this.unidad_selecionada_brigada = []
    this.unidad_selecionada_batallones = []

    this.unidad_selecionada_div = this.selector.unidades_filtradas(this.divi_padre, evaluar, respuesta)

  }
  brigadas(evaluar: number, respuesta: number) {

    for (let i in this.unidad_selecionada_brigada) {
      this.unidad_selecionada_brigada.splice(parseInt(i))
    }

    this.unidad_selecionada_batallones = []
    this.unidad_selecionada_brigada = this.selector.unidades_filtradas(this.divi_hija, evaluar, respuesta)

  }

  departamentos(evaluar: number, respuesta: number) {

    for (let i in this.departamentos_filtrados) {
      this.unidad_selecionada_municipios.splice(parseInt(i))
    }
    this.unidad_selecionada_municipios = this.selector.unidades_filtradas(this.departamento, evaluar, respuesta)
  }
}
