import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { TabService } from '../tab.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TabsComponent implements OnInit, OnChanges {

  constructor(private tabService: TabService) { }

  @Input() tabs: any[]
  @Input() node: any

  tabIndex = 0

  ngOnInit(): void {
  }

  ngOnChanges() {



    setTimeout(() => {

      for (var i = 0; i < this.tabs.length; i++) {

        if (this.tabs[i].header == this.node) {

          this.tabIndex = i
          break

        }
      }

      if (this.tabs.length > 0) {
        console.log(localStorage.getItem('theme'))
        if (localStorage.getItem('theme') == 'dark') {

          (document.querySelector('.p-tabview') as HTMLElement).style.backgroundColor = "#111";
          (document.querySelector('.p-tabview .p-tabview-panels') as HTMLElement).style.backgroundColor = "rgb(51, 29, 32)";
        }

        else {
          console.log(localStorage.getItem('theme'));
          (document.querySelector('.p-tabview') as HTMLElement).style.backgroundColor = "#6a6a6b";
          (document.querySelector('.p-tabview .p-tabview-panels') as HTMLElement).style.backgroundColor = "rgb(216 201 203)";
        }


      }
    }, 200);

  }


  close(e) {

    e.close()
    this.tabService.getTabs().splice(e.index, 1)

    if (localStorage.getItem('currentTab') != "") {

      if (document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width != "0px") {
        console.log(localStorage.getItem('currentTab'))
        document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width = "0px";
        document.getElementById("main").style.marginRight = "0px";
        var elements = document.getElementsByClassName('container');
        for (var i = 0; i < elements.length; i++) {
          (elements[i] as HTMLElement).style.marginLeft = "150px"
        }

      }
    }

  }

  closeRightBar(e) {

    localStorage.setItem('tabSelected', this.tabs[e.index].header)

    if (localStorage.getItem('currentTab') != "") {

      if (document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width != "0px") {
        console.log(localStorage.getItem('currentTab'))
        document.getElementById("rightSidebar_" + localStorage.getItem('currentTab')).style.width = "0px";
        document.getElementById("main").style.marginRight = "0px"; var elements = document.getElementsByClassName('container');
        for (var i = 0; i < elements.length; i++) {
          (elements[i] as HTMLElement).style.marginLeft = "150px"
        }
      }

    }
  }

}
