import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';


export interface UploadResponse{
  url: string;
  fileName: string;
  size: number;
  extension: string;
} 

export type UploadEndpoint = 'catalogo' | 'marca' | 'hero' | 'banner' | 'avatar';


@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private http  = inject(HttpClient);
  private base = `${environment.apiUrl}/Upload`;

  upload(file: File, endpoint: UploadEndpoint) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResponse>(`${this.base}/${endpoint}`, formData);
  }

  delete(fileUrl: string) {
    return this.http.delete<{ message: string}>(
      `${this.base}`,
      {params: {fileUrl}}
    );
  }
}
