import { Component, OnInit, Input, OnChanges,ChangeDetectorRef, NgZone } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../node.service';
import { Output, EventEmitter } from '@angular/core';
import { IpcRenderer } from 'electron';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.css']

})
export class FiletreeComponent implements OnInit {

  private ipc: IpcRenderer
  changeDetector = ChangeDetectorRef
  
  @Output() tabs = new EventEmitter<any>();
  @Output() node = new EventEmitter<any>();
  @Output() value = new EventEmitter<any>();


  files : any[]=[]
  data: any[] = []
  addedTabs: any[] = []
  gettabs: any[] = []
  myfiles: any[] = []
  url:SafeUrl
  datavalue:any=[]
  filetree: TreeNode[];

  
  constructor(private service: NodeService,private zone:NgZone,private sanitizer:DomSanitizer) {

  }

  getTabs(value: any) {
    this.tabs.emit(value);
    
  }

  selectedNode(value: any) {
    this.node.emit(value);
    
  }

  setData(value: any) {
    this.value.emit(value);
    
  }


  

  reducePath = (nodes: TreeNode[], path: string) => {
    const split = path.split('\\');

    // 2.1
    if (split.length === 1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-file-o'
        }
      ];
    }

    // 2.2
    if (nodes.findIndex(n => n.label === split[0]) === -1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-folder',
          children: this.reducePath([], split.slice(1).join('\\'))
        }
      ];
    }

    // 2.3
    return nodes.map(n => {
      if (n.label !== split[0]) {
        return n;
      }

      return Object.assign({}, n, {
        children: this.reducePath(n.children, split.slice(1).join('\\'))
      });
    });
  }



  ngOnInit(){

   
    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.on('getfile', (event, args) => {
    this.zone.run(() => {

        for (var i = 0; i < args.length; i++) {
        this.data.push(args[i].substring(args[i].lastIndexOf("\\")+1,args[i].length));
        this.myfiles.push(args[i])
        }
        this.filetree = this.data.reduce(this.reducePath, [])
        console.log(this.myfiles)
        this.service.setFiles(this.myfiles)
    
      });
    
    });

    this.ipc.on('getfolder', (event, args) => {
    this.zone.run(() => {

        for (var i = 0; i < args[1].length; i++) {

          this.data.push(args[0].substring(args[0].lastIndexOf("\\")+1,args[0].length)  + "\\" +  args[1][i])
          this.myfiles.push(args[0] + "\\" + args[1][i])
        }
        this.filetree = this.data.reduce(this.reducePath, [])
        console.log(this.myfiles)
        this.service.setFiles(this.myfiles)
    });
    
    });

  }

  nodeSelect(e) {


    if(!(e.node.icon == "fa-folder")){
    
    
    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.send("selectedNode", e.node.label);
    this.ipc.on('data', (event, args) => {
     
     this.datavalue=args

    });
    
    this.files = this.service.getFiles()
    this.gettabs = this.service.gettabs()
    this.addedTabs = []
    for (var i = 0; i < this.gettabs.length; i++) {
      this.addedTabs.push(this.gettabs[i].header)
    }

    if (this.files && !this.addedTabs.includes(e.node.label)) {


      for (var i = 0; i < this.files.length; i++) {

        if (this.files[i].includes(e.node.label) ) {

        

            this.url =  this.sanitizer.bypassSecurityTrustUrl(this.files[i])
            this.service.settabs(e.node.label, this.url);
            break
          

          
        }

      }

      this.getTabs(this.service.gettabs())
      console.log(this.service.gettabs())

    }



    this.selectedNode(e.node.label)
    this.setData(this.datavalue)
    

  }



  }
}
