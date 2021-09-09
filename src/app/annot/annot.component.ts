import { Component, OnInit } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-annot',
    templateUrl: './annot.component.html',
    styleUrls: ['./annot.component.css']
})

export class AnnotComponent implements OnInit {
   
    constructor() { }

    faCommentAlt = faCommentAlt;
    json: any[] = [];
    i: number;
    l: number;
    v = document.getElementsByTagName('input')
    B = document.getElementsByTagName('button')
 

    add() {

        let text = document.createElement('input');
        text.className = 'InputText';
        text.type = 'text';
        text.style.width = "80px"
        document.querySelector('.overlay').appendChild(text);

        // let row = document.createElement('div');
        // row.className = 'row';
        // row.innerHTML = `
        //   <br>
        //   <input type="text" style="width: 100px;"/>`;
        // document.querySelector('.overlay').appendChild(row);
    }

    save() {

        this.l = this.v.length;
        while (this.l--) {
            this.json.push({
                type: this.v[this.l].type,
                value: this.v[this.l].value,
                width: this.v[this.l].style.width,
                height: this.v[this.l].style.height,
                position: { left: this.v[this.l].offsetLeft, top: this.v[this.l].offsetTop }
            });
            console.log(this.json)
        }

        var A = document.createElement('a');
        A.download = 'data.json';
        A.textContent = 'data.json';
        A.href = 'data:application/json;base64,' +
            window.btoa(unescape(encodeURIComponent(JSON.stringify(this.json))))
        document.body.appendChild(A);

        A.click();
        document.body.removeChild(A);

    }


    ngOnInit() {


        // document.getElementById('save').addEventListener('click', function () {
        //     // retrieve the canvas data
        //     var canvasContents = canvas.toDataURL(); // a data URL of the current canvas image
        //     var data = { image: canvasContents, date: Date.now() };
        //     var string = JSON.stringify(data);

        //     // create a blob object representing the data as a JSON string
        //     var file = new Blob([string], {
        //         type: 'application/json'
        //     });

        //     // trigger a click event on an <a> tag to open the file explorer
        //     var a = document.createElement('a');
        //     a.href = URL.createObjectURL(file);
        //     a.download = 'data.json';
        //     document.body.appendChild(a);
        //     a.click();
        //     document.body.removeChild(a);
        // });

        // // event handler for the load button
        // document.querySelector('#load').addEventListener('change', function () {
        //     if (this.files[0]) {
        //         // read the contents of the first file in the <input type="file">
        //         reader.readAsText(this.files[0]);
        //     }
        // });

        // // this function executes when the contents of the file have been fetched
        // reader.onload = function () {
        //     var data = JSON.parse(reader.result.toString());
        //     var image = new Image();
        //     image.onload = function () {
        //         ctx.clearRect(0, 0, canvas.width, canvas.height);
        //         ctx.drawImage(image, 0, 0); // draw the new image to the screen
        //     }
        //     image.src = data.image; // data.image contains the data URL
        // };

    }

}
