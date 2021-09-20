import { Component, OnInit } from '@angular/core';
import { NodeService } from '../node.service';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private service:NodeService) { }
  @Output() settabs = new EventEmitter<any>();
  @Output() setnodes = new EventEmitter<any>();
  @Output() setvalue = new EventEmitter<any>();
  myFiles: File[] = [];
  tabs:any=[]
  node:any
  value:any
  
  ngOnInit(): void {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
  }

  closeNav() {

    document.getElementById("open").hidden = false;
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  setTabs(value: any) {
    this.settabs.emit(value);
  }

  setSelectedNode(value: any) {
    this.setnodes.emit(value);
  }

  setData(value: any) {
    this.setvalue.emit(value);
  }

  

  getTabs(tabs: any) {
    this.tabs = tabs;
    this.setTabs(tabs)
    
  }

  getSelectedNode(node: any) {
    this.node = node;
    this.setSelectedNode(node)
    
  }

  getData(value: any) {
    this.value = value;
    this.setData(value)
    
  }


  SelectedFile(event){

    
    if(event.target.files){
        // var reader = new FileReader()
        // reader.readAsDataURL(event.target.files[0])
        // reader.onload=(event:any)=>{
        //     this.url=event.target.result
        // }
        this.myFiles=[]
        for (var i = 0; i < event.target.files.length; i++) {
          this.myFiles.push(event.target.files[i]);
         
        }
    }
    this.service.setFiles(this.myFiles)
  
}

  
  

}
