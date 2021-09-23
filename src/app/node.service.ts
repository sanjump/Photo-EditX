import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NodeService {

  constructor() { }

  data = [];
  tabs: any[] = [];

 
  setFiles(value) {
   this.data=value
  }

  getFiles() {
    return this.data;
  }

  getTabs() {
    return this.tabs
  }

  setTabs(hvalue,cvalue) {
    this.tabs.push({
      header: hvalue,
      content : cvalue
    })
  }

}
