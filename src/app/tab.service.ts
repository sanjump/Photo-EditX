import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TabService {

  constructor() { }

  tabs: any[] = [];

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
