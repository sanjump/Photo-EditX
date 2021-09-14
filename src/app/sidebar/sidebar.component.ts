import { Component, OnInit } from '@angular/core';
import { NodeService } from '../node.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private service:NodeService) { }

  myFiles: File[] = [];
  tabs:any=[]
  
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

  
  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
  }

  addItem(newItem: any) {
    this.tabs = newItem;
    console.log(this.tabs)
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
    console.log(this.myFiles)
}

  
  

}
