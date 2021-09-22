import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor() { }
  settabs:any=[]
  setnodes:any=[]
 
  ngOnInit(): void {
  }

  setTabs(settabs: any) {
    this.settabs = settabs;
    
  }

  setSelectedNode(setnodes: any) {
    this.setnodes = setnodes;
    
  }

 

}
