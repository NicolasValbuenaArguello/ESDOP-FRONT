import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contrasenia-user',
  templateUrl: './contrasenia-user.component.html',
  styleUrls: ['./contrasenia-user.component.css']
})
export class ContraseniaUserComponent {
  form: FormGroup;
  loading = false;
  mostrarErrorCoincidencia = false; // 🔹 Nueva bandera

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private cookie: CookieService
  ) {
    this.form = this.fb.group({
      actual: ['', [Validators.required]],
      nueva: ['', [Validators.required, Validators.minLength(8)]],
      confirmar: ['', [Validators.required]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.cambiarContrasena();
  }
ngOnInit() {
  // Detecta cambios en el formulario
  this.form.valueChanges.subscribe(() => {
    if (this.form.valid) {
      this.loading = false; // Habilita el botón solo si el formulario tiene datos válidos
    } else {
      this.loading = true;  // Mantiene deshabilitado mientras no haya datos válidos
    }
  });
}

mensajeCambio = '';   // Variable para mostrar mensaje en HTML
tipoMensaje = '';     // 'success' o 'error'



cambiarContrasena() {
  if (this.form.invalid) {
    this.toastr.error('Por favor completa los campos correctamente.');
    return;
  }

  const { actual, nueva, confirmar } = this.form.value;

  if (nueva !== confirmar) {
    this.mostrarErrorCoincidencia = true;
    this.toastr.warning('Las contraseñas nuevas no coinciden.');
    return;
  } else {
    this.mostrarErrorCoincidencia = false;
  }

  const formData = new FormData();
  formData.append('actual', actual);
  formData.append('nueva', nueva);
  formData.append('unidad', this.cookie.get("unidad"));
  formData.append('fullname', this.cookie.get("fullname"));

  this.loading = true; // Deshabilita el botón
  this.mensajeCambio = '';

  this.http.post<any>('http://172.22.2.36:5197/cambiar_contrasena', formData)
    .subscribe({
      next: (res) => {
        if (res.success) {
          this.mensajeCambio = res.msg || 'Contraseña actualizada correctamente.';
          this.tipoMensaje = 'success';
          this.form.reset();  // Limpia los campos
          Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].setErrors(null);
          });
          // 🔹 Mantener el botón deshabilitado hasta que el usuario escriba algo
          this.loading = true;
        } else {
          this.mensajeCambio = res.msg || 'Error al cambiar la contraseña.';
          this.tipoMensaje = 'error';
        }
      },
      error: (err) => {
        console.error('Error al cambiar contraseña:', err);
        this.mensajeCambio = 'Error al conectar con el servidor.';
        this.tipoMensaje = 'error';
      }
    });
}




}
