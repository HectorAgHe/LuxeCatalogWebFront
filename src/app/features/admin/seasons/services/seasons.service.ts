import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Season } from '../../../../core/models/season.model';

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {

  private http = inject(HttpClient);
  
  private url  = `${environment.apiUrl}/Seasons`


  getAll(){
    return this.http.get<Season[]>(this.url);
  }

  getActive(){
    return this.http.get<Season>(`${this.url}/active`);
  }



}
