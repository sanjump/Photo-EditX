import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class TabsComponent implements OnInit {

  constructor() { }
 
  ngOnInit(): void {
  }

  public tabs: any[] = [{
    header: 'Tab 1',
    content: 'PDF1'
  }, {

    header: 'Tab 2',
    content: 'PDF2'
  }, {

    header: 'Tab 3',
    content: 'PDF3'
  }];


}
