import { Component, OnInit, OnChanges, Input, NgZone } from '@angular/core';
import { clipboard, IpcRenderer } from 'electron';
import { TabService } from '../tab.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Output, EventEmitter } from '@angular/core';
import { BtnPressedService } from '../btn-pressed.service'
@Component({
  selector: 'app-editingpanel',
  templateUrl: './editingpanel.component.html',
  styleUrls: ['./editingpanel.component.css']
})

export class EditingpanelComponent implements OnInit, OnChanges {

  constructor(private zone: NgZone, private tabService: TabService, private sanitizer: DomSanitizer,private btnPressedService: BtnPressedService) {




  }

  @Input() tabheader: string
  @Input() tabcontent: string
  @Input() zoomScale: any
  @Input() textboxes: any[]
  @Input() paragraphs: any[]
  @Input() rotateDegree: any
  @Input() richText: any[]
  
  @Output() richTextArray = new EventEmitter<any>();


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
  richTextValue: any[] = []
  flag: boolean
  mouseDown = false;
  startX: any;
  startY: any;
  scrollLeft: any;
  scrollTop: any;



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

      if(localStorage.getItem('theme')=='light'){
        document.body.style.backgroundColor = "rgb(216 201 203)"
      }
      else{
        document.body.style.backgroundColor = "rgb(51, 29, 32)"
      }

      (document.querySelector(".container") as HTMLElement).style.marginLeft = "";
      (document.querySelector(".container") as HTMLElement).style.margin = "100px auto";
      (document.querySelector(".container") as HTMLElement).style.height = localStorage.getItem('height')+"px";
      (document.querySelector(".container") as HTMLElement).style.width = localStorage.getItem('width')+"px";
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



  setRichTextArray(value: any) {
    this.richTextArray.emit(value);

  }

  formOverlay(args) {

  
    this.data = args

    if (this.data != "No file" && this.data.length > 0) {


      if (!this.display.includes(this.data[0].file)) {

        this.display.push(this.data[0].file)
        document.getElementById('panel' + "_" + this.data[0].file).style.transform = this.data[0].containerTransform
        document.getElementById('img' + "_" + this.data[0].file).style.filter = this.data[0].filters
        var text;

        for (var i = this.data.length-1; i > 0; i--) {

          if (this.data[i].type == "text") {

            text = document.createElement('input')
          }

          else if (this.data[i].type == "textarea") {

            text = document.createElement('textarea')

          }

          else if (this.data[i].type == "richText") {

            text = document.createElement('div')
            text.id = this.data[i].id
            text.className = this.data[i].class
            text.innerHTML = this.data[i].value
            text.contenteditable = "true"
            text.style.width = this.data[i].width
            text.style.height = this.data[i].height
            text.style.position = 'absolute'
            text.style.left = (this.data[i].position.left) + "px"
            text.style.top = (this.data[i].position.top) + "px"
            text.disabled = true
            text.style.backgroundColor = "transparent"
            text.style.border = "none"
            text.style.zIndex = "initial"
            document.getElementById('overlay' + "_" + this.data[i].file).appendChild(text)
          }


          if (this.data[i].type == "text" || this.data[i].type == "textarea") {

            text.id = this.data[i].id
            text.className = this.data[i].class
            text.value = this.data[i].value
            text.style.width = this.data[i].width
            text.style.height = this.data[i].height
            text.style.position = 'absolute'
            text.style.left = (this.data[i].position.left) + "px"
            text.style.top = (this.data[i].position.top) + "px"
            text.disabled = true
            text.style.backgroundColor = "transparent"
            text.style.border = "none"
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

  }



  grabbingCursor(e) {
    if (e.target.id == this.overlay) {
      document.getElementById(this.overlay).style.cursor = "grabbing"
    }
  }


  defaultCursor(e) {
    if (e.target.id == this.overlay) {
      document.getElementById(this.overlay).style.cursor = "default"
    }
  }

  startDragging(e, el) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.startY = e.pageY - el.offsetTop;
    this.scrollLeft = el.scrollLeft;
    this.scrollTop = el.scrollTop;
  }
  stopDragging() {
    this.mouseDown = false;
  }
  moveEvent(e, el) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const y = e.pageY - el.offsetTop;
    const x = e.pageX - el.offsetLeft;
    const scrollX = x - this.startX;
    const scrollY = y - this.startY;
    el.scrollLeft = this.scrollLeft - scrollX;
    el.scrollTop = this.scrollTop - scrollY
  }


  setValue(e, i = "") {

    localStorage.setItem("selectedText", e.target.id)
    this.copyValue = e.target.value
    navigator.clipboard.writeText("")
  }

  duplicateTextbox(e) {



    this.textboxes.push(this.textboxes[0] + "_dup" + this.dupCountTextbox);

    setTimeout(() => {

      (<HTMLInputElement>document.getElementById("text" + this.textboxes[0] + "_dup" + this.dupCountTextbox)).value = this.copyValue;
      (document.getElementById("text" + this.textboxes[0] + "_dup" + this.dupCountTextbox)).style.fontFamily = e.target.style.fontFamily;
      (document.getElementById("text" + this.textboxes[0] + "_dup" + this.dupCountTextbox)).style.fontSize = e.target.style.fontSize;
      (document.getElementById("text" + this.textboxes[0] + "_dup" + this.dupCountTextbox)).style.color = e.target.style.color;
      (document.getElementById("text" + this.textboxes[0] + "_dup" + this.dupCountTextbox)).style.fontStyle = e.target.style.fontStyle;
      (document.getElementById("text" + this.textboxes[0] + "_dup" + this.dupCountTextbox)).style.fontWeight = e.target.style.fontWeight;
      this.dupCountTextbox += 1;

    }, 100);




  }

  duplicateParagraph(e) {


    this.paragraphs.push(this.paragraphs[0] + "_dup" + this.dupCountParagraph);

    setTimeout(() => {

      (<HTMLInputElement>document.getElementById(this.paragraphs[0] + "_dup" + this.dupCountParagraph)).value = this.copyValue;
      (document.getElementById(this.paragraphs[0] + "_dup" + this.dupCountParagraph)).style.fontFamily = e.target.style.fontFamily;
      (document.getElementById(this.paragraphs[0] + "_dup" + this.dupCountParagraph)).style.fontSize = e.target.style.fontSize;
      (document.getElementById(this.paragraphs[0] + "_dup" + this.dupCountParagraph)).style.color = e.target.style.color;
      (document.getElementById(this.paragraphs[0] + "_dup" + this.dupCountParagraph)).style.fontStyle = e.target.style.fontStyle;
      (document.getElementById(this.paragraphs[0] + "_dup" + this.dupCountParagraph)).style.fontWeight = e.target.style.fontWeight;
      this.dupCountParagraph += 1;

    }, 100);



  }




  checkKeydown(e, i) {


    if (e.key == 'Delete') {
      this.remove(i)
    }

  }

  remove(id) {

    localStorage.setItem('removedItem',id)

    if (id.includes("paragraph")) {
      document.getElementById(id).style.display = 'none'
    
      document.getElementById('inputRemoved_'+this.tabheader).click()
    }

    else if (id.includes("richText")) {
      document.getElementById(id).style.display = 'none'
      this.richTextValue.splice(this.richTextValue.indexOf(id, 0), 1)
     
      document.getElementById('inputRemoved_'+this.tabheader).click()
    }

    else {
      document.getElementById('text' + id).style.display = 'none'
      document.getElementById('btn' + id).style.display = 'none'
      document.getElementById('cont' + id).style.display = 'none'
    
      document.getElementById('inputRemoved_'+this.tabheader).click()
    }


  }


  getRichTextValue(e, i) {

    this.flag = false

    for (var j = 0; j < this.richTextValue.length; j++) {

      if (this.richTextValue[j].id == i) {

        this.richTextValue[j].value = e.htmlValue
        this.flag = true
        break

      }


    }

    if (this.flag == false) {

      this.richTextValue.push({
        id: i,
        value: e.htmlValue
      })
    }


    this.setRichTextArray(this.richTextValue)


  }


}



