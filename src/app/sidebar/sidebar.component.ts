import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  constructor() { }

  @Output() tabs = new EventEmitter<any>();
  @Output() node = new EventEmitter<any>();


  ngOnInit(): void {
    document.getElementById("leftSidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
  }

  closeNav() {
    document.getElementById("open").hidden = false;
    document.getElementById("leftSidebar").style.width = "0px";
    document.getElementById("main").style.marginLeft = "0px";
    var elements = document.getElementsByClassName('container');
    for (var i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.marginLeft = "70px"
    }
  }

  setTabs(value: any) {
    this.tabs.emit(value);
  }

  setSelectedNode(value: any) {
    this.node.emit(value);
  }

  getTabs(tabs: any) {
    this.setTabs(tabs)
  }

  getSelectedNode(node: any) {
    this.setSelectedNode(node)
  }

}
