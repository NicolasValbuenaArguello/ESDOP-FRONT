import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-datos',
  templateUrl: './gestion-datos.component.html',
  styleUrls: ['./gestion-datos.component.css']
})
export class GestionDatosComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  hechosFile!: File;
  resultadosFile!: File;

  cardMessage: string = '';
  cardType: 'success' | 'error' | null = null;
  loading: boolean = false; // 🔹 Nueva variable

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  eliminarDatos() {
    if (!this.fechaInicio || !this.fechaFin) {
      this.toastr.warning('Debes seleccionar ambas fechas');
      return;
    }

    this.loading = true; // ⏳ Inicia carga
    const formData = new FormData();
    formData.append('fecha_inicial', this.fechaInicio);
    formData.append('fecha_final', this.fechaFin);

    this.http.post('http://172.22.2.36:5030/datos', formData).subscribe({
      next: (res: any) => {
        this.cardType = 'success';
        this.cardMessage = '✅ Datos eliminados correctamente.';
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.cardType = 'error';
        this.cardMessage = '❌ Error al eliminar los datos.';
        this.loading = false;
      }
    });
  }

  onHechosFileChange(event: any) {
    this.hechosFile = event.target.files[0];
  }

  onResultadosFileChange(event: any) {
    this.resultadosFile = event.target.files[0];
  }

  guardarArchivos() {
    if (!this.hechosFile || !this.resultadosFile) {
      this.toastr.warning('Selecciona ambos archivos antes de guardar.');
      return;
    }

    this.loading = true; // ⏳ Inicia carga
    const formData = new FormData();
    formData.append('hechos', this.hechosFile);
    formData.append('resultados', this.resultadosFile);

    this.http.post('http://172.22.2.36:5030/api', formData).subscribe({
      next: (res: any) => {
        this.cardType = 'success';
        this.cardMessage = '📊 Archivos cargados exitosamente.';
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.cardType = 'error';
        this.cardMessage = '⚠️ Error al guardar los archivos.';
        this.loading = false;
      }
    });
  }
}
