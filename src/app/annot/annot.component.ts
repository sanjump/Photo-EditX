import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { NodeService } from '../node.service';

@Component({
    selector: 'app-annot',
    templateUrl: './annot.component.html',
    styleUrls: ['./annot.component.css']
})

export class AnnotComponent implements OnInit,OnChanges {

    constructor(private service:NodeService) { }

    @Input() tabcontent : string
    faCommentAlt = faCommentAlt;
    json: any[] = [];
    i: number = 0;
    l: number;
    v :any 
    pos: any;
    parent: any;
    item: any[] = []
    url = ""
    

    add() {

        // let text = document.createElement('input');
        // text.type = 'text';
        // text.style.width = "100px"
        // text.style.height="30px"
        this.item.push(this.i)
        this.i += 1
        
        // this.data = this.service.getFiles()
        // console.log(this.data)
        // if(this.data){
        //     var reader = new FileReader()
        //     reader.readAsDataURL(this.data[0])
        //     reader.onload=(event:any)=>{
        //         this.url=event.target.result

        //     }
        // }
        
        // document.querySelector('.my').appendChild(text);


        // let row = document.createElement('div');
        // row.className = 'row';
        // row.innerHTML = `
        //   <br>
        //   <input type="text" style="width: 100px;"/>`;
        // document.querySelector('.overlay').appendChild(row);
    }

    remove(id) {
        console.log(id)
        var cont = document.querySelector('#cont' + id)
        cont.removeChild(document.getElementById('text' + id))
        cont.removeChild(document.getElementById('btn' + id))
        cont.removeChild(document.getElementById('cont' + id))
    }

    save() {
        this.json = []
        this.pos = document.querySelectorAll('.my')
        this.parent = document.querySelector('.box').getBoundingClientRect()
        this.v=document.getElementsByClassName("InputText")
        console.log(this.pos)
        console.log(this.v)
        this.l = this.v.length;
        while (this.l--) {
            this.json.push({
                type: this.v[this.l].type,
                id: this.v[this.l].id,
                value: this.v[this.l].value,
                width: this.v[this.l].style.width,
                height: this.v[this.l].style.height,
                position: {
                    left: (this.pos[this.l] as HTMLElement).getBoundingClientRect().left - this.parent.left,
                    top: (this.pos[this.l] as HTMLElement).getBoundingClientRect().top - this.parent.top
                }
            });
            console.log(this.json)
            console.log(this.parent.left)
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

ngOnChanges(){
    
    this.url=this.tabcontent

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
