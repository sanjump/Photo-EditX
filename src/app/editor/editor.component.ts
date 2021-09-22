import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { NodeService } from '../node.service';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

    constructor(private service:NodeService) { }

    @Input() tabcontent : string
    @Input() tabheader : string
  

    item: any[] = []
   
    
    setItems(items: any) {
        this.item = items;
      }

        
    ngOnInit() {

        

    }

  

}
