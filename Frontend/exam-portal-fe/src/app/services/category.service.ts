import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) { }

  public getAllCategories() {
    return this._httpClient.get(`${baseUrl}/api/categories`);
  }

  public addCategory(category: any) {
    return this._httpClient.post(`${baseUrl}/api/categories`, category);
  }

  public deleteCategory(cid: any) {
    return this._httpClient.delete(`${baseUrl}/api/categories/${cid}`);
  }


  public getCategoryById(cid: any) { 
    return this._httpClient.get(`${baseUrl}/api/categories/${cid}`);
  }

  public updateCategory(category: any) {
    return this._httpClient.put(`${baseUrl}/api/categories`, category);
  }
}
