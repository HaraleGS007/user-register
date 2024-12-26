import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  get_userData(){
    return this._http.get('http://localhost:3000/posts/')
  }

  add_userData(data: any) {
    return this._http.post('http://localhost:3000/posts/', data);
  }
  update_userData(data: any, id:any) {
    return this._http.post('http://localhost:3000/posts/'+ data, id);
  }

  delete_userData(id: any) {
    return this._http.delete('http://localhost:3000/posts/' + id);
  }


}
