import { Component, OnInit, Input } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { Output, EventEmitter } from '@angular/core';
import { IpcRenderer } from 'electron';
import { BrowserWindow } from 'electron';
import { Router } from '@angular/router';
import { FilterCommentsService } from '../filter-comments.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  constructor(private router: Router,private filterService:FilterCommentsService) { }

  @Input() tabheader: string
  @Output() textboxes = new EventEmitter<any>();

  ipc: IpcRenderer
  win: BrowserWindow
  comment:string=""
  faCommentAlt = faCommentAlt;
  faExpandArrowsAlt = faExpandArrowsAlt;
  json: any[] = [];
  i: number = 0;
  l: number;
  inputElements: any
  inputTextboxes: any[] = []
  displaySave:boolean
  overlay: any;
  filterData: any = []
  annotations:any
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

  clearFind(){

   
    this.comment="";
    for(var i=0;i<this.annotations.length;i++){
        
          this.annotations[i].style.backgroundColor="white"
        }
       
  }

  search(comment) {

    
    
    
    this.filterService.filter(this.tabheader).subscribe(data => { this.filterData = data })
   
    setTimeout(() => {

       this.annotations = document.getElementsByClassName(this.filterData[0].class)
       for(var i=0;i<this.annotations.length;i++){
        if(this.annotations[i].value.includes(comment) && comment!=""){
          this.annotations[i].style.backgroundColor="yellow"
        }
        else{
          this.annotations[i].style.backgroundColor="white"
        }
       }
       

      
    }, 200);
    
  
  }

  fullScreen() {

    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.send("fullScreen", '');
  }

  

  save(e) {

    this.json = []
    this.inputElements = document.getElementsByClassName("input" + "_" + e.target.id)
    this.overlay = document.getElementById('overlay' + "_" + e.target.id).getBoundingClientRect()
    this.l = this.inputElements.length;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    var date = dd + '-' + mm + '-' + yyyy;
   
    while (this.l--) {
      this.json.push({
        file: this.tabheader,
        date: date,
        type: this.inputElements[this.l].type,
        id: this.inputElements[this.l].id,
        class: this.inputElements[this.l].className,
        value: this.inputElements[this.l].value,
        width: this.inputElements[this.l].style.width,
        height: this.inputElements[this.l].style.height,
        position: {
          left: (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().left - this.overlay.left,
          top: (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().top - this.overlay.top
        }
      });

    }

    if (this.json.length > 0) {
      this.ipc = (<any>window).require('electron').ipcRenderer;
      this.ipc.send("file", this.json);

    }

    this.displaySave=true
  }
}
