import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Catalog, CatalogRequest } from '../../../../core/models/catalog.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogsService {

  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/Catalogs`;


  getAll(){
    return this.http.get<Catalog[]>(this.url);
  }

  getById(id: number){
    return this.http.get<Catalog>(`${this.url}/${id}`);
  }

  create(body: CatalogRequest){
    return this.http.post<Catalog>(this.url, body);    
  }
  update(id: number, body: CatalogRequest){
    return this.http.put<Catalog>(`${this.url}/${id}`, body);
  }

  delete(id: number){
    return this.http.delete<void>(`${this.url}/${id}`);
  }


  toggleVisible(id: number, body: CatalogRequest){
    return this.http.put<Catalog>(`${this.url}/${id}`, body);
  }


  
}
