import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogsService } from '../../services/catalogs.service';
import { SeasonsService } from '../../../seasons/services/seasons.service';
import { Catalog, CatalogRequest } from '../../../../../core/models/catalog.model';
import { Season } from '../../../../../core/models/season.model';
import { CommonModule } from '@angular/common';
import { FileUploader } from '../../../../../shared/components/file-uploader/file-uploader';

@Component({
  selector: 'app-catalog-modal',
  imports: [CommonModule, ReactiveFormsModule,FileUploader],
  templateUrl: './catalog-modal.html',
  styleUrl: './catalog-modal.css',
})
export class CatalogModal implements OnInit {
 
  private fb              = inject(FormBuilder);
  private catalogsService = inject(CatalogsService);
  private seasonsService  = inject(SeasonsService);
 
  catalog = input<Catalog | null>(null);
  close   = output<void>();
  saved   = output<void>();
 
  seasons  = signal<Season[]>([]);
  loading  = signal(false);
  error    = signal('');
 
  isEdit = false;
 
  form: FormGroup = this.fb.group({
    name:           ['', [Validators.required]],
    category:       [null],
    pages:          [1, [Validators.required, Validators.min(1)]],
    coverImage:     [null],
    pdfUrl:         [null],
    visible:        [true],
    visibleCliente: [true],
    seasonId:       [null, [Validators.required]]
  });
 
  ngOnInit(): void {
    this.loadSeasons();
    const cat = this.catalog();
    if (cat) {
      this.isEdit = true;
      this.form.patchValue({
        name:           cat.name,
        category:       cat.category,
        pages:          cat.pages,
        coverImage:     cat.coverImage,
        pdfUrl:         cat.pdfUrl,
        visible:        cat.visible,
        visibleCliente: cat.visibleCliente,
        seasonId:       cat.seasonId
      });
    }
  }
 
  loadSeasons() {
    this.seasonsService.getAll().subscribe({
      next: (data) => this.seasons.set(data)
    });
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
 
    const body: CatalogRequest = this.form.value;
    const cat = this.catalog();
 
    const request$ = this.isEdit && cat
      ? this.catalogsService.update(cat.id, body)
      : this.catalogsService.create(body);
 
    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.saved.emit();
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Ocurrió un error. Intenta de nuevo.');
      }
    });
  }
 
  onClose() { this.close.emit(); }
}