import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {

  constructor() { }


  brightness: number = 0

  ngOnInit(): void {
    document.getElementById("rightSidebar").style.width = "0px";

  }

  closeRightBar() {
    document.getElementById("rightSidebar").style.width = "0px";
    document.getElementById("main").style.marginRight = "0px";
    (document.querySelector(".container") as HTMLElement).style.marginLeft = "150px"
  }

  changeBrightness(e) {
   
    document.getElementById('img_messi.jpg').style.filter = "brightness("+(e.value+100)+"%)"
  }

}
