import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-unidades-sin-cargar',
  templateUrl: './unidades-sin-cargar.component.html',
  styleUrls: ['./unidades-sin-cargar.component.css']
})
export class UnidadesSinCargarComponent {
  fecha: string = '';
  cargando = false;
  resumen: any[] = [];
  divisionExpandida: string = '';
  brigadaExpandida: string = '';

  constructor(private http: HttpClient) {}

  enviarFormulario() {
    if (!this.fecha) return;

    const formData = new FormData();
    formData.append('fecha', this.fecha);
    this.cargando = true;

    this.http.post<any>('http://172.22.2.36:5010/unidades_no_cargadas', formData).subscribe({
      next: (res) => {
        this.resumen = res.resumen || [];
        this.divisionExpandida = '';
        this.brigadaExpandida = '';
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al consultar:', err);
        this.cargando = false;
      }
    });
  }

reporte_excel() {
  if (!this.fecha) return;

  const formData = new FormData();
  formData.append('fecha', this.fecha);
  this.cargando = true;

  this.http.post('http://172.22.2.36:5010/reporte_unidades_no_cargadas_excel', formData, {
    responseType: 'blob'
  }).subscribe({
    next: (res) => {
      const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `unidades_no_cargadas_${this.fecha}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      this.cargando = false;
    },
    error: (err) => {
      console.error('Error al descargar Excel:', err);
      this.cargando = false;
    }
  });
}


  expandirDivision(siglaDiv: string) {
    this.divisionExpandida = this.divisionExpandida === siglaDiv ? '' : siglaDiv;
    this.brigadaExpandida = '';
  }

  expandirBrigada(siglaBr: string) {
    this.brigadaExpandida = this.brigadaExpandida === siglaBr ? '' : siglaBr;
  }

filtrarUnidadesPorBrigada(div: any, siglaBr: string) {
  const br = div.detalle.find((d: any) => d.sigla_br === siglaBr);
  return br?.batallones || [];
}
}
