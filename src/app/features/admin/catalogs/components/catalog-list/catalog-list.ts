import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogsService } from '../../services/catalogs.service';
import { Catalog } from '../../../../../core/models/catalog.model';
import { CatalogModal } from '../catalog-modal/catalog-modal';

@Component({
  selector: 'app-catalog-list',
  standalone: true,
  imports: [CommonModule, CatalogModal],
  templateUrl: './catalog-list.html',
  styleUrl: './catalog-list.css'
})
export class CatalogList implements OnInit {

  private catalogsService = inject(CatalogsService);

  catalogs  = signal<Catalog[]>([]);
  loading   = signal(true);
  error     = signal('');

  // Modal
  showModal    = signal(false);
  editingCatalog = signal<Catalog | null>(null);

  // Confirm delete
  deletingId = signal<number | null>(null);

  ngOnInit() {
    this.loadCatalogs();
  }

  loadCatalogs() {
    this.loading.set(true);
    this.catalogsService.getAll().subscribe({
      next: (data) => {
        this.catalogs.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los catálogos.');
        this.loading.set(false);
      }
    });
  }

  openCreate() {
    this.editingCatalog.set(null);
    this.showModal.set(true);
  }

  openEdit(catalog: Catalog) {
    this.editingCatalog.set(catalog);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingCatalog.set(null);
  }

  onSaved() {
    this.closeModal();
    this.loadCatalogs();
  }

  confirmDelete(id: number) {
    this.deletingId.set(id);
  }

  cancelDelete() {
    this.deletingId.set(null);
  }

  onDelete(id: number) {
    this.catalogsService.delete(id).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.loadCatalogs();
      },
      error: () => {
        this.deletingId.set(null);
      }
    });
  }

  toggleVisible(catalog: Catalog) {
    const body = { ...catalog, visible: !catalog.visible };
    this.catalogsService.update(catalog.id, body).subscribe({
      next: () => this.loadCatalogs()
    });
  }

  toggleVisibleCliente(catalog: Catalog) {
    const body = { ...catalog, visibleCliente: !catalog.visibleCliente };
    this.catalogsService.update(catalog.id, body).subscribe({
      next: () => this.loadCatalogs()
    });
  }
}