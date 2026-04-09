import { Component, inject, input, output, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandsService } from '../../services/brands.service';
import { Brand, BrandRequest } from '../../../../../core/models/brand.model';
import { FileUploader } from '../../../../../shared/components/file-uploader/file-uploader';

@Component({
  selector: 'app-brand-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FileUploader],
  templateUrl: './brand-modal.html',
  styleUrl: './brand-modal.css'
})
export class BrandModal implements OnInit {

  private fb            = inject(FormBuilder);
  private brandsService = inject(BrandsService);

  brand   = input<Brand | null>(null);
  close   = output<void>();
  saved   = output<void>();

  loading = signal(false);
  error   = signal('');
  isEdit  = false;

  form: FormGroup = this.fb.group({
    name:        ['', [Validators.required]],
    logo:        [null],
    description: [null]
  });

  ngOnInit() {
    const b = this.brand();
    if (b) {
      this.isEdit = true;
      this.form.patchValue({
        name:        b.name,
        logo:        b.logo,
        description: b.description
      });
    }
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && c.touched);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const body: BrandRequest = this.form.value;
    const b = this.brand();

    const request$ = this.isEdit && b
      ? this.brandsService.update(b.id, body)
      : this.brandsService.create(body);

    request$.subscribe({
      next:  () => { this.loading.set(false); this.saved.emit(); },
      error: (err) => {
        this.loading.set(false);
        if (err.error?.[0]?.errorMessage) {
          this.error.set(err.error[0].errorMessage);
        } else {
          this.error.set('Ocurrió un error. Intenta de nuevo.');
        }
      }
    });
  }

  onClose() { this.close.emit(); }
}