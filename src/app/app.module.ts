import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoguinComponent } from './componentes/loguin/loguin.component';
import { CuerpoComponent } from './componentes/cuerpo/cuerpo.component';
import { MenuComponent } from './componentes/cuerpo/menu/menu.component';
import { EstadisticaExcelComponent } from './componentes/cuerpo/estadistica_c/estadistica-excel/estadistica-excel.component';

import { EstadisticaPdfComponent } from './componentes/cuerpo/estadistica_c/estadistica-pdf/estadistica-pdf.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http'

import {TokenInterceptor} from '../app/token/token.interceptor'

import { CookieService } from 'ngx-cookie-service';
import { authGuard } from './servicios_generales/auth.guard';
import { SelectoresService } from './servicios_generales/selectores.service';
import { ServiceConecionService } from './service-conecion.service';
import { SpinerComponent } from './componentes/cuerpo/spiner/spiner.component';
import { CargueEventosDivComponent } from './componentes/cuerpo/eventos_c/cargue-eventos-div/cargue-eventos-div.component';
import { MapaDigitalComponent } from './componentes/cuerpo/eventos_c/mapa-digital/mapa-digital.component';
import { ListadoEventosComponent } from './componentes/cuerpo/eventos_c/listado-eventos/listado-eventos.component';
import { ComponenteInfComponent } from './componentes/cuerpo/eventos_c/componente-inf/componente-inf.component';
import { MapaService } from './servicios_generales/mapa/mapa.service';
import { MapaComponent } from './componentes/cuerpo/eventos_c/mapa/mapa.component';
import { CreacionUserComponent } from './componentes/cuerpo/usuarios/creacion-user/creacion-user.component';
import { PermisosUserComponent } from './componentes/cuerpo/usuarios/permisos-user/permisos-user.component';
import { ListadosUserComponent } from './componentes/cuerpo/usuarios/listados-user/listados-user.component';
import { ContraseniaUserComponent } from './componentes/cuerpo/usuarios/contrasenia-user/contrasenia-user.component';
import { CronometroService } from './servicios_generales/informacion/cronometro.service';
import { RecargaDirective } from './directive/recarga.directive';
import { PermisosService } from './servicios_generales/per_usuarios/permisos.service';
import { VerDocumentComponent } from './componentes/cuerpo/eventos_c/ver-document/ver-document.component';
import { SafePipe } from './safe.pipe';
import { RutasService } from './servicios_generales/mapa/rutas.service';
import {PointServiceService} from './servicios_generales/mapa/point-service.service'

import { NovedadesPersonalComponent } from './componentes/cuerpo/novedades-personal/anexo_1/anexo_1_creacion/novedades-personal.component';
import { AlertasIngresoComponent } from './componentes/cuerpo/alertas/alertas-ingreso/alertas-ingreso.component';
import { AlertasListadoComponent } from './componentes/cuerpo/alertas/alertas-listado/alertas-listado.component';
import { AlertasEditarComponent } from './componentes/cuerpo/alertas/alertas-editar/alertas-editar.component';
import { AlertasPlanillaComponent } from './componentes/cuerpo/alertas/alertas-planilla./alertas-planilla..component';
import { GraficasAlertasComponent } from './componentes/cuerpo/alertas/graficas-alertas/graficas-alertas.component';
import { MapaAlertasComponent } from './componentes/cuerpo/alertas/mapa-alertas/mapa-alertas.component';
import { IngresoComponent } from './componentes/cuerpo/inventarios/ingreso/ingreso.component';
import { IngresoPersonalComponent } from './componentes/cuerpo/personal/ingreso-personal/ingreso-personal.component';
import { ListadoPersonalComponent } from './componentes/cuerpo/personal/listado-personal/listado-personal.component';
import { VerEditarComponent } from './componentes/cuerpo/personal/ver-editar/ver-editar.component';
import { EditarAlertaComponent } from './componentes/cuerpo/alertas/editar-alerta/editar-alerta.component';
import { CargosComponent } from './componentes/cuerpo/personal/cargos/cargos.component';
import { ListadosComponent } from './componentes/cuerpo/inventarios/listados/listados.component';
import { DetalleInventarioComponent } from './componentes/cuerpo/inventarios/detalle-inventario/detalle-inventario.component';
import { VerDocumentoComponent } from './componentes/cuerpo/inventarios/ver-documento/ver-documento.component';
import { ListadosAnexo1Component } from './componentes/cuerpo/novedades-personal/anexo_1/listados-anexo1/listados-anexo1.component';
import { EstadisticaAnexo1Component } from './componentes/cuerpo/novedades-personal/anexo_1/estadistica-anexo1/estadistica-anexo1.component';
import { CargueResaltantesComponent } from './componentes/cuerpo/estadistica_c/cargue-resaltantes/cargue-resaltantes.component';
import { MapaResultadosComponent } from './componentes/cuerpo/estadistica_c/mapa-resultados/mapa-resultados.component';
import { IngresoAetcrComponent } from './componentes/cuerpo/atcr/ingreso-aetcr/ingreso-aetcr.component';
import { ListadosAetcrComponent } from './componentes/cuerpo/atcr/listados-aetcr/listados-aetcr.component';
import { InformacionAetcrComponent } from './componentes/cuerpo/atcr/informacion-aetcr/informacion-aetcr.component';
import { PelotonesAetcrComponent } from './componentes/cuerpo/atcr/pelotones-aetcr/pelotones-aetcr.component';
import { NieveComponent } from './componentes/cuerpo/menu/nieve/nieve.component';
import { MapaAetcrComponent } from './componentes/cuerpo/atcr/mapa-aetcr/mapa-aetcr.component';
import { PlazosSinAsignarComponent } from './componentes/cuerpo/plazos/plazos-sin-asignar/plazos-sin-asignar.component';
import { PlazosAsignadosComponent } from './componentes/cuerpo/plazos/plazos-asignados/plazos-asignados.component';
import { PlazosCumplidosComponent } from './componentes/cuerpo/plazos/plazos-cumplidos/plazos-cumplidos.component';
import { SegundoCdteComponent } from './componentes/cuerpo/plazos/segundo-cdte/segundo-cdte.component';
import { ValidacionPlazosComponent } from './componentes/cuerpo/plazos/validacion-plazos/validacion-plazos.component';
import { IngresoMedallasComponent } from './componentes/cuerpo/medallas/ingreso-medallas/ingreso-medallas.component';
import { PlazosConRespuestaComponent } from './componentes/cuerpo/plazos/plazos-con-respuesta/plazos-con-respuesta.component';
import { ListadoMedallasComponent } from './componentes/cuerpo/medallas/listado-medallas/listado-medallas.component';
import { CalendarioPlazosComponent } from './componentes/cuerpo/plazos/calendario-plazos/calendario-plazos.component';
import { ReporteInsitopComponent } from './componentes/cuerpo/insitop/reporte-insitop/reporte-insitop.component';
import { CargueInsitopComponent } from './componentes/cuerpo/insitop/cargue-insitop/cargue-insitop.component';
import { GraficasInsitopComponent } from './componentes/cuerpo/insitop/graficas-insitop/graficas-insitop.component';
import { GraficasInsitopEstadoMayorComponent } from './componentes/cuerpo/insitop/graficas-insitop-estado-mayor/graficas-insitop-estado-mayor.component';
import { PasosFronterizosComponent } from './componentes/cuerpo/dicte/pasos-fronterizos/pasos-fronterizos.component';
import { PasosFronterizosCargueComponent } from './componentes/cuerpo/dicte/pasos-fronterizos-cargue/pasos-fronterizos-cargue.component';
import { GuardarEventosRelevantesComponent } from './componentes/cuerpo/eventos_relevantes/guardar-eventos-relevantes/guardar-eventos-relevantes.component';
import { VerEventosRelevantesComponent } from './componentes/cuerpo/eventos_relevantes/ver-eventos-relevantes/ver-eventos-relevantes.component';
import { VerBitacoraComponent } from './componentes/cuerpo/eventos_relevantes/ver-bitacora/ver-bitacora.component';
import { PlanillaMovimientoComponent } from './componentes/cuerpo/moviminetos/planilla-movimiento/planilla-movimiento.component';
import { ResgitroUnidadSolictanteComponent } from './componentes/cuerpo/moviminetos/resgitro-unidad-solictante/resgitro-unidad-solictante.component';
import { RegsitroPlanillaMovimientoComponent } from './componentes/cuerpo/moviminetos/regsitro-planilla-movimiento/regsitro-planilla-movimiento.component';
import { CrearPlanillaMovimientoComponent } from './componentes/cuerpo/moviminetos/crear-planilla-movimiento/crear-planilla-movimiento.component';
import { CrearFirmasPlnaillaMovimientosComponent } from './componentes/cuerpo/moviminetos/crear-firmas-plnailla-movimientos/crear-firmas-plnailla-movimientos.component';
import { PelotonesComponent } from './componentes/cuerpo/insitop/pelotones/pelotones.component';
import { SubMenuInsitopComponent } from './componentes/cuerpo/insitop/sub-menu-insitop/sub-menu-insitop.component';
import { BoletinMmenuComponent } from './componentes/cuerpo/boletin_dirop/boletin-mmenu/boletin-mmenu.component';
import { BoletinComponent } from './componentes/cuerpo/boletin_dirop/boletin/boletin.component';
import { AnotacionesBoletinComponent } from './componentes/cuerpo/boletin_dirop/anotaciones-boletin/anotaciones-boletin.component';
import { ListadoAnotacionesComponent } from './componentes/cuerpo/boletin_dirop/listado-anotaciones/listado-anotaciones.component';
import { RegistroQ5Component } from './componentes/cuerpo/q5/registro-q5/registro-q5.component';
import { DescargarQ5AfectacionesComponent } from './componentes/cuerpo/q5/descargar-q5-afectaciones/descargar-q5-afectaciones.component';
import { DescargarQ5MenuComponent } from './componentes/cuerpo/q5/descargar-q5-menu/descargar-q5-menu.component';
import { DescargarQ5ListadoComponent } from './componentes/cuerpo/q5/descargar-q5-listado/descargar-q5-listado.component';
import { CuerpoDasResultadosComponent } from './componentes/cuerpo/estadistica_c/cuerpo-das-resultados/cuerpo-das-resultados.component';
import { MenuDasResultadosComponent } from './componentes/cuerpo/estadistica_c/menu-das-resultados/menu-das-resultados.component';
import { UnidadesYFiltrosComponent } from './componentes/cuerpo/estadistica_c/unidades-y-filtros/unidades-y-filtros.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { SubregionesComponent } from './componentes/cuerpo/estadistica_c/subregiones/subregiones.component';
import { SubirUnidadComponent } from './componentes/cuerpo/insitop/subir-unidad/subir-unidad.component';
import { CalcularOperacionesComponent } from './componentes/cuerpo/insitop/calcular-operaciones/calcular-operaciones.component';
import { UnidadesSinCargarComponent } from './componentes/cuerpo/insitop/unidades-sin-cargar/unidades-sin-cargar.component';
import { UnidadesAisladasComponent } from './componentes/cuerpo/insitop/unidades-aisladas/unidades-aisladas.component';
import '@geoman-io/leaflet-geoman-free';
import { UnidadesCercanasComponent } from './componentes/cuerpo/insitop/unidades-cercanas/unidades-cercanas.component';
import { UnidadesResumenComponent } from './componentes/cuerpo/insitop/unidades-resumen/unidades-resumen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // solo importa, no necesitas asignarlo


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReportesCargueElecionesComponent } from './componentes/cuerpo/dicte/reportes-cargue-eleciones/reportes-cargue-eleciones.component';
import { FilterUsuariosPipe } from './servicios_generales/pipes/filter-usuarios.pipe';
import { FiltroPlazosPipe } from './servicios_generales/pipes/filtros-plazos.pipe'; 
import { ToastrModule } from 'ngx-toastr';
import { FiltroCamposPipe } from './pipes/filtro-campos.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { DashboardComponent } from './componentes/cuerpo/estadistica_c/dashboard/dashboard.component';
import { GestionDatosComponent } from './componentes/cuerpo/estadistica_c/gestion-datos/gestion-datos.component';
import { NarcotraficoNewComponent } from './componentes/cuerpo/estadistica_c/narcotrafico-new/narcotrafico-new.component';
import { IngresoQ5DipseComponent } from './componentes/cuerpo/novedades-personal/ingreso-q5-dipse/ingreso-q5-dipse.component';
import { ListadoEventosCenmDiateComponent } from './componentes/cuerpo/cenam/diate/listado-eventos-cenm-diate/listado-eventos-cenm-diate.component';



const appRoutes:Routes=[
  {path:'', component:LoguinComponent},
  {path:'cuerpo', component:CuerpoComponent, canActivate:[authGuard]},

  {path:'estadistica_pdf', component:EstadisticaPdfComponent,  canActivate:[authGuard]},
  {path:'cargue_eventos_div', component:CargueEventosDivComponent,  canActivate:[authGuard]},
  {path:'listado_eventos', component:ListadoEventosComponent,  canActivate:[authGuard]},
  {path:'inf_event', component:ComponenteInfComponent,  canActivate:[authGuard]},
  {path:'mapa_eventos', component:MapaComponent,  canActivate:[authGuard]},
  {path:'creacion_usurio', component:CreacionUserComponent,  canActivate:[authGuard]},
  {path:'listado_usuarios', component:ListadosUserComponent,  canActivate:[authGuard]},
  {path:'cambio_contrasenia', component:ContraseniaUserComponent,  canActivate:[authGuard]},
  {path:'permisos_user', component:PermisosUserComponent,  canActivate:[authGuard]},
  {path:'ver_document', component:VerDocumentComponent,  canActivate:[authGuard]},
  {path:'anexo_1', component:NovedadesPersonalComponent,  canActivate:[authGuard]},
  {path:'alertas_ingreso', component:AlertasIngresoComponent,  canActivate:[authGuard]},
  {path:'alertas_listados', component:AlertasListadoComponent,  canActivate:[authGuard]},
  {path:'alertas_editar', component:AlertasEditarComponent,  canActivate:[authGuard]},
  {path:'planilla_alertas', component:AlertasPlanillaComponent,  canActivate:[authGuard]},
  {path:'graficas_alertas', component:GraficasAlertasComponent,  canActivate:[authGuard]},
  {path:'mapa_alertas', component:MapaAlertasComponent,  canActivate:[authGuard]},
  {path:'ingreso_inventarios', component:IngresoComponent,  canActivate:[authGuard]},
  {path:'ingreso_personal', component:IngresoPersonalComponent,  canActivate:[authGuard]},
  {path:'listado_personal', component:ListadoPersonalComponent,  canActivate:[authGuard]},
  {path:'ver_informacon_personal', component:VerEditarComponent,  canActivate:[authGuard]},
  {path:'editar_alerta', component:EditarAlertaComponent,  canActivate:[authGuard]},
  {path:'listado_inventarios', component:ListadosComponent,  canActivate:[authGuard]},
  {path:'detalle_intentario', component:DetalleInventarioComponent,  canActivate:[authGuard]},
  {path:'listado_anexo_1', component:ListadosAnexo1Component,  canActivate:[authGuard]},
  {path:'estadistica_anexo_1', component:EstadisticaAnexo1Component,  canActivate:[authGuard]},
  {path:'eventos_resaltantes_boletin', component:CargueResaltantesComponent,  canActivate:[authGuard]},
  {path:'mapa_resultados', component:MapaResultadosComponent,  canActivate:[authGuard]},
  {path:'ingreso_aetcr', component:IngresoAetcrComponent,  canActivate:[authGuard]},
  {path:'listado_aetcr', component:ListadosAetcrComponent,  canActivate:[authGuard]},
  {path:'informacion_aetcr_e', component:InformacionAetcrComponent,  canActivate:[authGuard]},
  {path:'peloton_aetcr', component:PelotonesAetcrComponent,  canActivate:[authGuard]},
  {path:'mapa_aetcr', component:MapaAetcrComponent,  canActivate:[authGuard]},
  {path:'plasos_sin_asignar', component:PlazosSinAsignarComponent,  canActivate:[authGuard]},
  {path:'plasos_signados', component:PlazosAsignadosComponent,  canActivate:[authGuard]},
  {path:'plasos_cumplidos', component:PlazosCumplidosComponent,  canActivate:[authGuard]},
  {path:'plazos_cdte', component:SegundoCdteComponent,  canActivate:[authGuard]},
  {path:'validacion_plazos', component:ValidacionPlazosComponent,  canActivate:[authGuard]},
  {path:'ingreso_medallas', component:IngresoMedallasComponent,  canActivate:[authGuard]},
  {path:'seguimiento_plazos_c', component:PlazosConRespuestaComponent,  canActivate:[authGuard]},
  {path:'listado_medallas', component:ListadoMedallasComponent,  canActivate:[authGuard]},
  {path:'CalendarioPlazosComponent', component:CalendarioPlazosComponent,  canActivate:[authGuard]},
  {path:'informacion_insitop', component:SubMenuInsitopComponent,  canActivate:[authGuard]},
  {path:'GraficasInsitopComponent', component:GraficasInsitopComponent,  canActivate:[authGuard]},
  {path:'GraficasInsitopEstadoMayorComponent', component:GraficasInsitopEstadoMayorComponent,  canActivate:[authGuard]},
  {path:'PasosFronterizosComponent', component:PasosFronterizosComponent,  canActivate:[authGuard]},
  {path:'GuardarEventosRelevantesComponent', component:GuardarEventosRelevantesComponent,  canActivate:[authGuard]},
  {path:'VerEventosRelevantesComponent', component:VerEventosRelevantesComponent,  canActivate:[authGuard]},
  {path:'VerBitacoraComponent', component:VerBitacoraComponent,  canActivate:[authGuard]},
  {path:'PlanillaMovimientoComponent', component:PlanillaMovimientoComponent,  canActivate:[authGuard]},
  {path:'BoletinDirop', component:BoletinMmenuComponent,  canActivate:[authGuard]},
  {path:'Boletin_registro_Dirop', component:BoletinComponent,  canActivate:[authGuard]},
  {path:'anotaciones_dirop_bol', component:AnotacionesBoletinComponent,  canActivate:[authGuard]},
  {path:'ListadoAnotacionesComponent', component:ListadoAnotacionesComponent,  canActivate:[authGuard]},
  {path:'RegistroQ5Component', component:RegistroQ5Component,  canActivate:[authGuard]},
  {path:'DescargarQ5MenuComponent', component:DescargarQ5MenuComponent,  canActivate:[authGuard]},
  {path:'das_res_ejc', component:CuerpoDasResultadosComponent,  canActivate:[authGuard]},
  {path:'UnidadesYFiltrosComponent', component:UnidadesYFiltrosComponent,  canActivate:[authGuard]},
  {path:'SubregionesComponent', component:SubregionesComponent,  canActivate:[authGuard]},
  {path:'ReportesCargueElecionesComponent', component:ReportesCargueElecionesComponent,  canActivate:[authGuard]},
  {path:'GestionDatosComponent', component:GestionDatosComponent,  canActivate:[authGuard]},
  {path:'DashboardComponent', component:DashboardComponent,  canActivate:[authGuard]},
  {path:'NarcotraficoNewComponent', component:NarcotraficoNewComponent,  canActivate:[authGuard]},

  {path:'IngresoQ5DipseComponent', component:IngresoQ5DipseComponent,  canActivate:[authGuard]},
   {path:'ListadoEventosCenmDiateComponent', component:ListadoEventosCenmDiateComponent,  canActivate:[authGuard]},


  
]

@NgModule({
  declarations: [
    AppComponent,
    LoguinComponent,
    CuerpoComponent,
    MenuComponent,
    EstadisticaExcelComponent,
    EstadisticaPdfComponent,
    SpinerComponent,
    CargueEventosDivComponent,
    MapaDigitalComponent,
    ListadoEventosComponent,
    ComponenteInfComponent,
    MapaComponent,
    CreacionUserComponent,
    PermisosUserComponent,
    ListadosUserComponent,
    ContraseniaUserComponent,
    RecargaDirective,
    VerDocumentComponent,
    SafePipe,
    NovedadesPersonalComponent,
    AlertasIngresoComponent,
    AlertasListadoComponent,
    AlertasEditarComponent,
    AlertasPlanillaComponent,
    GraficasAlertasComponent,
    MapaAlertasComponent,
    IngresoComponent,
    IngresoPersonalComponent,
    ListadoPersonalComponent,
    VerEditarComponent,
    EditarAlertaComponent,
    CargosComponent,
    ListadosComponent,
    DetalleInventarioComponent,
    VerDocumentoComponent,
    ListadosAnexo1Component,
    EstadisticaAnexo1Component,
    CargueResaltantesComponent,
    MapaResultadosComponent,
    IngresoAetcrComponent,
    ListadosAetcrComponent,
    InformacionAetcrComponent,
    PelotonesAetcrComponent,
    NieveComponent,
    MapaAetcrComponent,
    PlazosSinAsignarComponent,
    PlazosAsignadosComponent,
    PlazosCumplidosComponent,
    SegundoCdteComponent,
    ValidacionPlazosComponent,
    IngresoMedallasComponent,
    PlazosConRespuestaComponent,
    ListadoMedallasComponent,
    CalendarioPlazosComponent,
    ReporteInsitopComponent,
    CargueInsitopComponent,
    GraficasInsitopComponent,
    GraficasInsitopEstadoMayorComponent,
    PasosFronterizosComponent,
    PasosFronterizosCargueComponent,
    GuardarEventosRelevantesComponent,
    VerEventosRelevantesComponent,
    VerBitacoraComponent,
    PlanillaMovimientoComponent,
    ResgitroUnidadSolictanteComponent,
    RegsitroPlanillaMovimientoComponent,
    CrearPlanillaMovimientoComponent,
    CrearFirmasPlnaillaMovimientosComponent,
    PelotonesComponent,
    SubMenuInsitopComponent,
    BoletinMmenuComponent,
    BoletinComponent,
    AnotacionesBoletinComponent,
    ListadoAnotacionesComponent,
    RegistroQ5Component,
    DescargarQ5AfectacionesComponent,
    DescargarQ5MenuComponent,
    DescargarQ5ListadoComponent,
    CuerpoDasResultadosComponent,
    MenuDasResultadosComponent,
    UnidadesYFiltrosComponent,
    SubregionesComponent,
    SubirUnidadComponent,
    CalcularOperacionesComponent,
    UnidadesSinCargarComponent,
    UnidadesAisladasComponent,
    UnidadesCercanasComponent,
    UnidadesResumenComponent,
    ReportesCargueElecionesComponent,
    FilterUsuariosPipe,
    FiltroPlazosPipe,
    FiltroCamposPipe,
    HighlightPipe,
    DashboardComponent,
    GestionDatosComponent,
    NarcotraficoNewComponent,
    IngresoQ5DipseComponent,
    ListadoEventosCenmDiateComponent,


  ],
  imports: [
CommonModule,
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  DragDropModule,
  HttpClientModule,  
  ReactiveFormsModule,
  RouterModule.forRoot(appRoutes),
  BrowserAnimationsModule,
     BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
     BrowserAnimationsModule, // 🔹 Necesario para las animaciones de Toastr
    ToastrModule.forRoot({   // 🔹 Configuración global del servicio
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: true,
    }),

  ],
  
  providers: [CookieService, SelectoresService, ServiceConecionService, MapaService, CronometroService,ListadosUserComponent, PermisosService,RutasService,PointServiceService, 
  {
    provide: HTTP_INTERCEPTORS, 
    useClass: TokenInterceptor, 
    multi:true
  }
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
