import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServiceConecionService } from 'src/app/service-conecion.service';
interface DepartamentoConMunicipios {
  nombre: string;
  municipios: string[];
}
@Component({
  selector: 'app-subregiones',
  templateUrl: './subregiones.component.html',
  styleUrls: ['./subregiones.component.css']
})
export class SubregionesComponent {
  departamentos: DepartamentoConMunicipios[] = [];

  subregiones: any[] = [];
  subregionNombre = '';
  subregionSeleccionada: any = null;
  departamentoExpandido: string | null = null;
  formData = new FormData();
  constructor(
    private cookie: CookieService,
    private api_serve: ServiceConecionService,
  ) {}
  ngOnInit() {
  this.actualizarListaSubregiones();
    this.api_serve.getDepartamentosConMunicipios().subscribe({
    next: (data) => {
      this.departamentos = data;
    },
    error: (err) => {
      console.error('Error cargando departamentos:', err);
    }
  });
}
  agregarSubregion() {
    if (!this.subregionNombre.trim()) return;
    const nueva = {
      nombre: this.subregionNombre,
      departamentos: []
    };
    this.subregiones.push(nueva);
    this.subregionNombre = '';
    this.subregionSeleccionada = nueva;
  }

  seleccionarSubregion(subregion: any) {
    this.subregionSeleccionada = subregion;
    this.departamentoExpandido = null;
    
  }

  toggleExpandirDepartamento(nombreDepartamento: string) {
    this.departamentoExpandido =
      this.departamentoExpandido === nombreDepartamento ? null : nombreDepartamento;
  }

  toggleDepartamento(subregion: any, departamento: any) {
    const existe = subregion.departamentos.find((d: any) => d.nombre === departamento.nombre);
    if (existe) {
      subregion.departamentos = subregion.departamentos.filter((d: any) => d.nombre !== departamento.nombre);
    } else {
      subregion.departamentos.push({ nombre: departamento.nombre, municipios: [] });
    }
  }

  toggleMunicipio(subregion: any, departamento: any, municipio: string) {
    const dep = subregion.departamentos.find((d: any) => d.nombre === departamento.nombre);
    if (!dep) return;
    const index = dep.municipios.indexOf(municipio);
    if (index > -1) {
      dep.municipios.splice(index, 1);
    } else {
      dep.municipios.push(municipio);
    }
  }
deseleccionarSubregion() {
  this.subregionSeleccionada = null;
}

  estaDepartamentoSeleccionado(subregion: any, departamento: any): boolean {
    return subregion?.departamentos?.some((d: any) => d.nombre === departamento.nombre);
  }

  estaMunicipioSeleccionado(subregion: any, departamento: any, municipio: string): boolean {
    const dep = subregion?.departamentos?.find((d: any) => d.nombre === departamento.nombre);
    return dep?.municipios?.includes(municipio) ?? false;
  }

  colorSegunCantidad(municipios: number): string {
    if (municipios >= 6) return 'color-alta';
    if (municipios >= 3) return 'color-media';
    return 'color-baja';
  }

  contarDepartamentos(subregion: any): number {
    return subregion.departamentos.length;
  }

  contarMunicipios(subregion: any): number {
    return subregion.departamentos.reduce((acc: number, dep: any) => acc + dep.municipios.length, 0);
  }
guardarEdicion() {
  const payload = {
    nombre: this.subregionSeleccionada.nombre,
    departamentos: this.subregionSeleccionada.departamentos
  };
  this.api_serve.sub_regiones(payload).subscribe({
    next: res => {
      console.log('✅ Subregión guardada:', res);
      if (!this.subregionSeleccionada.id) {
        this.subregionNombre = '';
      }
      this.actualizarListaSubregiones();
    },
    error: err => {
      console.error('❌ Error al guardar subregión:', err);
      alert('Error al guardar la subregión');
    }
  });
}

 actualizarListaSubregiones() {
  this.api_serve.obtenerSubregiones().subscribe({
    next: data => {
      this.subregiones = data;
      console.log("🔁 Lista actualizada");
    },
    error: err => console.error("Error al cargar subregiones", err)
  });
}
eliminarSubregion(id?: number): void {
  if (!id) {
    alert('⚠️ No hay subregión seleccionada para eliminar.');
    return;
  }

  const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta subregión?');

  if (!confirmacion) return;

  this.api_serve.eliminarSubregion(id).subscribe({
    next: (res) => {
      console.log('✅ Subregión eliminada:', res);
      this.actualizarListaSubregiones();
      this.subregionSeleccionada = null; // Limpia después de eliminar
    },
    error: (err) => {
      console.error('❌ Error al eliminar subregión:', err);
      alert('Error al eliminar la subregión.');
    }
  });
}



}
