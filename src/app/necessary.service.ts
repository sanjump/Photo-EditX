import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class NecessaryService {

  constructor() { }
  brightness = new Subject();  
  btnPressed = new Subject();
}
