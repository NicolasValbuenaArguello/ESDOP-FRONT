import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Moon } from 'lunarphase-js';

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  // Permisos
  resultados = false;
  boltin_dirop = false;
  datos = false;
  eventos_c = false;
  per_usuarios = false;
  per_select = false;
  per_insert = false;
  afectaciones_fuera_combate = false;
  alerta = false;
  movimientos = false;
  inventarios = false;
  personal = false;
  resaltantes_boletin_per_menu = false;
  aetcr_permiso = false;
  ingreso_aetcr_permiso = false;
  listado_aetcr_permiso = false;
  plazos_permiso = false;
  asignacion_plazo = false;
  reasignacion_plazo = false;
  validacion_plaz = false;
  creacion_plazo = false;
  cumplimiento_plazo = false;
  medallas_permiso = false;
  seguimineto_plazos_respueta_per = false;
  insitop_per_per = false;
  cargue_insitop_per = false;
  estadistica_insitop_per = false;
  dicte_per = false;
  dicte_pasos_fronterizos_per = false;
  eventos_relevantes_per = false;
  registro_Q5_per = false;

  // Luna y usuario
  porcentaje_luna: string = '';
  fultimo_registro: string = ''
  actualizacionTexto: string = ''
  luna: string = '';
  foto: string = '';
  use: string = '';

  collapsed = false;

  @Input() usuario_loguin: string = '';

  menus: any[] = [];

  constructor(
    private cookie: CookieService,
    private router: Router,
    private cronometro: AppComponent
  ) { }

  ngOnInit(): void {


    this.foto = 'http://172.22.2.36:5198' + this.cookie.get('foto');
    this.use = this.cookie.get('fullname') || 'Usuario';
    this.porcentaje_luna = JSON.parse(sessionStorage.getItem("porcentaje_luna")!)

    
const registroStr = sessionStorage.getItem("fultimo_registro");

if (registroStr) {
  let parsed = null;
  try {
    parsed = JSON.parse(registroStr);
    if (typeof parsed === 'string') {
      parsed = JSON.parse(parsed);
    }

    this.fultimo_registro = parsed;

    const descripcion = this.fultimo_registro[0][1];  // 'Datos Actualizados'
    const fechaISO = this.fultimo_registro[0][2];     // '2025-07-24T18:52:41.937972'
    const fecha = new Date(fechaISO);

    console.log('typeof fechaISO:', typeof fechaISO);
    console.log('valor fechaISO:', fechaISO);
    console.log('fecha:', fecha.toString());

    if (!isNaN(fecha.getTime())) {
const opcionesFecha: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
};

const opcionesHora: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
};


      const fechaStr = fecha.toLocaleDateString('es-ES', opcionesFecha);
      const horaStr = fecha.toLocaleTimeString('es-ES', opcionesHora);

      this.actualizacionTexto = `Los datos de los resultados operacionales fueron actualizados el ${fechaStr} a las ${horaStr}.`
;
    } else {
      this.actualizacionTexto = 'Fecha inválida';
    }
  } catch (e) {
    console.error("Error parseando fultimo_registro:", e);
    this.actualizacionTexto = 'Error al procesar fecha';
  }
} else {
  this.actualizacionTexto = 'No hay datos de actualización';
}


    const date = new Date();
    const phase = Moon.lunarPhase(date);

    this.luna = phase + ".png"


    // Lógica del menú y permisos
    this.menus = [
      {
        label: 'Inicio',
        icono: 'bi bi-house-door',
        permiso: true,
        activo: false,
        subItems: [
          { label: 'Inicio', route: '/cuerpo', permiso: true, icono: 'bi bi-house' },
        ],
      },
      {
        label: 'Estadística',
        icono: 'bi bi-bar-chart',
        permiso: this.validarPermiso('resultados'),
        activo: false,
        subItems: [
          { label: 'Datos', route: '/GestionDatosComponent', permiso: this.validarPermiso('datos'), icono: 'bi bi-graph-up' },
          { label: 'PDF', route: '/estadistica_pdf', permiso: this.validarPermiso('resultados'), icono: 'bi bi-file-earmark-pdf' },
          { label: 'Mimería', route: '/DashboardComponent', permiso: this.validarPermiso('resultados'), icono: 'bi bi-minecart-loaded' },
          { label: 'Narcotráfico', route: '/NarcotraficoNewComponent', permiso: this.validarPermiso('resultados'), icono: 'bi bi-tree' },
          
          { label: 'Regiones', route: '/SubregionesComponent', permiso: this.validarPermiso('configuracion_especial_res_per'), icono: 'bi bi-globe-americas' },

          { label: 'Dash', route: '/das_res_ejc', permiso: this.validarPermiso('resultados'), icono: 'bi bi-speedometer2' },
          { label: 'Resultados Boletín', route: '/eventos_resaltantes_boletin', permiso: this.validarPermiso('resaltantes_boletin_per_menu'), icono: 'bi bi-journal-check' },
        ],
      },
      {
        label: 'Boletín',
        icono: 'bi bi-journal-text',
        permiso: this.validarPermiso('boltin_dirop'),
        activo: false,
        subItems: [
          { label: 'Boletín OPE.', route: '/BoletinDirop', permiso: this.validarPermiso('boltin_dirop'), icono: 'bi bi-journal' },
        ],
      },
      {
        label: 'Q5',
        icono: 'bi bi-chat-dots',
        permiso: this.validarPermiso('registro_Q5_per'),
        activo: false,
        subItems: [
          { label: 'CARGUE INF.', route: '/RegistroQ5Component', permiso: this.validarPermiso('registro_Q5_per'), icono: 'bi bi-upload' },
          { label: 'MENÚ.', route: '/DescargarQ5MenuComponent', permiso: this.validarPermiso('registro_Q5_per'), icono: 'bi bi-list' },
        ],
      },
      {
        label: 'Eventos Relevantes',
        icono: 'bi bi-calendar-event',
        permiso: this.validarPermiso('eventos_relevantes_per'),
        activo: false,
        subItems: [
          { label: 'CARGUE INF.', route: '/GuardarEventosRelevantesComponent', permiso: this.validarPermiso('eventos_relevantes_per'), icono: 'bi bi-cloud-upload' },
          { label: 'EVENTOS.', route: '/VerEventosRelevantesComponent', permiso: this.validarPermiso('eventos_relevantes_per'), icono: 'bi bi-calendar2-week' },
        ],
      },
      {
        label: 'INSITOP',
        icono: 'bi bi-map',
        permiso: this.validarPermiso('insitop_per_per'),
        activo: false,
        subItems: [
          { label: 'INSITOP', route: '/informacion_insitop', permiso: this.validarPermiso('estadistica_insitop_per'), icono: 'bi bi-geo-alt' },
        ],
      },
      {
        label: 'DICTE',
        icono: 'bi bi-diagram-3',
        permiso: this.validarPermiso('dicte_per'),
        activo: false,
        subItems: [
          { label: 'Pasos Fronterizos', route: '/PasosFronterizosComponent', permiso: this.validarPermiso('dicte_pasos_fronterizos_per'), icono: 'bi bi-signpost-split' },
          { label: 'Reporte Eleciones', route: '/ReportesCargueElecionesComponent', permiso: this.validarPermiso('dicte_pasos_fronterizos_per'), icono: 'bi-card-checklist' },
        ],
      },
      
      {
        label: 'Eventos DIV',
        icono: 'bi bi-calendar2-event',
        permiso: this.validarPermiso('eventos_c'),
        activo: false,
        subItems: [
          { label: 'CARGUE', route: '/cargue_eventos_div', permiso: this.validarPermiso('per_insert'), icono: 'bi bi-cloud-upload' },
          { label: 'LISTADO', route: '/listado_eventos', permiso: this.validarPermiso('per_select'), icono: 'bi bi-list-check' },
          { label: 'MAPA', route: '/mapa_eventos', permiso: this.validarPermiso('per_select'), icono: 'bi bi-map' },
        ],
      },
      {
        label: 'Fuera de Combate',
        icono: 'bi bi-exclamation-diamond',
        permiso: this.validarPermiso('afectaciones_fuera_combate'),
        activo: false,
        subItems: [
          { label: 'Q5', route: '/IngresoQ5DipseComponent', permiso: true, icono: 'bi bi-file-earmark-text' },
          { label: 'ANEXO 1 (M)', route: '/anexo_1', permiso: true, icono: 'bi bi-file-earmark-text' },
          { label: 'LIST. ANEXO 1', route: '/listado_anexo_1', permiso: true, icono: 'bi bi-list-ul' },
          { label: 'ESTADÍSTICA', route: '/estadistica_anexo_1', permiso: true, icono: 'bi bi-bar-chart-line' },
        ],
      },
      {
        label: 'Alertas',
        icono: 'bi bi-exclamation-triangle',
        permiso: this.validarPermiso('alerta'),
        activo: false,
        subItems: [
          { label: 'Registrar', route: '/alertas_ingreso', permiso: true, icono: 'bi bi-pencil-square' },
          { label: 'Listados', route: '/alertas_listados', permiso: true, icono: 'bi bi-card-list' },
          { label: 'Planilla.', route: '/planilla_alertas', permiso: true, icono: 'bi bi-table' },
        ],
      },
      {
        label: 'Medallas',
        icono: 'bi bi-award',
        permiso: this.validarPermiso('medallas_permiso'),
        activo: false,
        subItems: [
          { label: 'Registro', route: '/ingreso_medallas', permiso: true, icono: 'bi bi-plus-circle' },
          { label: 'Listados', route: '/listado_medallas', permiso: true, icono: 'bi bi-card-checklist' },
        ],
      },
      {
        label: 'Plazos',
        icono: 'bi bi-clock-history',
        permiso: this.validarPermiso('plazos_permiso'),
        activo: false,
        subItems: [
          { label: 'SIN ASIGNAR', route: '/plasos_sin_asignar', permiso: this.validarPermiso('asignacion_plazo'), icono: 'bi bi-alarm' },
          { label: 'ASIGNADOS', route: '/plasos_signados', permiso: true, icono: 'bi bi-check2-circle' },
          { label: 'TRATEN CONMIGO', route: '/seguimiento_plazos_c', permiso: this.validarPermiso('seguimineto_plazos_respueta_per'), icono: 'bi bi-person-lines-fill' },
          { label: 'CREACIÓN ORDENES', route: '/plazos_cdte', permiso: this.validarPermiso('creacion_plazo'), icono: 'bi bi-file-earmark-plus' },
          { label: 'VALIDACIÓN', route: '/validacion_plazos', permiso: this.validarPermiso('validacion_plaz'), icono: 'bi bi-patch-check' },
          { label: 'CUMPLIDOS', route: '/plasos_cumplidos', permiso: this.validarPermiso('creacion_plazo'), icono: 'bi bi-check-circle' },
          { label: 'CALENDARIO', route: '/CalendarioPlazosComponent', permiso: true, icono: 'bi bi-calendar-range' },
        ],
      },
      {
        label: 'AETCR',
        icono: 'bi bi-house-check',
        permiso: this.validarPermiso('aetcr_permiso'),
        activo: false,
        subItems: [
          { label: 'Creación', route: '/ingreso_aetcr', permiso: this.validarPermiso('ingreso_aetcr_permiso'), icono: 'bi bi-file-plus' },
          { label: 'Listados', route: '/listado_aetcr', permiso: true, icono: 'bi bi-list-task' },
          { label: 'Mapa', route: '/mapa_aetcr', permiso: true, icono: 'bi bi-map-fill' },
        ],
      },
            {
        label: 'CENAM',
        icono: 'bi bi-house-check',
        permiso: this.validarPermiso('aetcr_permiso'),
        activo: false,
        subItems: [
          { label: 'Creación', route: '/ListadoEventosCenmDiateComponent', permiso: this.validarPermiso('ingreso_aetcr_permiso'), icono: 'bi bi-file-plus' },
          { label: 'Mapa', route: '/ListadoEventosCenmDiateComponent', permiso: true, icono: 'bi bi-map-fill' },
        ],
      },
      
      {
        label: 'Movimientos',
        icono: 'bi bi-truck',
        permiso: this.validarPermiso('movimientos'),
        activo: false,
        subItems: [
          { label: 'Planilla', route: '/PlanillaMovimientoComponent', permiso: true, icono: 'bi bi-table' },
        ],
      },
      {
        label: 'Inventarios',
        icono: 'bi bi-box',
        permiso: this.validarPermiso('inventarios'),
        activo: false,
        subItems: [
          { label: 'Ingreso', route: '/ingreso_inventarios', permiso: true, icono: 'bi bi-box-arrow-in-down' },
          { label: 'Listado', route: '/listado_inventarios', permiso: true, icono: 'bi bi-boxes' },
        ],
      },
      {
        label: 'Personal',
        icono: 'bi bi-person-badge',
        permiso: this.validarPermiso('personal'),
        activo: false,
        subItems: [
          { label: 'Ingreso', route: '/ingreso_personal', permiso: true, icono: 'bi bi-person-plus' },
          { label: 'Listado', route: '/listado_personal', permiso: true, icono: 'bi bi-person-lines-fill' },
        ],
      },
      {
        label: 'Usuarios',
        icono: 'bi bi-people',
        permiso: this.validarPermiso('per_usuarios'),
        activo: false,
        subItems: [
          { label: 'Creación', route: '/creacion_usurio', permiso: true, icono: 'bi bi-person-add' },
          { label: 'Listado', route: '/listado_usuarios', permiso: true, icono: 'bi bi-people-fill' },
          { label: 'Contraseña', route: '/cambio_contrasenia', permiso: this.validarPermiso('cambio_contrasenia'), icono: 'bi-shield-lock-fill' },
        ],
      },
      {
        label: 'Cambio Contraseña',
        icono: 'bi-shield-lock-fill',
        permiso: this.validarPermiso('cambio_contrasenia'),
        activo: false,
        subItems: [

          { label: 'Contraseña', route: '/cambio_contrasenia', permiso: true, icono: 'bi-key-fill' },
        ],
      }

    ];

    // Restaurar menú activo
    const menuActivo = sessionStorage.getItem('menuActivo');
    const subItemActivo = sessionStorage.getItem('subItemActivo');

    if (menuActivo) {
      const menu = this.menus.find(m => m.label === menuActivo);
      if (menu) menu.activo = true;
    }

    // Restaurar estado de menú colapsado
    const colapsado = localStorage.getItem('menuCollapsed');
    this.collapsed = colapsado === 'true';
  }

  validarPermiso(clave: string): boolean {
    const valor = this.cookie.get(clave);
    return valor === 'true' || valor === '1';
  }

  activarMenu(menu: any) {
    menu.activo = !menu.activo;

    if (menu.activo) {
      sessionStorage.setItem('menuActivo', menu.label);
    } else {
      sessionStorage.removeItem('menuActivo');
    }
  }

  activarSubmenu(ruta: string) {
    sessionStorage.setItem('subItemActivo', ruta);
  }

  toggleMenu() {
    this.collapsed = !this.collapsed;
    localStorage.setItem('menuCollapsed', this.collapsed.toString());
  }

  ngAfterViewInit(): void {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((el) => new bootstrap.Tooltip(el));
  }

  salir(): void {
    this.cookie.deleteAll('/');
    this.cookie.deleteAll();
    localStorage.clear();
    sessionStorage.clear();

    if (this.cronometro && typeof this.cronometro._handleResetClick === 'function') {
      this.cronometro._handleResetClick();
    }

    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }
}