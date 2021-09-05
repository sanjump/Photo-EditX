import {Component} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TabPanel,TabView } from 'primeng/tabview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'pdfeditor';
  activeIndex: number = 0;
  opened = false;
  filterStatus = false;
  public tabs: any[] = [{
    header: 'Tab 1',
    content : 'PDF1'
  }, {
   
    header: 'Tab 2',
    content:'PDF2'
   } ];
 

constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("open").hidden=true;
  }
    
  add(){
  
    this.tabs.push({
      header: 'Tab 1',
      content : 'PDF1'
    })
  }

    openNav() {
      document.getElementById("mySidebar").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
      document.getElementById("open").hidden=true;
    }

    
    
    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    closeNav() {

      document.getElementById("open").hidden=false;
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }



}
