import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http:HttpClient) { }

  export(name,date){

    if(name!="" && date!=""){
    
      return this.http.get("https://localhost:44348/api/Editor/exportFile?name="+name+"&date="+date);
      
    }
    else if(name!="" && date==""){
     
      return this.http.get("https://localhost:44348/api/Editor/exportFile?name="+name);
    }
    else{
    
      return this.http.get("https://localhost:44348/api/Editor/exportFile?date="+date);
    }
   
  }
  
}
