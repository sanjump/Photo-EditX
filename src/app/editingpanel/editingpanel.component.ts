import { Component, OnInit, OnChanges, Input, NgZone} from '@angular/core';
import { IpcRenderer } from 'electron';
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
  @Input() textboxes: any

  ipc: IpcRenderer
  data: any
  display = []
  url: SafeUrl
  inputname: string = ""
  divname: string = ""
  overlay: string = ""

  

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


  formOverlay(args) {
    
    this.data = args

    if (this.data != "No file" && this.data.length > 0) {


      if (!this.display.includes(this.data[0].file)) {

        this.display.push(this.data[0].file)

        for (var i = 0; i < this.data.length; i++) {


          var text = document.createElement('input')
          text.id = this.data[i].id
          text.className = this.data[i].class
          text.value = this.data[i].value
          text.style.width = this.data[i].width
          text.style.height = this.data[i].height
          text.style.position = 'absolute'
          text.style.left = this.data[i].position.left + "px"
          text.style.top = this.data[i].position.top + "px"
          text.disabled = true
          text.style.backgroundColor = "white"
          text.style.zIndex = "initial"
          document.getElementById('overlay' + "_" + this.data[i].file).appendChild(text)

        }
      }
    }

  }


  ngOnChanges() {

    if (this.tabheader === undefined) {
      document.getElementById("panel").style.width = "100vw"
      document.getElementById("panel").style.height = "85vh"
      document.getElementById("panel").style.marginLeft = "100px"
      this.url = this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem('imgUrl'));  
      this.tabheader = localStorage.getItem('tabheader')
      localStorage.removeItem('imgUrl');
      
      
    }

    this.inputname = "input" + "_" + this.tabheader
    this.divname = "div" + "_" + this.tabheader
    this.overlay = "overlay" + "_" + this.tabheader

  }

  remove(id) {

    var cont = document.getElementById('cont' + id)
    cont.removeChild(document.getElementById('text' + id))
    cont.removeChild(document.getElementById('btn' + id))

  }


}



