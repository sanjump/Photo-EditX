import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../node.service';
import { Output, EventEmitter } from '@angular/core';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-filetree',
  templateUrl: './filetree.component.html',
  styleUrls: ['./filetree.component.css']

})
export class FiletreeComponent implements OnInit, OnChanges {

  private ipc: IpcRenderer
  @Input() myFiles: File[]
  @Output() tabs = new EventEmitter<any>();
  @Output() node = new EventEmitter<any>();
  @Output() value = new EventEmitter<any>();
  data: any[] = []
  addedTabs: any[] = []
  gettabs: any[] = []
  public files
  public url = ""
  datavalue:any=[]
  constructor(private service: NodeService) {

  }

  getTabs(value: any) {
    this.tabs.emit(value);
    
  }

  selectedNode(value: any) {
    this.node.emit(value);
    
  }

  setData(value: any) {
    this.value.emit(value);
    
  }


  files1: TreeNode[];
  f: string[] = [
    'H&R block/Appointment Letter_Sanju M P-HRB India (1).pdf',
    'H&R block/h&r_joinee.txt',
    'H&R block/joining/10.Background verification form.doc',
    'H&R block/joining/11.Copy of GMC-Addition Format- Dependant inclusion.xls',
    'H&R block/joining/1Personal Data Form_ HR Block_ ver 1_ (004).docx',
    'H&R block/joining/2Joining Report.doc',
    'H&R block/joining/3Network ID Access Request Form.docx',
    'H&R block/joining/4Access _ ID request form.docx',
    'H&R block/joining/5HRB GTC India _Employee Consent Form.docx',
    'H&R block/joining/6.PFFormword.docx',
    'H&R block/joining/7.Form No.1 (word).pdf.docx',
    'H&R block/joining/8.Gratuity Form F nomination word.docx',
    'H&R block/joining/9.Service Record.docx',
    'H&R block/photo.png',
    'H&R block/sanjump.pdf',
    'H&R block/Self attested/Aadhaar.pdf',
    'H&R block/Self attested/Appointment Letter_Sanju M P-HRB India.pdf',
    'H&R block/Self attested/Marklists.pdf',
    'H&R block/Self attested/Pan.pdf',
    'H&R block/Self attested/Passport.pdf',
    'sanjump.pdf'

  ];

  ngOnChanges() {

    for (var i = 0; i < this.myFiles.length; i++) {
      this.data.push(this.myFiles[i].name);

    }
    this.files1 = this.data.reduce(this.reducePath, [])


  }


  reducePath = (nodes: TreeNode[], path: string) => {
    const split = path.split('/');

    // 2.1
    if (split.length === 1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-file-o'
        }
      ];
    }

    // 2.2
    if (nodes.findIndex(n => n.label === split[0]) === -1) {
      return [
        ...nodes,
        {
          label: split[0],
          icon: 'fa-folder',
          children: this.reducePath([], split.slice(1).join('/'))
        }
      ];
    }

    // 2.3
    return nodes.map(n => {
      if (n.label !== split[0]) {
        return n;
      }

      return Object.assign({}, n, {
        children: this.reducePath(n.children, split.slice(1).join('/'))
      });
    });
  }



  ngOnInit(): void {



    // var f = this.myFiles
    // console.log(f)
    // [
    //   'H&R block/Appointment Letter_Sanju M P-HRB India (1).pdf',
    //   'H&R block/h&r_joinee.txt',
    //   'H&R block/joining/10.Background verification form.doc',
    //   'H&R block/joining/11.Copy of GMC-Addition Format- Dependant inclusion.xls',
    //   'H&R block/joining/1Personal Data Form_ HR Block_ ver 1_ (004).docx',
    //   'H&R block/joining/2Joining Report.doc',
    //   'H&R block/joining/3Network ID Access Request Form.docx',
    //   'H&R block/joining/4Access _ ID request form.docx',
    //   'H&R block/joining/5HRB GTC India _Employee Consent Form.docx',
    //   'H&R block/joining/6.PFFormword.docx',
    //   'H&R block/joining/7.Form No.1 (word).pdf.docx',
    //   'H&R block/joining/8.Gratuity Form F nomination word.docx',
    //   'H&R block/joining/9.Service Record.docx',
    //   'H&R block/photo.png',
    //   'H&R block/sanjump.pdf',
    //   'H&R block/Self attested/Aadhaar.pdf',
    //   'H&R block/Self attested/Appointment Letter_Sanju M P-HRB India.pdf',
    //   'H&R block/Self attested/Marklists.pdf',
    //   'H&R block/Self attested/Pan.pdf',
    //   'H&R block/Self attested/Passport.pdf',
    //   'sanjump.pdf'
    // ];


    // for (var i = 0; i < this.myFiles.length; i++) {
    //  // f.push(this.myFiles[i].name);
    //   console.log(this.myFiles[i].name)
    // }


    // this.nodeService.getFiles().then(files => this.files1 = files);
  }

  nodeSelect(e) {


    this.ipc = (<any>window).require('electron').ipcRenderer;
    this.ipc.send("selectedNode", e.node.label);
    this.ipc.on('data', (event, args) => {
     
     this.datavalue=args

    });
    this.files = this.service.getFiles()
    this.gettabs = this.service.gettabs()
    this.addedTabs = []
    for (var i = 0; i < this.gettabs.length; i++) {
      this.addedTabs.push(this.gettabs[i].header)
    }

    if (this.files && !this.addedTabs.includes(e.node.label)) {



      for (var i = 0; i < this.files.length; i++) {

        if (this.files[i].name == e.node.label) {

          var reader = new FileReader()
          reader.readAsDataURL(this.files[i])
          reader.onload = (event: any) => {

            this.url = event.target.result
            this.service.settabs(e.node.label, this.url);
           
          }

          break
        }

      }

      this.getTabs(this.service.gettabs())

    }



    this.selectedNode(e.node.label)
    this.setData(this.datavalue)
    

  }




}
