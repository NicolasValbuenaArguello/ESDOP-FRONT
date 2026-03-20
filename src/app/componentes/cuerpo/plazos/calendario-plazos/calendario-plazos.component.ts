import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

interface PlazoAsignado {
  orfeo: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  responsable: string;
  estado: string;
  asunto: string;
  orden: string;
}

interface CeldaCalendario {
  dia: number | null;
  plazos: PlazoAsignado[];
}

@Component({
  selector: "app-calendario-plazos",
  templateUrl: "./calendario-plazos.component.html",
  styleUrls: ["./calendario-plazos.component.css"]
})
export class CalendarioPlazosComponent implements OnInit {
  // 📅 Variables del calendario
  meses: string[] = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];
  anios: number[] = [];
  mesSeleccionado: number = new Date().getMonth();
  anioSeleccionado: number = new Date().getFullYear();
  diasSemana: string[] = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

  calendario: CeldaCalendario[] = [];
  plazos: PlazoAsignado[] = [];

  // 📌 Modal
  modalVisible: boolean = false;
  modalDia: CeldaCalendario | null = null;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  ngOnInit(): void {
    // Rango de años (-2, actual, +3)
    const anioActual = new Date().getFullYear();
    this.anios = Array.from({ length: 6 }, (_, i) => anioActual - 2 + i);

    this.cargarPlazos();
  }

  // 🔹 Cargar plazos desde backend
  cargarPlazos(): void {
    const formData = new FormData();
    formData.append("permiso", this.cookie.get("permiso"));
    formData.append("unidad", this.cookie.get("unidad"));

    const espiner = document.getElementById("espiner");
    espiner?.classList.add("lds-spinner");

    this.http.post<any>(
      "http://172.22.2.36:5008/plazos_asignados_url",
      formData
    ).subscribe({
      next: (result) => {
        Object.entries(result).forEach(([key, value]) => {
          if (key === "plazos_asignados") {
            this.plazos = this.mapearPlazos(value as any[]).filter(p => p.estado !== "SI");
            this.generarCalendario();
          }
        });
        espiner?.classList.remove("lds-spinner");
      },
      error: (err) => {
        console.error("Error cargando plazos", err);
        espiner?.classList.remove("lds-spinner");
      }
    });
  }

  // 🔹 Mapear la respuesta del backend a nuestro modelo
  mapearPlazos(data: any[]): PlazoAsignado[] {
    return data.map(d => {
      const orfeo = d[1] || "";
      const fechaRaw = d[36] || "";       // Fecha
      const titulo = d[2] || "Sin título";
      const descripcion = d[3] || "";
      const responsable = d[2] || "";
      const estado = d[40] || "NO";
      const asunto = d[53] || "Asunto";
      const orden = d[35] || "Orden";

      let fecha = "";
      if (fechaRaw) {
        const f = new Date(fechaRaw);
        if (!isNaN(f.getTime())) {
          fecha = f.toISOString().split("T")[0];
        }
      }

      return { orfeo, titulo, descripcion, fecha, responsable, estado, asunto, orden };
    }).filter(p => p.estado !== "SI");
  }

  // 🔹 Generar la estructura del calendario
  generarCalendario(): void {
    this.calendario = [];

    const primerDia = new Date(this.anioSeleccionado, this.mesSeleccionado, 1);
    const ultimoDia = new Date(this.anioSeleccionado, this.mesSeleccionado + 1, 0);

    let inicioSemana = primerDia.getDay();
    if (inicioSemana === 0) inicioSemana = 7;

    const totalCeldas = inicioSemana - 1 + ultimoDia.getDate();
    const filas = Math.ceil(totalCeldas / 7) * 7;

    for (let i = 0; i < filas; i++) {
      const dia = i - (inicioSemana - 2);

      if (dia > 0 && dia <= ultimoDia.getDate()) {
        const fechaStr = new Date(this.anioSeleccionado, this.mesSeleccionado, dia)
                          .toISOString().split("T")[0];

        const plazosDia = this.plazos.filter(p => p.fecha === fechaStr);

        this.calendario.push({ dia, plazos: plazosDia });
      } else {
        this.calendario.push({ dia: null, plazos: [] });
      }
    }
  }

  // 🔹 Navegar entre meses
  cambiarMes(delta: number): void {
    this.mesSeleccionado += delta;
    if (this.mesSeleccionado < 0) {
      this.mesSeleccionado = 11;
      this.anioSeleccionado--;
    } else if (this.mesSeleccionado > 11) {
      this.mesSeleccionado = 0;
      this.anioSeleccionado++;
    }
    this.generarCalendario();
  }

  // 🔹 Modal
  abrirModal(celda: CeldaCalendario): void {
    this.modalDia = celda;
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.modalDia = null;
  }

  // 🔹 Descargar calendario como imagen
  descargarCalendario() {
    const calendario = document.getElementById("calendario");
    if (!calendario) return;

    html2canvas(calendario).then(canvas => {
      const link = document.createElement("a");
      link.download = `calendario-${this.nombreMes}-${this.anio}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  // 🔹 Exportar plazos a Excel
  exportarPlazos() {
    if (!this.plazos || this.plazos.length === 0) {
      alert("No hay plazos para exportar.");
      return;
    }

    // 🔹 Transformar los plazos con encabezados bonitos
    const datosExcel = this.plazos.map(p => ({
      "Orfeo": p.orfeo,
      "Fecha": p.fecha,
      "Dependencia": p.descripcion,
      "Responsable": p.responsable,
      "Cumplido": p.estado,
      "Asunto": p.asunto,
      "Orden": p.orden
    }));

    const ws = XLSX.utils.json_to_sheet(datosExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plazos");

    XLSX.writeFile(wb, `plazos-${this.nombreMes}-${this.anio}.xlsx`);
  }

  // 🔹 Getters para mostrar mes y año fácilmente
  get nombreMes(): string {
    return this.meses[this.mesSeleccionado];
  }

  get anio(): number {
    return this.anioSeleccionado;
  }
}
