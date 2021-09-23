import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

    constructor() { }

    @Input() tabcontent: string
    @Input() tabheader: string

    textboxes: any[] = []

    ngOnInit() {
    }

    setTextboxes(setTextboxes: any) {
        this.textboxes = setTextboxes;
    }

}
