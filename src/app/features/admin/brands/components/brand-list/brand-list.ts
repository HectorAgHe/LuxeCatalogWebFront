import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsService } from '../../services/brands.service';
import { Brand } from '../../../../../core/models/brand.model';
import { BrandModal } from '../brand-modal/brand-modal';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule, BrandModal],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css'
})
export class BrandList implements OnInit {

  private brandsService = inject(BrandsService);

  brands     = signal<Brand[]>([]);
  loading    = signal(true);
  error      = signal('');
  showModal  = signal(false);
  editing    = signal<Brand | null>(null);
  deletingId = signal<number | null>(null);

  ngOnInit() { this.loadBrands(); }

  loadBrands() {
    this.loading.set(true);
    this.brandsService.getAll().subscribe({
      next:  (data) => { this.brands.set(data); this.loading.set(false); },
      error: ()     => { this.error.set('No se pudieron cargar las marcas.'); this.loading.set(false); }
    });
  }

  openCreate() { this.editing.set(null); this.showModal.set(true); }
  openEdit(brand: Brand) { this.editing.set(brand); this.showModal.set(true); }
  closeModal() { this.showModal.set(false); this.editing.set(null); }

  onSaved() { this.closeModal(); this.loadBrands(); }

  confirmDelete(id: number) { this.deletingId.set(id); }
  cancelDelete()            { this.deletingId.set(null); }

  onDelete(id: number) {
    this.brandsService.delete(id).subscribe({
      next: () => { this.deletingId.set(null); this.loadBrands(); },
      error: () => { this.deletingId.set(null); }
    });
  }
}