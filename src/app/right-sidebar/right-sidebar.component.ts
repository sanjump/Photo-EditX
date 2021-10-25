import { Component, OnInit } from '@angular/core';
import {NecessaryService} from '../necessary.service'

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {

  constructor(private necessaryService:NecessaryService) { 
    this.necessaryService.brightness.subscribe((res: any) => {  
      this.currentBrightness = res.slice(res.indexOf('(')+1,res.indexOf('%'))
      if(this.currentBrightness.toString()==""){
               this.brightness=0
      }
      else if(this.brightness!=0){

               this.brightness = this.currentBrightness-100
      }
      
    }) 

    this.necessaryService.btnPressed.subscribe((res:any)=>{    
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
  fontSize:number=20
  fonts:any
  type: string = ""
  color: string = '#000000';
  ngOnInit(): void {
    document.getElementById("rightSidebar").style.width = "0px";

  }

  closeRightBar() {
    document.getElementById("rightSidebar").style.width = "0px";
    document.getElementById("main").style.marginRight = "0px";
    var elements = document.getElementsByClassName('container');
    for (var i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.marginLeft = "150px"
    }
    
  }

  changeBrightness(e) {
  
    document.getElementById("img"+"_"+localStorage.getItem('imgName')).style.filter = "brightness("+(e.value+100)+"%)"
  }

  changeFont(type){
   
    document.getElementById(localStorage.getItem('selectedText')).style.fontFamily = type.code
  }

  changeColor(){
    document.getElementById(localStorage.getItem('selectedText')).style.color = this.color
  }

  changeFontSize(e){


    if((<HTMLInputElement>(document.getElementById(localStorage.getItem('selectedText')))).type=="text"){
      var size = document.getElementById(localStorage.getItem('selectedText')).style.fontSize.slice(0,-2)
      if(Number(size)<=20){
        document.getElementById(localStorage.getItem('selectedText')).style.fontSize = e.value + "px"
      }
    }

    else{
      document.getElementById(localStorage.getItem('selectedText')).style.fontSize = e.value + "px"
    }
    
    
  }

}
