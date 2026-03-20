import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { PermisosService } from 'src/app/servicios_generales/per_usuarios/permisos.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';

@Component({
  selector: 'app-plazos-cumplidos',
  templateUrl: './plazos-cumplidos.component.html',
  styleUrls: ['./plazos-cumplidos.component.css']
})
export class PlazosCumplidosComponent implements OnInit {

  // =======================
  // 📌 Variables principales
  // =======================
  lis_plasos_asignados: {} = JSON.parse(sessionStorage.getItem("plazos_asignados") || '{}');
  lis_usuarios: {} = JSON.parse(sessionStorage.getItem("listado_personal") || '{}');

  plazos_asigandos_dirop: any[] = [];
  listado_usurios: any[] = [];
  cantidad: number = 0;

  formData = new FormData();
  inf_a: boolean = false;
  inf_c_g: string = "datos";
  inf_g: boolean = false;
  ver: boolean = false;
  server: string = "";

  // =======================
  // 📌 Buscador + Paginación
  // =======================
  filtro: string = "";
  pageSize: number = 10;       // Registros por página (10 / 25 / 50 / 100)
  currentPage: number = 1;     // Página actual
  totalPages: number = 1;      // Total de páginas calculadas

  constructor(
    private usuarios: SelectoresService,
    private router: Router,
    private permisos: PermisosService,
    private cookie: CookieService,
    private api_serve: ServiceConecionService,
        private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.listado_asignados();
    this.contar();
  }

  ngOnInit(): void {
    this.plazos_asigandos_dirop = this.usuarios.array_listados(this.lis_plasos_asignados);
    this.listado_usurios = this.usuarios.array_listados(this.lis_usuarios);
    this.contar();

    // ⚡ Datos simulados para pruebas de paginación
    // this.plazos_asigandos_dirop = Array.from({ length: 123 }, (_, i) => ({
    //   id: i + 1,
    //   nombre: `Plazo ${i + 1}`,
    //   estado: i % 2 === 0 ? "SI" : "NO"
    // }));
  }

  // =======================
  // 📌 Helpers reutilizables
  // =======================
  private showSpinner() {
    document.getElementById("espiner")?.classList.add("lds-spinner");
  }

  private hideSpinner() {
    document.getElementById("espiner")?.classList.remove("lds-spinner");
  }

  private actualizarSessionStorage(key: string, value: any[]) {
    try {
      const resumen = value.map((v: any) => ({
        id: v.id || v[0],
        cumplido: v[40] || "NO"
      }));
      sessionStorage.setItem(key, JSON.stringify(resumen));
      this.plazos_asigandos_dirop = value;
    } catch (e) {
      console.error("❌ Error guardando en sessionStorage:", e);
      this.plazos_asigandos_dirop = value;
    }
  }

  private manejarRespuesta(result: HttpResponse<any>, key: string) {
    Object.entries(result).forEach(([k, v]) => {
      if (k === key) this.actualizarSessionStorage(key, v as any[]);
    });
    this.inf_g = true;
    this.inf_a = false;
    this.hideSpinner();
  }

  private manejarError() {
    this.inf_a = true;
    this.inf_g = false;
    this.inf_c_g = "error de conexion";
    this.hideSpinner();
  }

  // =======================
  // 📌 Funciones de negocio
  // =======================
  contar() {
    this.cantidad = this.plazos_asigandos_dirop.filter(p => p[40] === "SI").length;
  }

  // Ver en nueva pestaña (rápido)
  ver_documento(documento: string) {
    const url = `http://172.22.2.36:5198${documento}`;
    window.open(encodeURI(url), '_blank', 'noopener');
  }

  // Alternativa: ver embebido seguro (iframe)


  // Descargar (robusto)
  downloadFile(documento: string, nombre: string) {
    const url = `http://172.22.2.36:5198${documento}`;
    this.http.get(url, { responseType: 'blob', withCredentials: true }).subscribe({
      next: (blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = nombre || 'download';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      },
      error: (err) => {
        console.error('Error al descargar', err);
      }
    });
  }

  listado_asignados() {
    this.formData.append("permiso", this.cookie.get("permiso"));
    this.formData.append("unidad", this.cookie.get("unidad"));
    this.showSpinner();
    this.api_serve.plazos_asignados(this.formData).subscribe({
      next: (res: HttpResponse<any>) => this.manejarRespuesta(res, "plazos_asignados"),
      error: () => this.manejarError()
    });
  }

  // =======================
  // 📌 Buscador + Paginación
  // =======================
  get listaFiltrada() {
    if (!this.filtro) return this.plazos_asigandos_dirop;
    const term = this.filtro.toLowerCase();
    return this.plazos_asigandos_dirop.filter(item =>
      (item[1] && item[1].toLowerCase().includes(term)) || // Orden
      (item[2] && item[2].toLowerCase().includes(term)) || // Responsable
      (item[43] && item[43].toLowerCase().includes(term))  // Observación
    );
  }

  get paginatedPlazos() {
    this.totalPages = Math.ceil(this.listaFiltrada.length / this.pageSize) || 1;
    const start = (this.currentPage - 1) * this.pageSize;
    return this.listaFiltrada.slice(start, start + this.pageSize);
  }

  get pageArray(): number[] {
    let pages: number[] = [];
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, this.currentPage + 2);

    if (this.currentPage <= 3) end = Math.min(5, this.totalPages);
    if (this.currentPage > this.totalPages - 3) start = Math.max(this.totalPages - 4, 1);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  changePageSize(size: number) {
    this.pageSize = +size;
    this.currentPage = 1;
  }
}
