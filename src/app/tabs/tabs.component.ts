import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { NodeService } from '../node.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements OnInit, OnChanges {

  constructor(private service: NodeService) { }
  @Input() tabs: any[]
  // subscription:Subscription
  tabindex=0
  tabss: any[] = []
  //public tabs: any[] 
 
  ngOnChanges() {

    
    this.tabss = this.tabs
    this.tabindex += 1
    console.log(this.tabss)
    console.log(this.tabindex)
  }

  ngOnInit(): void {


    //   this.tabs = this.service.gettabs()

  }

  handleChange(e) {

    console.log(e)
  }

  clos(e){
    console.log(e)
  }

}
