import { Component, OnInit, Input } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { Output, EventEmitter } from '@angular/core';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  constructor() {}
 
  @Input() tabheader: string
  @Output() textboxes = new EventEmitter<any>();

  ipc: IpcRenderer
  faCommentAlt = faCommentAlt;
  json: any[] = [];
  i: number = 0;
  l: number;
  inputElements: any
  inputTextboxes: any[] = []
  overlay: any;
  
  
  ngOnInit(): void {
  }

  setTextboxes(value: any) {
    this.textboxes.emit(value);
  }

  addTextbox() {
    this.inputTextboxes.push(this.i + "_" + this.tabheader)
    this.setTextboxes(this.inputTextboxes)
    this.i += 1
  }


  save(e) {

    this.json = []
    this.inputElements = document.getElementsByClassName("input" + "_" + e.target.id)
    this.overlay = document.getElementById('overlay' + "_" + e.target.id).getBoundingClientRect()
    this.l = this.inputElements.length;
    while (this.l--) {
      this.json.push({
        file: this.tabheader, 
        type: this.inputElements[this.l].type,
        id: this.inputElements[this.l].id,
        class:this.inputElements[this.l].className,
        value: this.inputElements[this.l].value,
        width: this.inputElements[this.l].style.width,
        height: this.inputElements[this.l].style.height,
        position: {
          left: (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().left - this.overlay.left,
          top: (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().top - this.overlay.top
        }
      });
     
    }

    if(this.json.length>0){
      this.ipc = (<any>window).require('electron').ipcRenderer;
      this.ipc.send("file", this.json);
  
    }
  }
}
