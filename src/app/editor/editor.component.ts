import { Component, OnInit, Input ,OnChanges} from '@angular/core';
import { TabService } from '../tab.service';
@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit,OnChanges {

    constructor(private tabService:TabService) { }

    @Input() tabcontent: string
    @Input() tabheader: string

    textboxes: any[] = []

    ngOnInit() {
    }

    ngOnChanges(){

      
    }

    setTextboxes(setTextboxes: any) {
        this.textboxes = setTextboxes;
    }

}
