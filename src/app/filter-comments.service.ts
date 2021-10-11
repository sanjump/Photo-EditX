import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FilterCommentsService {

  constructor(private http:HttpClient) { }


  filter(name){
    
    return this.http.get("https://localhost:44348/api/Editor/filterFile?name="+name);

  }
}
