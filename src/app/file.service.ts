import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FileService {

  constructor() { }

  
  files = [];
 
  setFiles(value) {
   this.files=value
  }

  getFiles() {
    return this.files;
  }

}
