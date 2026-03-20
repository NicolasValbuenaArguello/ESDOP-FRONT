import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-listados-user',
  templateUrl: './listados-user.component.html',
  styleUrls: ['./listados-user.component.css']
})
export class ListadosUserComponent implements OnInit {
  listado_usurios: any[] = [];
  modoOscuro = false;
  busqueda = '';
  server = '';

  lis_usuarios: any = JSON.parse(sessionStorage.getItem('usuarios')!);

  constructor(
    private usuarios: SelectoresService,
    private router: Router,
    private permisos: PermisosService,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.listado_usurios = this.usuarios.array_listados(this.lis_usuarios);
  }

  info(id: number) {
    this.permisos.inf_permisos(this.listado_usurios[id]);
    this.router.navigate(['/permisos_user']);
  }

  ver_documento(documento: string) {
    const view_dumentos = document.getElementById('view_dumentos');
    view_dumentos?.classList.toggle('documento_oculto');
    this.server = 'http://172.22.2.36:5198' + documento;
  }

  limpiarBusqueda() {
    this.busqueda = '';
  }
}
