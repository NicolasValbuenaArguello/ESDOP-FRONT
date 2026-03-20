import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
import { SelectoresService } from 'src/app/servicios_generales/selectores.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-subir-unidad',
  templateUrl: './subir-unidad.component.html',
  styleUrls: ['./subir-unidad.component.css']
})
export class SubirUnidadComponent {
  uniqueCounts: { [key: string]: number } = {};
  uniqueKeys: string[] = [];
  archivoExcel: File | null = null;
  archivoNombre: string = '';
  unidades: { [key: string]: any }[] = [];

  constructor(
    private api_serve: ServiceConecionService,
    private cookie: CookieService,
    private usuarios: SelectoresService
  ) {
    this.leer_unidade();
  }

  analizarUnidadesDesdeBackend() {
    if (!this.unidades || this.unidades.length === 0) return;

    const keys = Object.keys(this.unidades[0]);
    const counts: { [key: string]: Set<any> } = {};
    keys.forEach(k => counts[k] = new Set());

    this.unidades.forEach(row => {
      keys.forEach(k => {
        if (row[k] != null) counts[k].add(row[k]);
      });
    });

    this.uniqueCounts = {};
    keys.forEach(k => {
      this.uniqueCounts[k] = counts[k].size;
    });

    this.uniqueKeys = keys;
  }

  onFileSelected(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    this.archivoNombre = archivo.name;
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.archivoExcel = input.files[0];

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data: any[] = XLSX.utils.sheet_to_json(ws, { defval: null });
      if (data.length === 0) return;

      const keys = Object.keys(data[0]);
      const counts: { [key: string]: Set<any> } = {};
      keys.forEach(k => counts[k] = new Set());

      data.forEach(row => {
        keys.forEach(k => {
          if (row[k] != null) counts[k].add(row[k]);
        });
      });

      this.uniqueCounts = {};
      keys.forEach(k => {
        this.uniqueCounts[k] = counts[k].size;
      });

      this.uniqueKeys = keys;
    };

    reader.readAsBinaryString(this.archivoExcel);
  }

  enviarBackend() {
    if (!this.archivoExcel) return;

    const formData = new FormData();
    formData.append('archivo', this.archivoExcel, this.archivoExcel.name);

    const spinner = document.getElementById("espiner");
    spinner?.classList.add("lds-spinner");

    this.api_serve.Cargar_insitop_u(formData).subscribe({
      next: (result: HttpResponse<any>) => {
        const respuesta = result as any;

        if ('mensaje' in respuesta) {
          alert(respuesta['mensaje']);
          // Aquí podrías volver a cargar unidades si lo necesitas:
          this.leer_unidade();
        } else {
          alert("Respuesta inesperada del servidor.");
        }
      },
      error: (err: HttpErrorResponse) => {
        //console.error("Error al enviar archivo:", err);
        alert("Ocurrió un error al enviar el archivo.");
      },
      complete: () => {
        spinner?.classList.remove("lds-spinner");
      }
    });
  }

  leer_unidade() {
    this.api_serve.Leer_unidades().subscribe({
      next: (respuesta: any) => {
        if (respuesta?.unidades) {
          this.unidades = respuesta.unidades;
          console.log("✅ Unidades cargadas:", this.unidades);
          this.analizarUnidadesDesdeBackend(); // <--- CORRECTO aquí
        } else {
          alert("⚠️ No se recibieron unidades.");
        }
      },
      error: (error) => {
        console.error("❌ Error al obtener unidades:", error);
        alert("Error al leer unidades desde el servidor.");
      }
    });
  }
}
