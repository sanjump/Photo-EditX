import { Component, OnInit,NgZone } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {

  constructor() { }
  
  tabs:any=[]
  node:any=[]
 



  ngOnInit(): void {

    
  }

  setTabs(tabs: any) {
    this.tabs = tabs;
  }

  setSelectedNode(node: any) {
    this.node = node;
  }

}
