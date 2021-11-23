import { Component, OnInit, ViewEncapsulation, Input, OnChanges ,NgZone } from '@angular/core';
import { TabService } from '../tab.service';
import { IpcRenderer } from 'electron';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TabsComponent implements OnInit, OnChanges {

  constructor(private tabService: TabService,private zone: NgZone,private confirmationService: ConfirmationService) { }

  @Input() tabs: any[]
  @Input() node: any

  ipc: IpcRenderer
  tabIndex = 0

  ngOnInit(): void {
    this.ipc = (<any>window).require('electron').ipcRenderer;
  }

  ngOnChanges() {

    

    setTimeout(() => {
      

      for (var i = 0; i < this.tabs.length; i++) {

        if (this.tabs[i].header == this.node) {

          this.tabIndex = i
          break

        }
      }

      if (this.tabs.length > 0) {

        
       
        if (localStorage.getItem('theme') == 'dark') {

          (document.querySelector('.p-tabview') as HTMLElement).style.backgroundColor = "#111";
          (document.querySelector('.p-tabview .p-tabview-panels') as HTMLElement).style.backgroundColor = "rgb(51, 29, 32)";
        }

        else {
         
          (document.querySelector('.p-tabview') as HTMLElement).style.backgroundColor = "#6a6a6b";
          (document.querySelector('.p-tabview .p-tabview-panels') as HTMLElement).style.backgroundColor = "rgb(216 201 203)";
        }


      }
    }, 200);

  }


  onClose(e) {

    document.getElementById("tabclose_"+localStorage.getItem('tabSelected')).click()
    this.ipc.send("selectedNode", localStorage.getItem('tabSelected'));
    
    this.ipc.once('data', (event, args) => {
     
      this.zone.run(() => {

        if(JSON.parse(localStorage.getItem('currentFile')).length==1 || (JSON.stringify(args)==localStorage.getItem('currentFile') )) {

                 this.close(e)
        }

      
        else{

          this.confirmationService.confirm({
            message: 'Are you sure you want to close without saving?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.close(e)
            },
            reject: () => {
              
            }
        });
        }
        
        

      });
    });

  

  }

  close(e){

    e.close()
    this.tabService.getTabs().splice(e.index, 1)

    if (localStorage.getItem('currentTab') != "") {

      if (document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width != "0px") {
       
        document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width = "0px";
        document.getElementById("main").style.marginRight = "0px";
        var elements = document.getElementsByClassName('container');
        for (var i = 0; i < elements.length; i++) {
          (elements[i] as HTMLElement).style.marginLeft = "70px"
        }

      }
    }

  }

  closeRightBar(e) {

    localStorage.setItem('tabSelected', this.tabs[e.index].header)

    if (localStorage.getItem('currentTab') != "") {

      if (document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width != "0px") {
        console.log(localStorage.getItem('currentTab'))
        document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width = "0px";
        document.getElementById("main").style.marginRight = "0px"; var elements = document.getElementsByClassName('container');
        for (var i = 0; i < elements.length; i++) {
          (elements[i] as HTMLElement).style.marginLeft = "150px"
        }
      }

    }
  }

}
