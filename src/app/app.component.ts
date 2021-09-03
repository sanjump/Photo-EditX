import {Component, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pdfeditor';
  @ViewChild(MatTabGroup, {read: MatTabGroup})
  public tabGroup: MatTabGroup;
  @ViewChildren(MatTab, {read: MatTab})
  public tabNodes: QueryList<MatTab>;
  myFiles: File[] = [];
  fileSrc: string[] = [];
  public closedTabs = [];
  public tabs = [{
    tabType: 0,
    name: 'File1'
  }, {
    tabType: 1,
    name: 'File2'
  },{
    tabType: 2,
    name: 'File3'
  }];

  closeTab(index: number) {
    event.stopPropagation();
    this.closedTabs.push(index);
    this.tabGroup.selectedIndex = this.tabNodes.length - 1;
  }

  addFile(){
    this.tabs.push({tabType: 3,
      name: 'Main'})
    
  }

  onFileChange(event) {
    this.myFiles = []
    this.fileSrc = []
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      this.fileSrc.push(URL.createObjectURL(this.myFiles[i]))

    }


  }

  geturl(i) {

    return this.sanitizer.bypassSecurityTrustUrl(this.fileSrc[i])
  }

  constructor(private sanitizer: DomSanitizer) {


  }



}
