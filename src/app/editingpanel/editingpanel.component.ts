import { Component, OnInit, OnChanges, Input, NgZone } from '@angular/core';
import { clipboard, IpcRenderer } from 'electron';
import { TabService } from '../tab.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-editingpanel',
  templateUrl: './editingpanel.component.html',
  styleUrls: ['./editingpanel.component.css']
})

export class EditingpanelComponent implements OnInit, OnChanges {

  constructor(private zone: NgZone, private tabService: TabService, private sanitizer: DomSanitizer) { }

  @Input() tabheader: string
  @Input() tabcontent: string
  @Input() zoomScale: any
  @Input() textboxes: any[]
  @Input() paragraphs: any[]
  @Input() rotateDegree: any

  ipc: IpcRenderer
  data: any
  display = []
  url: SafeUrl
  inputname: string = ""
  divname: string = ""
  overlay: string = ""
  imgname: string = ""
  panel: string = ""
  scale: any
  degree: any
  imgDegree: any
  copyValue: string = ""
  dupCountTextbox: number = 1
  dupCountParagraph: number = 1
  reduceScale: string = "1,1"

  ngOnInit() {


    this.ipc = (<any>window).require('electron').ipcRenderer;

    this.ipc.once('loadScreen', (event, args) => {

      this.formOverlay(args)

    });

    this.ipc.once('data', (event, args) => {
      this.url = this.sanitizer.bypassSecurityTrustUrl(this.tabcontent)
      this.zone.run(() => {

        this.formOverlay(args)

      });
    });
  }



  ngOnChanges() {
  

    if (this.tabheader === undefined) {

      (document.querySelector(".container") as HTMLElement).style.marginLeft = "170px";
      (document.querySelector(".container") as HTMLElement).style.marginTop = "90px";
      document.getElementById("fullScreen_btn").hidden = true
      this.url = this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem('imgUrl'));
      this.tabheader = localStorage.getItem('tabheader')
      localStorage.removeItem('imgUrl');

    }

    this.scale = this.zoomScale
    this.degree = this.rotateDegree
    this.imgDegree = this.rotateDegree - 90
    if (this.degree / 90 % 2 != 0) {
      this.reduceScale = "0.45,0.45"

    }

    else {
      this.reduceScale = "1,1"
    }
    this.inputname = "input" + "_" + this.tabheader
    this.divname = "div" + "_" + this.tabheader
    this.overlay = "overlay" + "_" + this.tabheader
    this.imgname = "img" + "_" + this.tabheader
    this.panel = "panel" + "_" + this.tabheader

  }





  formOverlay(args) {

    this.data = args

    if (this.data != "No file" && this.data.length > 0) {


      if (!this.display.includes(this.data[0].file)) {

        this.display.push(this.data[0].file)
        document.getElementById('img' + "_" + this.data[0].file).style.transform = this.data[0].imgTransform
        document.getElementById('panel' + "_" + this.data[0].file).style.transform = this.data[0].containerTransform
        document.getElementById('img' + "_" + this.data[0].file).style.filter = this.data[0].filters

        for (var i = 0; i < this.data.length; i++) {


          var text = document.createElement('input')
          text.id = this.data[i].id
          text.type = this.data[i].type
          text.className = this.data[i].class
          text.value = this.data[i].value
          text.style.width = this.data[i].width
          text.style.height = this.data[i].height
          text.style.position = 'absolute'
          text.style.left = (this.data[i].position.left) + "px"
          text.style.top = (this.data[i].position.top) + "px"
          text.disabled = true
          text.style.backgroundColor = "white"
          text.style.zIndex = "initial"
          text.style.fontWeight = this.data[i].fontWeight
          text.style.fontStyle = this.data[i].fontStyle
          text.style.fontFamily = this.data[i].fontFamily
          text.style.color = this.data[i].fontColor
          text.style.fontSize = this.data[i].fontSize
          document.getElementById('overlay' + "_" + this.data[i].file).appendChild(text)

        }
      }
    }

  }


  setValue(e) {
    localStorage.setItem("selectedText",e.target.id)
    this.copyValue = e.target.value
    navigator.clipboard.writeText("")
  }

  duplicateTextbox() {

    this.textboxes.push(this.textboxes[0] + "_dup" + this.dupCountTextbox);

    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("text" + this.textboxes[0] + "_dup" + this.dupCountTextbox)).value = this.copyValue
      this.dupCountTextbox += 1
    }, 100);



  }

  duplicateParagraph() {

    this.paragraphs.push(this.paragraphs[0] + "_dup" + this.dupCountParagraph);

    setTimeout(() => {
      (<HTMLInputElement>document.getElementById(this.paragraphs[0] + "_dup" + this.dupCountParagraph)).value = this.copyValue
      this.dupCountParagraph += 1
    }, 100);



  }




  checkDelete(e,i){

   
    if(e.key=='Delete'){
      this.remove(i)
    }

  }

  remove(id) {

    if(id.includes("paragraph")){
      document.getElementById(id).style.display = 'none'
    }
   
   else{
    document.getElementById('text' + id).style.display = 'none'
    document.getElementById('btn' + id).style.display = 'none'
    document.getElementById('cont' + id).style.display = 'none'
   }
    

  }


}



