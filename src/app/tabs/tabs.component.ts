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

  tabIndex=0

  ngOnInit(): void {
  }

  ngOnChanges() {

    setTimeout(() => {

      for(var i=0;i<this.tabs.length;i++){
   
        if(this.tabs[i].header==this.node){
  
          this.tabIndex=i
          break
  
        }
      }
    }, 10);
  
  }


  close(e){

    e.close()
    this.tabService.getTabs().splice(e.index,1)
  }
  
}
