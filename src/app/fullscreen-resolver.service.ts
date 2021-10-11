import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TabService } from './tab.service';

@Injectable({
  providedIn: 'root'
})
export class FullscreenResolverService {
 
  constructor(private tabService: TabService) {}
  resolve(route: ActivatedRouteSnapshot): string {
    return this.tabService.getTabcontent();
  }
}
