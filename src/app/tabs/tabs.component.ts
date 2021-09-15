import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { NodeService } from '../node.service';
import { Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements OnInit, OnChanges {

  constructor(private service: NodeService) { }
  @Input() tabs: any[]
  @Input() tabindex: any
  // subscription:Subscription
  tabind=-2
  allTabs: any[] = []
  //public tabs: any[] 
 
  ngOnChanges() {

    this.allTabs = this.tabs
    this.tabind+=1
   
    for(var i=0;i<this.allTabs.length;i++){
      console.log(this.allTabs[i].header)
      if(this.allTabs[i].header==this.tabindex){
       
        this.tabind=i
        break
      }
    }
    console.log(this.tabind)   
  }



  ngOnInit(): void {

        
    //   this.tabs = this.service.gettabs()

  }

  handleChange(e) {

    console.log(e)
  }

  close(e){

    e.close()
    console.log(this.service.gettabs())
    this.service.gettabs().splice(e.index,1)
 //   this.allTabs.splice(e.index,1)
    console.log(this.service.gettabs())
   
    
  }


}
