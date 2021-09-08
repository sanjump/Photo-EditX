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

  myFiles: File[] = [];
  fileSrc: string[] = [];
  

  onFileChange(event) {
    this.myFiles = []
    this.fileSrc = []
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      this.fileSrc.push(URL.createObjectURL(this.myFiles[i]))
    }

  }





  ngAfterViewInit(): void {

    WebViewer({
      path:'../src/assets/lib',  //../src/assets/lib for electron ../../assets/lib for electron
    //initialDoc:'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'
    },this.viewref.nativeElement).then((instance)=>{
      instance.UI.loadDocument('C:\\Users\\mpsan\\Downloads\\notificatation.pdf', { filename: 'notificatation.pdf' });
    })
   
  }


}
