import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-mainbody',
  templateUrl: './mainbody.component.html',
  styleUrls: ['./mainbody.component.css']
})

export class MainbodyComponent implements OnInit{

  constructor() { }

  @Input() tabs: any[]
  @Input() node: any
  
  ngOnInit(): void {
  }

  openNav() {
    document.getElementById("leftSidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
    var elements = document.getElementsByClassName('container');
    for (var i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.margin = "15px";
      (elements[i] as HTMLElement).style.marginRight = "30px";
    }
    if(document.getElementById("rightSidebar_"+localStorage.getItem('currentTab'))){
      document.getElementById("rightSidebar_"+localStorage.getItem('currentTab')).style.width = "0px";
      document.getElementById("main").style.marginRight = "0px";
    }
    
  }
}
