import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-editingpanel',
  templateUrl: './editingpanel.component.html',
  styleUrls: ['./editingpanel.component.css']
})
export class EditingpanelComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() tabheader: string
  @Input() tabcontent: string
  @Input() items: any
  @Input() data: any
  item: any[] = []
  display=[]
  url = ""
  inputname: string = ""
  divname: string = ""
  overlay: string = ""

  ngOnInit(): void {
  }

  remove(id) {


    var cont = document.getElementById('cont' + id)
    cont.removeChild(document.getElementById('text' + id))
    cont.removeChild(document.getElementById('btn' + id))
    // cont.removeChild(document.getElementById('cont' + id))
  }

  ngOnChanges() {

    this.url = this.tabcontent
    this.inputname = "input" + this.tabheader
    this.divname = "div" + this.tabheader
    this.overlay = "overlay" + this.tabheader
    this.item = this.items
    this.setdisplay(this.data)
    
  }

  setdisplay(data){

    if(this.data!="No" && this.data.length>0)
   {
     
      if(!this.display.includes(data[0].file)){
        this.display.push(data[0].file)
        for (var i = 0; i < this.data.length; i++) {
          var div = document.createElement('div')
          div.id = "cont"+i+this.data[i].file.slice(0, -4) + 'jpg'
          div.className = "div"+this.data[i].file.slice(0, -4) + 'jpg'
          var text = document.createElement('input')
          text.id = this.data[i].id
          text.className = this.data[i].class
          text.value = this.data[i].value
          text.style.width = this.data[i].width
          text.style.height = this.data[i].height
          text.style.left = this.data[i].position.left
          text.style.top = this.data[i].position.top
          text.style.position = 'relative'
          document.getElementById('overlay' + this.data[i].file.slice(0, -4) + 'jpg').appendChild(text)
    
        }
      }
    }
  }

}



