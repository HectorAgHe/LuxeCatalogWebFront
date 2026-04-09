import { Component, computed, inject, input, output, signal } from '@angular/core';
import { UploadEndpoint, UploadService } from '../../../core/services/upload.service';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [],
  templateUrl: './file-uploader.html',
  styleUrl: './file-uploader.css',
})
export class FileUploader {

  private uploadService = inject(UploadService);

  // Configuracion desde el padre

   // Configuración desde el padre
  endpoint    = input.required<UploadEndpoint>();
  accept      = input<string>('*');
  label       = input<string>('Subir archivo');
  currentUrl  = input<string | null>(null);   

  // Eventos hacia el padre
  uploaded = output<string>(); // emite la URL
  removed  = output<void>();

  // Estado interno
  uploading  = signal(false);
  error       = signal('');
  previewUrl  = signal<string | null>(null);
  fileName    = signal<string | null>(null);
  isDragging  = signal(false);

  // URL activa: primero la preview local, luego la que viene del padre
  activeUrl = computed(() => this.previewUrl() ?? this.currentUrl());

    isPdf = computed(() => {
    const url = this.activeUrl();
    return url?.toLowerCase().endsWith('.pdf') ?? false;
  });


   isImage = computed(() => {
    const url = this.activeUrl();
    if (!url) return false;
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  });

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (file) this.handleFile(file);
    input.value = '';
  }

  onDrop(event: DragEvent){
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files?.[0];
    if(file) this.handleFile(file);
  }

   onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }
  onDragLeave() {
    this.isDragging.set(false);
  }


   handleFile(file: File) {
    this.error.set('');

    // Si hay un archivo previo, elimínalo primero
    const prev = this.activeUrl();
    if (prev) {
      this.uploadService.delete(prev).subscribe();
    }

    this.uploading.set(true);
    this.fileName.set(file.name);

    // Preview local inmediata para imágenes
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => this.previewUrl.set(e.target?.result as string);
      reader.readAsDataURL(file);
    }

    this.uploadService.upload(file, this.endpoint()).subscribe({
      next: (res) => {
        this.uploading.set(false);
        this.previewUrl.set(res.url);
        this.fileName.set(res.fileName);
        this.uploaded.emit(res.url);
      },
      error: () => {
        this.uploading.set(false);
        this.previewUrl.set(null);
        this.fileName.set(null);
        this.error.set('Error al subir el archivo. Intenta de nuevo.');
      }
    });
  }

  removeFile() {
    const url = this.activeUrl();
    if (url) {
      this.uploadService.delete(url).subscribe();
    }
    this.previewUrl.set(null);
    this.fileName.set(null);
    this.error.set('');
    this.removed.emit();
  }
}
