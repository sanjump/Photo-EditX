import { Component, OnInit,Input,OnChanges } from '@angular/core';
import {BtnPressedService} from '../btn-pressed.service'

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit,OnChanges {

  
  @Input() tabheader: string
  
  constructor(private btnPressedService:BtnPressedService) { 

    this.btnPressedService.btnPressed.subscribe((res:any)=>{    
      this.btnPressed=res
    })

    this.fonts = [
      { name: 'Times New Roman', code: 'Times New Roman' },
      { name: 'Arial', code: 'Arial' },
      { name: 'Courier New', code: 'Courier New' },
      { name: 'Lucida Handwriting', code: 'Lucida Handwriting' },
      { name: 'Copperplate', code: 'Copperplate' }

    ];

  }

  currentBrightness:number
  btnPressed:string
  brightness: number = 0
  fontSize:number=16
  fonts:any
  type: string = ""
  color: string = '#000000';
  rightSidebar:string=""

  ngOnInit(): void {
  
  }

  ngOnChanges(){

    if (this.tabheader === undefined) {

      this.tabheader = localStorage.getItem('tabheader')

    }
     
      this.rightSidebar = "rightSidebar_"+this.tabheader
  }

  closeRightBar() {
    document.getElementById("rightSidebar_"+this.tabheader).style.width = "0px";
    document.getElementById("main").style.marginRight = "0px";
    var elements = document.getElementsByClassName('container');
    for (var i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.marginLeft = "70px"
    }
    
  }

  changeBrightness(e) {
  
    document.getElementById("img"+"_"+this.tabheader).style.filter = "brightness("+(e.value+100)+"%)"
    
  }

  changeFont(type){

    if(localStorage.getItem('selectedText')){

      document.getElementById(localStorage.getItem('selectedText')).style.fontFamily = type.code
    }
   
    
  }

  changeColor(){
    document.getElementById(localStorage.getItem('selectedText')).style.color = this.color
  }

  changeFontSize(e){


    if((<HTMLInputElement>(document.getElementById(localStorage.getItem('selectedText')))).type=="text"){
     
      if(e.value<=20){
        document.getElementById(localStorage.getItem('selectedText')).style.fontSize = e.value + "px"
      }
    }

    else{
      document.getElementById(localStorage.getItem('selectedText')).style.fontSize = e.value + "px"
    }
    
    
  }

}
