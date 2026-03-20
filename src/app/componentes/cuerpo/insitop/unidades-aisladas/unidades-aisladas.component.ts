import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';

type CampoFiltro = 'division' | 'brigada' | 'unidad' | 'compania' | 'peloton' | 'buscador';
type Filtros = { [key in CampoFiltro]: string } & { [key: string]: string };

@Component({
  selector: 'app-unidades-aisladas',
  templateUrl: './unidades-aisladas.component.html',
  styleUrls: ['./unidades-aisladas.component.css']
})
export class UnidadesAisladasComponent implements OnInit {
  form: FormGroup;
  aisladas: any[] = [];
  filtradas: any[] = [];
  filtros: Filtros = {
    division: '',
    brigada: '',
    unidad: '',
    compania: '',
    peloton: '',
    buscador: ''
  };

  loading = false;
  apiUrl = 'http://172.22.2.36:5010/unidades_aisladas';

constructor(private http: HttpClient, private fb: FormBuilder) {
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const dd = String(hoy.getDate()).padStart(2, '0');
  const fechaHoy = `${yyyy}-${mm}-${dd}`;

  this.form = this.fb.group({
    fecha: [fechaHoy],   // 👈 inicializa con la fecha de hoy
    distancia: [3000]    // valor por defecto
  });
}


  ngOnInit(): void {}

buscar(): void {
  this.loading = true;
  const formData = new FormData();

  if (this.form.value.fecha) {
    formData.append('fecha', this.form.value.fecha);
  }

  if (this.form.value.distancia && this.form.value.distancia !== 'undefined') {
    formData.append('distancia', this.form.value.distancia);
  } else {
    formData.append('distancia', '3000'); // valor por defecto
  }

  this.http.post<any>(this.apiUrl, formData).subscribe({
    next: res => {
      this.aisladas = res.unidades_aisladas || [];
      this.filtradas = [...this.aisladas];
      this.loading = false;
    },
    error: () => {
      this.loading = false;
    }
  });
}


  aplicarFiltros(): void {
    this.filtradas = this.aisladas.filter(u =>
      (!this.filtros.division || u.sigla_division === this.filtros.division) &&
      (!this.filtros.brigada || u.sigla_brigada === this.filtros.brigada) &&
      (!this.filtros.unidad || u.sigla_unidd === this.filtros.unidad) &&
      (!this.filtros.compania || u.compania === this.filtros.compania) &&
      (!this.filtros.peloton || u.peloton === this.filtros.peloton) &&
      (!this.filtros.buscador || Object.values(u).some(val =>
        String(val).toLowerCase().includes(this.filtros.buscador.toLowerCase())
      ))
    );
  }

  resetFiltros(): void {
    Object.keys(this.filtros).forEach(k => this.filtros[k] = '');
    this.aplicarFiltros();
  }

getUnicos(campo: string): string[] {
  let datos = [...this.aisladas];

  // Filtrar jerarquía antes de calcular únicos
  if (campo === 'sigla_brigada') {
    if (this.filtros.division) {
      datos = datos.filter(u => u.sigla_division === this.filtros.division);
    }
  }

  if (campo === 'sigla_unidd') {
    if (this.filtros.division) {
      datos = datos.filter(u => u.sigla_division === this.filtros.division);
    }
    if (this.filtros.brigada) {
      datos = datos.filter(u => u.sigla_brigada === this.filtros.brigada);
    }
  }

  if (campo === 'sigla_compania' || campo === 'compania') {
    if (this.filtros.division) {
      datos = datos.filter(u => u.sigla_division === this.filtros.division);
    }
    if (this.filtros.brigada) {
      datos = datos.filter(u => u.sigla_brigada === this.filtros.brigada);
    }
    if (this.filtros.unidad) {
      datos = datos.filter(u => u.sigla_unidd === this.filtros.unidad);
    }
  }

  if (campo === 'sigla_peloton' || campo === 'peloton') {
    if (this.filtros.division) {
      datos = datos.filter(u => u.sigla_division === this.filtros.division);
    }
    if (this.filtros.brigada) {
      datos = datos.filter(u => u.sigla_brigada === this.filtros.brigada);
    }
    if (this.filtros.unidad) {
      datos = datos.filter(u => u.sigla_unidd === this.filtros.unidad);
    }
    if (this.filtros.compania) {
      datos = datos.filter(u => u.compania === this.filtros.compania);
    }
  }

  return [...new Set(datos.map(u => u[campo]).filter(Boolean))].sort();
}


  contar(campo: string, valor: string): number {
    return this.aisladas.filter(u => u[campo] === valor).length;
  }

exportarExcel(): void {
  const datosExportar = this.filtradas.map(u => ({
    'División': u.sigla_division,
    'Brigada': u.sigla_brigada,
    'Unidad': u.sigla_unidd,
    'Compañía': u.compania,
    'Pelotón': u.peloton,
    'Departamento': u.departamento,
    'Municipio': u.municipio,
    'Distancia mínima (m)': u.distancia_minima
  }));

  const hoja = XLSX.utils.json_to_sheet(datosExportar);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Unidades Aisladas');

  // Construir nombre de archivo con filtros
  const filtrosActivos: string[] = [];
  if (this.filtros.division) filtrosActivos.push(`div_${this.filtros.division}`);
  if (this.filtros.brigada) filtrosActivos.push(`bri_${this.filtros.brigada}`);
  if (this.filtros.unidad) filtrosActivos.push(`uni_${this.filtros.unidad}`);
  if (this.filtros.compania) filtrosActivos.push(`comp_${this.filtros.compania}`);
  if (this.filtros.peloton) filtrosActivos.push(`pel_${this.filtros.peloton}`);

  const fechaActual = new Date();
  const yyyy = fechaActual.getFullYear();
  const mm = String(fechaActual.getMonth() + 1).padStart(2, '0');
  const dd = String(fechaActual.getDate()).padStart(2, '0');

  const filtrosStr = filtrosActivos.join('_') || 'todas';
  const nombreArchivo = `unidades_aisladas_${filtrosStr}_${yyyy}${mm}${dd}.xlsx`;

  XLSX.writeFile(libro, nombreArchivo);
}


}
