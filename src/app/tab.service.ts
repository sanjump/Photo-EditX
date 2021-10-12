import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TabService {

  constructor() { }

  private subject = new Subject<any>();
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

  setTabheader(tabheader){
    this.tabheader = tabheader
  }
  
  setTabcontent(tabcontent){
    this.tabcontent = tabcontent
  }
  
  getTabheader(){
    return this.tabheader
  }

  getTabcontent(){
    return this.tabcontent
  }


}
