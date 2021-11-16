import { Component, OnInit, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
@Component({
  selector: 'app-recent-files',
  templateUrl: './recent-files.component.html',
  styleUrls: ['./recent-files.component.css']
})
export class RecentFilesComponent implements OnInit {

  constructor(private zone: NgZone) { }

  ipc: IpcRenderer
  recent: any[] = []
  recentFilePaths: any[] = []
  ngOnInit(): void {

    
    this.ipc = (<any>window).require('electron').ipcRenderer;

    this.ipc.on("recent", (event, args) => {

      this.recent=[]
      this.recentFilePaths=[]
      this.zone.run(() => {


        for (var i = 0; i < args.length; i++) {
          if(args[i].type=='file'){
            this.recent.push(args[i].value.substring(args[i].value.lastIndexOf("\\") + 1, args[i].value.length));
            this.recentFilePaths.push({type:args[i].type,value:args[i].value})
          }

          else{
            this.recent.push(args[i].value[0].substring(args[i].value[0].lastIndexOf("\\") + 1, args[i].value[0].length));
            this.recentFilePaths.push({type:args[i].type,value:args[i].value})
          }
        
       
        }
       
      });
    });
  }

  openRecent(e){


    this.ipc.send('selectedRecent',this.recentFilePaths[this.recent.indexOf(e.target.id)])
  }

}
