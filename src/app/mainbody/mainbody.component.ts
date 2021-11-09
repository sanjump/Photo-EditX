import { Component, OnInit, Input, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.css']
})

export class MainbodyComponent implements OnInit {





  constructor(private zone: NgZone) {
    document.addEventListener("keydown", (event) => this.saveOnkeyPress(event))
  }

  @Input() tabs: any[]
  @Input() node: any


  ipc: IpcRenderer


  ngOnInit(): void {


    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.on("theme", (event, args) => {

      this.zone.run(() => {

        if (args == "light") {
          var elements = (document.querySelectorAll('.sidebar'))
          for (var i = 0; i < elements.length; i++) {
            (elements[i] as HTMLElement).style.backgroundColor = "#6a6a6b";

          }

          (document.querySelector('.p-tabview') as HTMLElement).style.backgroundColor = "#6a6a6b";
          (document.querySelector('.p-tabview .p-tabview-panels') as HTMLElement).style.backgroundColor = "rgb(216 201 203)";

        }
        else {
          var elements = (document.querySelectorAll('.sidebar'))
          for (var i = 0; i < elements.length; i++) {
            (elements[i] as HTMLElement).style.backgroundColor = "#111";

          }
          (document.querySelector('.p-tabview') as HTMLElement).style.backgroundColor = "#111";
          (document.querySelector('.p-tabview .p-tabview-panels') as HTMLElement).style.backgroundColor = "rgb(51, 29, 32)";

        }


      });
    });

  }

  openNav() {
    document.getElementById("leftSidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
    var elements = document.getElementsByClassName('container');
    for (var i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.margin = "15px";
      (elements[i] as HTMLElement).style.marginRight = "30px";
    }
    if (document.getElementById("rightSidebar_" + localStorage.getItem('currentTab'))) {
      document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width = "0px";
      document.getElementById("main").style.marginRight = "0px";
    }

  }

  saveOnkeyPress(event) {
    if (event.ctrlKey && event.keyCode == 83) {

      document.getElementById("btn_" + localStorage.getItem('tabSelected')).click();

    }

  }

}
