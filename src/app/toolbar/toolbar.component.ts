import { Component, OnInit, Input, NgZone, OnChanges } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { faParagraph } from '@fortawesome/free-solid-svg-icons';
import { Output, EventEmitter } from '@angular/core';
import { IpcRenderer } from 'electron';
import { BrowserWindow } from 'electron';
import { TabService } from '../tab.service';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { faBold } from '@fortawesome/free-solid-svg-icons';
import { faItalic } from '@fortawesome/free-solid-svg-icons';
import { BtnPressedService } from '../btn-pressed.service'
import { faFont } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { ImageModel } from '../ImageModel';
import { AnnotationModel } from '../AnnotationModel';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit, OnChanges {

  constructor(private tabService: TabService, private btnPressedService: BtnPressedService, private zone: NgZone) {

    this.imageObj = new ImageModel()

  }

  @Input() tabheader: string
  @Input() tabcontent: string
  @Input() richTextArray: any[]
  @Output() textboxes = new EventEmitter<any>();
  @Output() paragraphs = new EventEmitter<any>();
  @Output() richText = new EventEmitter<any>();
  @Output() zoomScale = new EventEmitter<any>();
  @Output() rotateDegree = new EventEmitter<any>();



  ipc: IpcRenderer
  win: BrowserWindow
  annotationObj: AnnotationModel
  imageObj: ImageModel
  comment: string = ""
  faSearchPlus = faSearchPlus
  faSearchMinus = faSearchMinus
  faCommentAlt = faCommentAlt
  faSyncAlt = faSyncAlt
  faAdjust = faAdjust
  faBold = faBold
  faItalic = faItalic
  faParagraph = faParagraph
  faFont = faFont
  faExpandArrowsAlt = faExpandArrowsAlt;
  faUndo = faUndo
  faRedo = faRedo
  faEdit = faEdit
  json: any[] = [];
  changesArray: any[] = [];
  countText: number = 0;
  countTextArea: number = 0
  countRichText: number = 0
  l: number;
  inputElements: any
  inputTextboxes: any[] = []
  inputParagraph: any[] = []
  inputRichText: any[] = []
  displaySave: boolean
  overlay: any;
  filterData: any = []
  annotations: any
  tabs: any = []
  url = ""
  scale: number = 1
  degree: number = 0
  btnID: string = ""
  undoBtnId: string = ""
  redoBtnId: string = ""
  removeInput: string = ""
  tabClose: string = ""
  undoCount: number = 0
  redoCount: number = 0
  commands: any[] = []


  ngOnInit(): void {

    localStorage.setItem('currentTab', "")

    this.ipc = (<any>window).require('electron').ipcRenderer;
    if (this.tabheader === undefined) {

      this.tabheader = localStorage.getItem('tabheader')

    }


    this.ipc.once('data', (event, args) => {

      this.zone.run(() => {
        if (args != "No file" && args.length > 0) {

          this.degree = Number(args[0].containerTransform.slice(args[0].containerTransform.lastIndexOf('(') + 1, args[0].containerTransform.lastIndexOf(')') - 3));
          this.rotateDegree.emit(this.degree);

        }
        else {
          this.zoomScale.emit(1)
          this.rotateDegree.emit(0)
        }

      });
    });


  }


  ngOnChanges() {

    this.btnID = "saveBtn_" + this.tabheader
    this.undoBtnId = "undoBtn_" + this.tabheader
    this.redoBtnId = "redoBtn_" + this.tabheader
    this.removeInput = "inputRemoved_" + this.tabheader
    this.tabClose = "tabclose_" + this.tabheader
  }


  setTextboxes(value: any) {
    this.textboxes.emit(value);

  }

  setParagraphs(value: any) {
    this.paragraphs.emit(value);

  }

  setRichText(value: any) {
    this.richText.emit(value);

  }



  setZoomScale(value: any) {
    this.zoomScale.emit(value);

  }

  setrotateDegree(value: any) {
    this.rotateDegree.emit(value);
  }

  addTextbox() {
    this.inputTextboxes.push(this.countText + "_" + this.tabheader)
    this.setTextboxes(this.inputTextboxes)
    this.commands.push({ type: 'text', element: this.countText + "_" + this.tabheader, text: "" })

    this.countText += 1

  }

  addParagraph(e) {

    this.inputParagraph.push("paragraph" + this.countTextArea + "_" + this.tabheader)
    this.setParagraphs(this.inputParagraph)

    this.commands.push({ type: 'textarea', element: "paragraph" + this.countTextArea + "_" + this.tabheader, text: "" })

    this.countTextArea += 1


  }

  addRichText(e) {

    this.inputRichText.push("richText" + this.countRichText + "_" + this.tabheader)
    this.setRichText(this.inputRichText)
    this.commands.push({ type: 'richText', element: "richText" + this.countRichText + "_" + this.tabheader })
    this.countRichText += 1


  }

  openRightBar(e) {

    this.btnPressedService.btnPressed.next(e.target.id)
    document.getElementById("rightSidebar_" + this.tabheader).style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
    document.getElementById("leftSidebar").style.width = "0px";
    document.getElementById("main").style.marginLeft = "0px";
    document.getElementById("open").hidden = false;

    var elements = document.getElementsByClassName('container');
    for (var i = 0; i < elements.length; i++) {

      (elements[i] as HTMLElement).style.marginLeft = "";
    }

    localStorage.setItem('currentTab', this.tabheader)

  }

  clearFind() {

    if (this.annotations) {

      this.comment = "";
      for (var i = 0; i < this.annotations.length; i++) {

        this.annotations[i].style.backgroundColor = "transparent"
      }

    }


  }


  zoomIn() {
    this.scale += .1
    this.setZoomScale(this.scale)

    this.commands.push({ type: 'zoomIn', value: this.scale })
  }

  zoomOut() {
    if (this.scale > 1) {
      this.scale -= .1
      this.setZoomScale(this.scale)

      this.commands.push({ type: 'zoomOut', value: this.scale })
    }

  }

  rotate() {
    this.degree += 90
    this.setrotateDegree(this.degree)

    this.commands.push({ type: 'rotate', value: this.degree })
  }

  makeBold() {

    if (localStorage.getItem('selectedText')) {

      if (document.getElementById(localStorage.getItem('selectedText')).style.fontWeight == "bold") {
        document.getElementById(localStorage.getItem('selectedText')).style.fontWeight = "normal"

        this.commands.push({ type: 'bold', element: localStorage.getItem('selectedText') })
      }
      else {
        document.getElementById(localStorage.getItem('selectedText')).style.fontWeight = "bold"

        this.commands.push({ type: 'bold', element: localStorage.getItem('selectedText') })
      }

    }
  }

  makeItalic() {

    if (localStorage.getItem('selectedText')) {

      if (document.getElementById(localStorage.getItem('selectedText')).style.fontStyle == "italic") {
        document.getElementById(localStorage.getItem('selectedText')).style.fontStyle = "normal"

        this.commands.push({ type: 'italic', element: localStorage.getItem('selectedText') })
      }
      else {
        document.getElementById(localStorage.getItem('selectedText')).style.fontStyle = "italic"

        this.commands.push({ type: 'italic', element: localStorage.getItem('selectedText') })
      }
    }
  }


  onInputRemove() {



    var id = localStorage.getItem('removedItem')

    if (id.includes("paragraph")) {

      this.commands.push({ type: 'removeTextArea', element: id })

    }

    else if (id.includes("richText")) {

      this.commands.push({ type: 'removeRichText', element: id })

    }

    else {

      this.commands.push({ type: 'removeText', element: id })

    }


  }


  undo() {



    if (this.undoCount <= this.commands.length - 1) {

      this.undoCount += 1
      var cmd = this.commands[this.commands.length - this.undoCount]

      if (cmd.type == 'text' && (<HTMLInputElement>document.getElementById('text' + cmd.element)).value == "") {

        document.getElementById('text' + cmd.element).style.display = 'none'
        document.getElementById('btn' + cmd.element).style.display = 'none'
        document.getElementById('cont' + cmd.element).style.display = 'none'
      }

      else if (cmd.type == 'text' && (<HTMLInputElement>document.getElementById('text' + cmd.element)).value != "") {

        this.undoCount -= 1
        cmd.text = (<HTMLInputElement>document.getElementById('text' + cmd.element)).value;
        (<HTMLInputElement>document.getElementById('text' + cmd.element)).value = ""
      }

      else if (cmd.type == 'removeText') {


        document.getElementById('text' + cmd.element).style.display = ''
        document.getElementById('btn' + cmd.element).style.display = ''
        document.getElementById('cont' + cmd.element).style.display = 'flex'
      }


      else if (cmd.type == 'textarea' && (<HTMLInputElement>document.getElementById(cmd.element)).value == "") {
        document.getElementById(cmd.element).style.display = 'none'
      }

      else if (cmd.type == 'textarea' && (<HTMLInputElement>document.getElementById(cmd.element)).value != "") {

        this.undoCount -= 1
        cmd.text = (<HTMLInputElement>document.getElementById(cmd.element)).value;
        (<HTMLInputElement>document.getElementById(cmd.element)).value = ""
      }

      else if (cmd.type == 'removeTextArea') {


        document.getElementById(cmd.element).style.display = ''
      }

      else if (cmd.type == 'richText') {
        document.getElementById(cmd.element).style.display = 'none'
      }

      else if (cmd.type == 'removeRichText') {


        document.getElementById(cmd.element).style.display = ''
      }

      else if (cmd.type == 'bold') {
        document.getElementById(cmd.element).style.fontWeight = "normal"
      }

      else if (cmd.type == 'italic') {
        document.getElementById(cmd.element).style.fontStyle = "normal"
      }

      else if (cmd.type == 'zoomIn') {
        this.setZoomScale(cmd.value - 0.1)
      }

      else if (cmd.type == 'zoomOut') {
        this.setZoomScale(cmd.value + 0.1)
      }
      else if (cmd.type == 'rotate') {

        this.degree -= 90
        this.setrotateDegree(this.degree)

      }
    }




  }


  redo() {



    if (this.undoCount > 0) {
      this.undoCount -= 1
      var cmd = this.commands[this.commands.length - this.undoCount - 1]

      if (cmd.type == 'text' && (<HTMLInputElement>document.getElementById('text' + cmd.element)).style.display == "none") {
        this.undoCount += 1
        document.getElementById('text' + cmd.element).style.display = ''
        document.getElementById('btn' + cmd.element).style.display = ''
        document.getElementById('cont' + cmd.element).style.display = 'flex'
      }
      else if (cmd.type == 'text' && (<HTMLInputElement>document.getElementById('text' + cmd.element)).style.display != "none") {
        (<HTMLInputElement>document.getElementById('text' + cmd.element)).value = cmd.text

      }

      else if (cmd.type == 'textarea' && (<HTMLInputElement>document.getElementById(cmd.element)).style.display == "none") {
        this.undoCount += 1
        document.getElementById(cmd.element).style.display = ''
      }
      else if (cmd.type == 'textarea' && (<HTMLInputElement>document.getElementById(cmd.element)).style.display != "none") {
        (<HTMLInputElement>document.getElementById(cmd.element)).value = cmd.text

      }

      else if (cmd.type == 'richText') {
        document.getElementById(cmd.element).style.display = ''
      }

      else if (cmd.type == 'bold') {
        document.getElementById(cmd.element).style.fontWeight = "bold"

      }
      else if (cmd.type == 'italic') {
        document.getElementById(cmd.element).style.fontStyle = "italic"
      }

      else if (cmd.type == 'zoomIn') {
        this.setZoomScale(cmd.value + 0.1)
      }

      else if (cmd.type == 'zoomOut') {
        this.setZoomScale(cmd.value - 0.1)
      }

      else if (cmd.type == 'rotate') {
        this.degree += 90
        this.setrotateDegree(this.degree)
      }


    }




  }

  search(comment) {


    this.annotations = document.getElementsByClassName("input_" + this.tabheader)
    for (var i = 0; i < this.annotations.length; i++) {
      if (this.annotations[i].value !== undefined) {

        if (this.annotations[i].value.includes(comment) && comment != "") {
          this.annotations[i].style.backgroundColor = "yellow"
        }
        else {
          this.annotations[i].style.backgroundColor = "transparent"
        }
      }
    }

    for (var i = 0; i < this.annotations.length; i++) {
      if (this.annotations[i].value === undefined && this.annotations[i].innerHTML != "") {

        if ((this.annotations[i].innerHTML.includes(comment)) && comment != "") {
          this.annotations[i].style.backgroundColor = "yellow"
        }
        else {
          this.annotations[i].style.backgroundColor = "transparent"
        }
      }
    }



    for (var i = 0; i < this.richTextArray.length; i++) {
      if (this.richTextArray[i].value.includes(comment) && comment != "") {
        document.getElementById(this.richTextArray[i].id).style.backgroundColor = "yellow"

      }
      else {
        document.getElementById(this.richTextArray[i].id).style.backgroundColor = "transparent"

      }
    }

  }

  export() {

    localStorage.setItem('fileName', this.tabheader)
    this.save("export")
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
    localStorage.setItem('width', ((document.querySelector(".container") as HTMLElement).clientWidth).toString())
    localStorage.setItem('height', ((document.querySelector(".container") as HTMLElement).clientHeight).toString())
    this.ipc.send("fullScreen", this.tabheader)
  }



  save(source = "") {

    this.json = []
    this.inputElements = document.getElementsByClassName("input" + "_" + this.tabheader)
    document.getElementById('overlay' + "_" + this.tabheader).style.transform = 'none'
    this.zoomScale.emit(1)
    this.overlay = document.getElementById('overlay' + "_" + this.tabheader).getBoundingClientRect()
    this.l = this.inputElements.length;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var date = dd + '-' + mm + '-' + yyyy;

    this.imageObj.file = this.tabheader
    this.imageObj.date = date
    this.imageObj.containerTransform = document.getElementById('panel' + "_" + this.tabheader).style.transform
    this.imageObj.filters = document.getElementById('img' + "_" + this.tabheader).style.filter

    this.json.push({

      file: this.imageObj.file,
      date: this.imageObj.date,
      containerTransform: this.imageObj.containerTransform,
      filters: this.imageObj.filters,
    })


    while (this.l--) {

      this.annotationObj = new AnnotationModel()

      if (this.inputElements[this.l].value != "" && this.inputElements[this.l].style.display != "none" && !this.inputElements[this.l].id.includes("richText")) {

   
        this.annotationObj.file = this.tabheader
        this.annotationObj.date = date
        this.annotationObj.type = this.inputElements[this.l].type
        this.annotationObj.id = this.inputElements[this.l].id.includes("saved") ? this.inputElements[this.l].id : "saved_" + this.inputElements[this.l].id
        this.annotationObj.class = this.inputElements[this.l].type == 'textarea' ? "input_" + this.tabheader + " p-inputtextarea-resizable" : "input_" + this.tabheader
        this.annotationObj.value = this.inputElements[this.l].value
        this.annotationObj.fontWeight = this.inputElements[this.l].style.fontWeight
        this.annotationObj.fontStyle = this.inputElements[this.l].style.fontStyle
        this.annotationObj.fontFamily = this.inputElements[this.l].style.fontFamily
        this.annotationObj.fontColor = this.inputElements[this.l].style.color
        this.annotationObj.fontSize = this.inputElements[this.l].style.fontSize
        this.annotationObj.width = this.inputElements[this.l].style.width
        this.annotationObj.height = this.inputElements[this.l].style.height
        this.annotationObj.position.left = (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().left - this.overlay.left
        this.annotationObj.position.top = (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().top - this.overlay.top

        this.json.push({
          file: this.annotationObj.file,
          date: this.annotationObj.date,
          type: this.annotationObj.type,
          id: this.annotationObj.id,
          class: this.annotationObj.class,
          value: this.annotationObj.value,
          fontWeight: this.annotationObj.fontWeight,
          fontStyle: this.annotationObj.fontStyle,
          fontFamily: this.annotationObj.fontFamily,
          fontColor: this.annotationObj.fontColor,
          fontSize: this.annotationObj.fontSize,
          width: this.annotationObj.width,
          height: this.annotationObj.height,
          position: {
            left: this.annotationObj.position.left,
            top: this.annotationObj.position.top
          }
        });

      }

      else if (this.inputElements[this.l].style.display != "none" && this.inputElements[this.l].id.includes("richText")) {

        for (var i = 0; i < this.richTextArray.length; i++) {
          if (this.richTextArray[i].id == this.inputElements[this.l].id) {
            var richTextValue = this.richTextArray[i].value
          }
        }
        if (richTextValue != "") {

          this.annotationObj.file = this.tabheader
          this.annotationObj.date = date
          this.annotationObj.type = "richText"
          this.annotationObj.id = this.inputElements[this.l].id.includes("saved") ? this.inputElements[this.l].id : "saved_" + this.inputElements[this.l].id
          this.annotationObj.class = this.inputElements[this.l].className
          this.annotationObj.value = this.inputElements[this.l].nodeName == "DIV" ? this.inputElements[this.l].innerHTML : richTextValue
          this.annotationObj.width = this.inputElements[this.l].nodeName != "DIV" ? (document.querySelector('.p-editor-content') as HTMLElement).style.width : (this.inputElements[this.l] as HTMLElement).style.width
          this.annotationObj.height = this.inputElements[this.l].nodeName != "DIV" ? (document.querySelector('.p-editor-content') as HTMLElement).style.height : (this.inputElements[this.l] as HTMLElement).style.height
          this.annotationObj.position.left = this.inputElements[this.l].nodeName != "DIV" ? (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().left - this.overlay.left + 15 : (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().left - this.overlay.left
          this.annotationObj.position.top = this.inputElements[this.l].nodeName != "DIV" ? (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().top - this.overlay.top + 50 : (this.inputElements[this.l] as HTMLElement).getBoundingClientRect().top - this.overlay.top
         
          this.json.push({
            file: this.annotationObj.file,
            date: this.annotationObj.date,
            type: this.annotationObj.type,
            id: this.annotationObj.id,
            class: this.annotationObj.class,
            value: this.annotationObj.value,
            width: this.annotationObj.width,
            height: this.annotationObj.height,
            position: {
              left: this.annotationObj.position.left,
              top: this.annotationObj.position.top
            }

          });
        }

      }


    }

    if (source == 'tabClose') {


      localStorage.setItem('currentFile', JSON.stringify(this.json))

    }

    else {
      this.ipc.send("file", this.json);
    }

    if (source != 'export' && source != 'tabClose') {
      this.displaySave = true
    }



  }
}
