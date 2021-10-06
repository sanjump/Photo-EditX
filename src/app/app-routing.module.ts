import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { EditorComponent } from './editor/editor.component';
import { ExportComponent } from './export/export.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ContainerComponent
},
  {
    path:'editor',
    component:EditorComponent
  },
  {
    path:'export',
    component:ExportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
