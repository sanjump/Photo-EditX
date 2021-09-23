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
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
  }
}
