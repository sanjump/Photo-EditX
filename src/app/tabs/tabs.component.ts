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
  @Input() node: any
  @Input() value: any
 // subscription:Subscription
  tabind=-2
  allTabs: any[] = []
  data:any
  //public tabs: any[] 
 
  ngOnChanges() {

    this.data=this.value
    
    this.allTabs = this.tabs
    this.tabind+=1
   
    for(var i=0;i<this.allTabs.length;i++){
   
      if(this.allTabs[i].header==this.node){
       
        this.tabind=i
        break
      }
    }
     
  }



  ngOnInit(): void {

    //    this.subscription=this.service.tab$.subscribe(tab=>this.allTabs=tab)
    //   this.tabs = this.service.gettabs()

  }

  handleChange(e) {

    console.log(e)
  }

  close(e){

    e.close()
   
    this.service.gettabs().splice(e.index,1)
 //   this.allTabs.splice(e.index,1)
   
   
    
  }


}
