import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Brand, BrandRequest } from '../../../../core/models/brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/Brands`;

  getAll()                           { return this.http.get<Brand[]>(this.url); }
  create(body: BrandRequest)         { return this.http.post<Brand>(this.url, body); }
  update(id: number, body: BrandRequest) { return this.http.put<Brand>(`${this.url}/${id}`, body); }
  delete(id: number)                 { return this.http.delete<void>(`${this.url}/${id}`); }
}
