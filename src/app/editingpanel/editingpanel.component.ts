import { Component, OnInit,OnChanges,Input } from '@angular/core';

@Component({
  selector: 'app-editingpanel',
  templateUrl: './editingpanel.component.html',
  styleUrls: ['./editingpanel.component.css']
})
export class EditingpanelComponent implements OnInit,OnChanges {

  constructor() { }
  @Input() tabheader : string
  @Input() tabcontent : string
  @Input() items : any
  item:any[]=[]
  url = ""
  inputname:string=""
  divname:string=""
  overlay:string=""

  ngOnInit(): void {
  }

  remove(id) {

    
    var cont = document.getElementById('cont' + id)
    cont.removeChild(document.getElementById('text' + id))
    cont.removeChild(document.getElementById('btn' + id))
   // cont.removeChild(document.getElementById('cont' + id))
}

ngOnChanges(){
    
  this.url=this.tabcontent
  this.inputname = "input"+this.tabheader
  this.divname = "div" + this.tabheader
  this.overlay = "overlay" + this.tabheader
  this.item=this.items

}

}
