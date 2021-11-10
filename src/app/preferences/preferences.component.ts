import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  constructor() { }

  selectedValue:string
  ipc: IpcRenderer
  settings={}

  ngOnInit(): void {
    this.ipc = (<any>window).require('electron').ipcRenderer;
    
  }

  changeTheme(){

      this.settings = 
        {
          'theme':this.selectedValue
        }
      
      
      this.ipc.send("preferences", this.settings);

    
  }

}
