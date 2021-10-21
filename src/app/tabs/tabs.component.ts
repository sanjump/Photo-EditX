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
    }, 100);

  }


  close(e) {

    e.close()
    this.tabService.getTabs().splice(e.index, 1)

    document.getElementById("rightSidebar").style.width = "0px";
    document.getElementById("main").style.marginRight = "0px";
    var elements = document.getElementsByClassName('container');
    for (var i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.marginLeft = "150px"
    }

  }

  closeRightBar() {
    if (document.getElementById("rightSidebar").style.width != "0px") {
      document.getElementById("rightSidebar").style.width = "0px";
      document.getElementById("main").style.marginRight = "0px"; var elements = document.getElementsByClassName('container');
      for (var i = 0; i < elements.length; i++) {
        (elements[i] as HTMLElement).style.marginLeft = "150px"
      }
    }

  }

}
