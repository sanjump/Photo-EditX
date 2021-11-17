import { Component, OnInit, Input, NgZone, OnChanges } from '@angular/core';
import { IpcRenderer } from 'electron';
@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.css']
})

export class MainbodyComponent implements OnInit,OnChanges {


  constructor(private zone: NgZone) {
    document.addEventListener("keydown", (event) => this.keyPress(event))
  }

  @Input() tabs: any[]
  @Input() node: any


  ipc: IpcRenderer
  showRecent:boolean

  ngOnInit(): void {

    this.showRecent=true
    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.on("preferences", (event, args) => {

      this.zone.run(() => {
        localStorage.setItem('theme', args.theme)
        if (args.theme == "light") {
          var elements = (document.querySelectorAll('.sidebar'))
          for (var i = 0; i < elements.length; i++) {
            (elements[i] as HTMLElement).style.backgroundColor = "#6a6a6b";

          }

          (document.querySelector('.p-tree') as HTMLElement).style.backgroundColor = "#6a6a6b";
          (document.querySelector('.p-tree') as HTMLElement).style.color = "black";
          (document.querySelector('.p-tree') as HTMLElement).style.border = "#6a6a6b";


          if (this.tabs.length > 0) {
           
            (document.querySelector('.p-tabview') as HTMLElement).style.backgroundColor = "#6a6a6b";
            (document.querySelector('.p-tabview .p-tabview-panels') as HTMLElement).style.backgroundColor = "rgb(216 201 203)";
          }




        }
        else {
          var elements = (document.querySelectorAll('.sidebar'))
          for (var i = 0; i < elements.length; i++) {
            (elements[i] as HTMLElement).style.backgroundColor = "#111";
          }

          (document.querySelector('.p-tree') as HTMLElement).style.backgroundColor = "#111";
          (document.querySelector('.p-tree') as HTMLElement).style.color = "white";
          (document.querySelector('.p-tree') as HTMLElement).style.border = "#111";


          if (this.tabs.length > 0) {
           
            (document.querySelector('.p-tabview') as HTMLElement).style.backgroundColor = "#111";
            (document.querySelector('.p-tabview .p-tabview-panels') as HTMLElement).style.backgroundColor = "rgb(51, 29, 32)";
          }



        }
      });
    });

  }


  ngOnChanges(){

    this.showRecent=false
    
  }

  openNav() {
    document.getElementById("leftSidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
    var elements = document.getElementsByClassName('container');
    for (var i = 0; i < elements.length; i++) {
      
      (elements[i] as HTMLElement).style.marginLeft = "";
    }
    if (document.getElementById("rightSidebar_" + localStorage.getItem('currentTab'))) {
      document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width = "0px";
      document.getElementById("main").style.marginRight = "0px";
    }

  }

  keyPress(event) {

    if (event.ctrlKey && event.keyCode == 83) {

      document.getElementById("saveBtn_" + localStorage.getItem('tabSelected')).click();

    }

    else if(event.ctrlKey && event.keyCode == 90){
      event.preventDefault();
      document.getElementById("undoBtn_" + localStorage.getItem('tabSelected')).click();
    }

    else if(event.ctrlKey && event.keyCode == 89){
      event.preventDefault();
      document.getElementById("redoBtn_" + localStorage.getItem('tabSelected')).click();
    }

  }

}
