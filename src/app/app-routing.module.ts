import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { EditorComponent } from './editor/editor.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ContainerComponent
},
  {
    path:'editor',
    component:EditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
