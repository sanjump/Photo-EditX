import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor() { }


  private data = [];

  public tabs: any[] = [];

  private tab: BehaviorSubject<any> = new BehaviorSubject<any>(this.tabs);
  tab$: Observable<any> = this.tab.asObservable();



  setFiles(value) {
  
    for (var i = 0; i < value.length; i++) {
     this.data.push(value[i]);
  }
}

  getFiles() {
    return this.data;
  }

  gettabs() {
    return this.tabs
  }

  settabs(hvalue,cvalue) {

    this.tabs.push({
      header: hvalue,
      content : cvalue
    })

  }
}
