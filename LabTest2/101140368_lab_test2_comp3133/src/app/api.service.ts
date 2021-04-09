import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  REST_API = 'https://api.spacexdata.com/v3/launches';

  constructor(private httpClient: HttpClient) { }
  public getAll(){

    return this.httpClient.get(this.REST_API)

  }

  public getID(id:number){
    return this.httpClient.get(`${this.REST_API}/${id}`)
  }
}
