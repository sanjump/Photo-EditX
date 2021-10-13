import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { ExportService } from '../export.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { IpcRenderer } from 'electron';



@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor(private exportService: ExportService) {
    this.format = [
      { name: 'csv', code: '.csv' },
      { name: 'pdf', code: '.pdf' }

    ];

    this.name = ""

  }
  messages: any[] = [];
  ipc: IpcRenderer
  name: string = ""
  date: string = ""
  type: string = ""
  format: any
  json: any = []
  exportfile = []
  status = ""
  options = {
    title: 'Annotation Details',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true,
    headers: ['File', 'Date', 'Comments']
  };


  ngOnInit(): void {
    this.name = localStorage.getItem('fileName')
    localStorage.removeItem('fileName');

  }



  validate(type) {
    if (type != "") {
      this.status = ""
    }

  }

  export(name, date, type) {

    if (type == "") {
      this.status = "Please select type of file"
    }

    else {

      this.status = ""
      this.json = []
      this.exportfile = []

      if (name != "" || date != "") {

        this.status = ""
        this.exportService.export(name, date).subscribe(data => { this.json = data })

        setTimeout(() => {


          for (var i = 0; i < this.json.length; i++) {

            this.exportfile.push({
              file: this.json[i].file,
              date: this.json[i].date,
              comments: this.json[i].value
            })

          }

          if (type.code == ".csv") {
            new AngularCsv(this.exportfile, name + date + type.code, this.options);
          }

          else {

            var doc = new jsPDF();
            doc.text("Annotation details", 15, 10)
            var col = ["File", "Date", "Comments"];
            var rows = [];
            var annotations = this.exportfile;
            annotations.forEach(element => {
              var temp = [element.file, element.date, element.comments];
              rows.push(temp);

            });

            autoTable(doc, { columns: col, body: rows });

            doc.save(name + date + type.code);
          }

        }, 300);
      }

      else {
        this.status = "Please filter by file name or date"
      }



    }



  }

}
