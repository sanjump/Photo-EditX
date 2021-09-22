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

  private ipc: IpcRenderer

  constructor() {

  }

  openModal() {
    this.ipc = (<any>window).require('electron').ipcRenderer;
    console.log("Open a modal");
    this.ipc.send("openModal", "dasdasd");
  }
  @Input() tabheader: string
  @Output() items = new EventEmitter<any>();
  faCommentAlt = faCommentAlt;
  json: any[] = [];
  i: number = 0;
  l: number;
  v: any
  pos: any;
  parent: any;
  item: any[] = []

  ngOnInit(): void {
  }

  setItems(value: any) {
    this.items.emit(value);
  }

  add() {

    // let text = document.createElement('input');
    // text.type = 'text';
    // text.style.width = "100px"
    // text.style.height="30px"
    this.item.push(this.i + this.tabheader)
    this.setItems(this.item)
    this.i += 1

    // this.data = this.service.getFiles()
    // console.log(this.data)
    // if(this.data){
    //     var reader = new FileReader()
    //     reader.readAsDataURL(this.data[0])
    //     reader.onload=(event:any)=>{
    //         this.url=event.target.result

    //     }
    // }

    // document.querySelector('.my').appendChild(text);
    // let row = document.createElement('div');
    // row.className = 'row';
    // row.innerHTML = `
    //   <br>
    //   <input type="text" style="width: 100px;"/>`;
    // document.querySelector('.overlay').appendChild(row);
  }


  save(e) {

    this.json = []
    // this.pos = document.getElementsByClassName("cdk-drag div"+e.target.id)
    this.parent = document.getElementById('overlay' + e.target.id).getBoundingClientRect()
    this.v = document.getElementsByClassName("input" + e.target.id)
   
    this.l = this.v.length;
    while (this.l--) {
      this.json.push({
        file: this.tabheader, //.substring(0,this.tabheader.lastIndexOf(".")+1) + "json"
        type: this.v[this.l].type,
        id: this.v[this.l].id,
        class:this.v[this.l].className,
        value: this.v[this.l].value,
        width: this.v[this.l].style.width,
        height: this.v[this.l].style.height,
        position: {
          left: (this.v[this.l] as HTMLElement).getBoundingClientRect().left,
          top: (this.v[this.l] as HTMLElement).getBoundingClientRect().top
        }
      });
     
    }

    if(this.json.length>0){
      this.ipc = (<any>window).require('electron').ipcRenderer;
      this.ipc.send("file", this.json);
  
    }

   
  }


}
