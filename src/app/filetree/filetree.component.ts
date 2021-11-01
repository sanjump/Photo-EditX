import { Component, OnInit, NgZone } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Output, EventEmitter } from '@angular/core';
import { IpcRenderer } from 'electron';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TabService } from '../tab.service';
import { FileService } from '../file.service';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.css']

})

export class FiletreeComponent implements OnInit {

  constructor(private tabService: TabService, private fileService: FileService, private zone: NgZone, private sanitizer: DomSanitizer) { }

  @Output() tabs = new EventEmitter<any>();
  @Output() node = new EventEmitter<any>();

  ipc: IpcRenderer
  url: SafeUrl
  fileTree: TreeNode[];
  files: any[] = []
  data: any[] = []
  addedTabs: any[] = []
  loadedTabs: any[] = []
  myFiles: any[] = []


  ngOnInit() {


    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.on('getfile', (event, args) => {
      this.zone.run(() => {

        for (var i = 0; i < args.length; i++) {
          this.data.push(args[i].substring(args[i].lastIndexOf("\\") + 1, args[i].length));
          this.myFiles.push(args[i])
        }
        this.fileTree = this.data.reduce(this.reducePath, [])
        this.fileService.setFiles(this.myFiles)

      });

    });

    this.ipc.on('getfolder', (event, args) => {
      this.zone.run(() => {

        for (var i = 0; i < args[1].length; i++) {

          this.data.push(args[0].substring(args[0].lastIndexOf("\\") + 1, args[0].length) + "\\" + args[1][i])
          this.myFiles.push(args[0] + "\\" + args[1][i])
        }
        this.fileTree = this.data.reduce(this.reducePath, [])
        this.fileService.setFiles(this.myFiles)
      });

    });

  }

  checkKeydown(e) {

    if (e.key == 'Delete') {

      this.loadedTabs = this.tabService.getTabs()
      for (var i = 0; i < this.fileTree.length; i++) {

        if (this.fileTree[i].icon != "fa-folder") {

          if (this.fileTree[i].label == localStorage.getItem('selectedNode')) {
            this.fileTree.splice(i, 1)
            this.data.splice(i, 1)
            this.myFiles.splice(i, 1)
            this.fileService.setFiles(this.myFiles)

            for (var j = 0; j < this.loadedTabs.length; j++) {
              if (this.loadedTabs[j].header == localStorage.getItem('selectedNode')) {

                this.loadedTabs.splice(j, 1)
                this.getTabs(this.loadedTabs)
                if (j != 0) {
                  this.selectedNode(this.loadedTabs[j - 1].header)
                }
                else {
                  if (this.loadedTabs.length > 0) {
                    this.selectedNode(this.loadedTabs[0].header)
                  }

                }

              }
            }

            break
          }
        }

        else if (this.fileTree[i].icon == "fa-folder" && this.fileTree[i].label != localStorage.getItem('selectedNode')) {
          for (var j = 0; j < this.fileTree[i].children.length; j++) {
            if (this.fileTree[i].children[j].label == localStorage.getItem('selectedNode')) {
              this.fileTree[i].children.splice(j, 1)
              this.data.splice(this.data.indexOf(localStorage.getItem('selectedNode'), 0), 1)
              this.myFiles.splice(this.data.indexOf(localStorage.getItem('selectedNode'), 0), 1)
              this.fileService.setFiles(this.myFiles)
              for (var j = 0; j < this.loadedTabs.length; j++) {
                if (this.loadedTabs[j].header == localStorage.getItem('selectedNode')) {

                  this.loadedTabs.splice(j, 1)
                  this.getTabs(this.loadedTabs)
                  if (j != 0) {
                    this.selectedNode(this.loadedTabs[j - 1].header)
                  }
                  else {
                    if (this.loadedTabs.length > 0) {
                      this.selectedNode(this.loadedTabs[0].header)
                    }

                  }

                }
              }
            }
          }
          break
        }

        else {
          var length = this.fileTree[i].children.length
          console.log(this.loadedTabs.length)
          for (var j = 0; j < length; j++) {


            this.data.splice(this.data.indexOf(this.fileTree[i].children[j].label, 0), 1)
            this.myFiles.splice(this.data.indexOf(this.fileTree[i].children[j].label, 0), 1)
            this.fileService.setFiles(this.myFiles)

          }
          for (var k = 0; k < this.loadedTabs.length; k++) {

            for (var j = 0; j < length; j++) {

              if (this.loadedTabs[k].header == this.fileTree[i].children[j].label) {
                console.log("sd")
                this.loadedTabs.splice(k, 1)
                this.getTabs(this.loadedTabs)
                if (k != 0) {
                  this.selectedNode(this.loadedTabs[k - 1].header)
                }
                else {
                  if (this.loadedTabs.length > 0) {
                    this.selectedNode(this.loadedTabs[0].header)
                  }

                }

              }
            }

          }

          this.fileTree[i].children = []
          this.fileTree.splice(i, 1)
          this.data.splice(i, 1)
          this.myFiles.splice(i, 1)
          this.fileService.setFiles(this.myFiles)
          console.log(this.data)
          console.log(this.fileTree)
          console.log(this.fileService.getFiles())

          


        }


      }

    }
  }
  nodeSelect(e) {

    localStorage.setItem('selectedNode', e.node.label)
    localStorage.setItem('tabSelected',e.node.label)
    
    if (!(e.node.icon == "fa-folder")) {

      this.files = this.fileService.getFiles()
      this.loadedTabs = this.tabService.getTabs()
      this.addedTabs = []
      for (var i = 0; i < this.loadedTabs.length; i++) {
        this.addedTabs.push(this.loadedTabs[i].header)
      }

      if (this.files && !this.addedTabs.includes(e.node.label)) {


        this.ipc.send("selectedNode", e.node.label);

        for (var i = 0; i < this.files.length; i++) {

          if (this.files[i].includes(e.node.label)) {

            this.url = this.files[i]
            this.tabService.setTabs(e.node.label, this.url);
            break

          }
        }
        this.getTabs(this.tabService.getTabs())
      }
      this.selectedNode(e.node.label)
    }

  }


  getTabs(value: any) {
    this.tabs.emit(value);
  }

  selectedNode(value: any) {
    this.node.emit(value);
  }


  reducePath = (nodes: TreeNode[], path: string) => {
    const split = path.split('\\');


    if (split.length === 1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-file-o'
        }
      ];
    }


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


    return nodes.map(n => {
      if (n.label !== split[0]) {
        return n;
      }

      return Object.assign({}, n, {
        children: this.reducePath(n.children, split.slice(1).join('\\'))
      });
    });
  }

}
