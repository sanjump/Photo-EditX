import { Component, OnInit, Input } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { Output, EventEmitter } from '@angular/core';
import { IpcRenderer } from 'electron';
import { BrowserWindow } from 'electron';
import { FilterCommentsService } from '../filter-comments.service'
import { TabService } from '../tab.service';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

  constructor(private filterService: FilterCommentsService, private tabService: TabService) {

  }

  @Input() tabheader: string
  @Input() tabcontent: string
  @Output() textboxes = new EventEmitter<any>();
  @Output() zoomScale = new EventEmitter<any>();

  ipc: IpcRenderer
  win: BrowserWindow
  comment: string = ""
  faSearchPlus = faSearchPlus
  faSearchMinus = faSearchMinus
  faCommentAlt = faCommentAlt;
  faExpandArrowsAlt = faExpandArrowsAlt;
  json: any[] = [];
  i: number = 0;
  l: number;
  inputElements: any
  inputTextboxes: any[] = []
  displaySave: boolean
  overlay: any;
  filterData: any = []
  annotations: any
  tabs: any = []
  url = ""
  scale: number = 1;

  ngOnInit(): void {

    this.ipc = (<any>window).require('electron').ipcRenderer;
    if (this.tabheader === undefined) {

      this.tabheader = localStorage.getItem('tabheader')

    }

  }

  setTextboxes(value: any) {
    this.textboxes.emit(value);
  }

  setZoomScale(value: any) {
    this.zoomScale.emit(value);
   
  }

  addTextbox() {
    this.inputTextboxes.push(this.i + "_" + this.tabheader)
    this.setTextboxes(this.inputTextboxes)
    this.i += 1

  }

  clearFind() {


    this.comment = "";
    for (var i = 0; i < this.annotations.length; i++) {

      this.annotations[i].style.backgroundColor = "white"
    }

  }


  zoomIn() {
    this.scale += .1
    this.setZoomScale(this.scale)
  }

  zoomOut() {
    if (this.scale > 1) {
      this.scale -= .1
      this.setZoomScale(this.scale)
    }

  }
  search(comment) {


    this.filterService.filter(this.tabheader).subscribe(data => { this.filterData = data })

    setTimeout(() => {

      this.annotations = document.getElementsByClassName(this.filterData[0].class)
      console.log(this.annotations)
      console.log(this.filterData[0].class)
      for (var i = 0; i < this.annotations.length; i++) {
        if (this.annotations[i].value.includes(comment) && comment != "") {
          this.annotations[i].style.backgroundColor = "yellow"
        }
        else {
          this.annotations[i].style.backgroundColor = "white"
        }
      }

    }, 200);
  }

  export() {

    localStorage.setItem('fileName', this.tabheader)
    this.ipc.send("export", '');
  }


  fullScreen() {

    this.tabs = this.tabService.getTabs()
    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].header == this.tabheader) {
        this.url = this.tabs[i].content
        break
      }
    }
    localStorage.setItem('tabheader', this.tabheader)
    localStorage.setItem('imgUrl', this.url)
    this.ipc.send("fullScreen", this.tabheader)
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

      this.ipc.send("file", this.json);

    }

    this.displaySave = true
  }
}
