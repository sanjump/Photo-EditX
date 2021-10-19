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
    zoomScale: any = ""
    textboxes: any[] = []
    rotateDegree:any=""
    ngOnInit() {
    }

    ngOnChanges(){

      
    }

    setrotateDegree(setrotateDegree: any) {
        this.rotateDegree = setrotateDegree;
    }

    setTextboxes(setTextboxes: any) {
        this.textboxes = setTextboxes;
    }

    
  setZoomScale( setZoomScale: any) {
      this.zoomScale = setZoomScale
  }

}
