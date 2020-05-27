import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HouseModel } from '../types/app-data.types';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  private url = 'https://www.anapioficeandfire.com/api';

  constructor(private http: HttpClient) {}

  public getHouses(page: number): Observable<HouseModel[]> {
    return this.http.get<HouseModel[]>(`${this.url}/houses?page=${page}&pageSize=10`, {});
  }

  public getHouse(id: string): Observable<HouseModel> {
    return this.http.get<HouseModel>(`${this.url}/houses/${id}`, {});
  }
}
