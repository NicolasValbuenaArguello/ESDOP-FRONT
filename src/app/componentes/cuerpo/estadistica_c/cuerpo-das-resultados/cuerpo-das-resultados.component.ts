import { Component, ViewChild } from '@angular/core';
import { MenuDasResultadosComponent } from '../menu-das-resultados/menu-das-resultados.component';


@Component({
  selector: 'app-cuerpo-das-resultados',
  templateUrl: './cuerpo-das-resultados.component.html',
  styleUrls: ['./cuerpo-das-resultados.component.css']
})
export class CuerpoDasResultadosComponent {
 @ViewChild(MenuDasResultadosComponent) menu!: MenuDasResultadosComponent

 cerrar_menu(){
  this.menu.cerrar_menu()
 }

}
