import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TabPanel, TabView } from 'primeng/tabview';
import { NodeService } from './node.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'pdfeditor';
  activeIndex: number = 0;
  opened = false;
  files1: TreeNode[];
  files2: TreeNode[];
  filterStatus = false;
  files3: TreeNode[];

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
  public tabs: any[] = [{
    header: 'Tab 1',
    content: 'PDF1'
  }, {

    header: 'Tab 2',
    content: 'PDF2'
  }];


  constructor(private primengConfig: PrimeNGConfig, private nodeService: NodeService) { }

  ngOnInit() {
    
    this.primengConfig.ripple = true;
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
    const f = [
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
      'h&r_joinee.txt'
    ];

    this.files1 = f.reduce(this.reducePath, []);
    // this.nodeService.getFiles().then(files => this.files1 = files);


  }

  add() {

    this.tabs.push({
      header: 'Tab 1',
      content: 'PDF1'
    })
  }

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("open").hidden = true;
  }




  closeNav() {

    document.getElementById("open").hidden = false;
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  expandAll() {
    this.files2.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.files2.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  nodeSelect(event) {
    if (event.node['label'] == "Expenses.doc") {
      document.getElementById('main').hidden = true;
    }
    else {
      document.getElementById('main').hidden = false;
    }
  }



}
