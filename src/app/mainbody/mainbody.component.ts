import { Component, OnInit,Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.css']
})
export class MainbodyComponent implements OnInit,OnChanges {

  constructor() { }
  @Input() settabs: any[]
  @Input() setnodes: any
  
  tabs:any=[]
  node:any=[]
  value:any=[]

  ngOnInit(): void {
  }


  ngOnChanges(){
     this.tabs=this.settabs
     this.node=this.setnodes
     
    
  }

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
  }
}
