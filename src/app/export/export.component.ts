import { Component, OnInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { ExportService } from '../export.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor(private exportService: ExportService) { }

 
  json: any
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

      this.json = []
      this.exportfile = []

      if (name != "" || date != "") {

        this.exportService.export(name, date).subscribe(data => { this.json = data })
        setTimeout(() => {

          for (var i = 0; i < this.json.length; i++) {

            this.exportfile.push({
              file: this.json[i].file,
              date: this.json[i].date,
              value: this.json[i].value
            })

          }

          new AngularCsv(this.exportfile, name + date + type, this.options);
         

        }, 100);
      }

      else {
        this.status = "Please filter by file name or date"
      }



    }



  }

}
