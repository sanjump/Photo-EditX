import { Component,ViewChild,AfterViewInit,ElementRef } from '@angular/core';
import WebViewer from '@pdftron/webviewer';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('viewer') viewref:ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    WebViewer({
      path:'../src/assets/lib',
      initialDoc:'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'
    },this.viewref.nativeElement).then(instance=>{
      
    })
  }


}
