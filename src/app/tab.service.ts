import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})

export class TabService {

  constructor() { }

  SharingData = new Subject();  
  tabs: any[] = [];
  tabheader : string
  tabcontent : string

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
