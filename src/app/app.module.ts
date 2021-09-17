import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import {TreeModule} from 'primeng/tree';
import { HttpClientModule } from '@angular/common/http';
import { NodeService } from './node.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FiletreeComponent } from './filetree/filetree.component';
import { TabsComponent } from './tabs/tabs.component';
import { EditorComponent } from './editor/editor.component';
import {ToolbarModule} from 'primeng/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ContainerComponent } from './container/container.component';
import { MainbodyComponent } from './mainbody/mainbody.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EditingpanelComponent } from './editingpanel/editingpanel.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FiletreeComponent,
    TabsComponent,
    EditorComponent,
    ContainerComponent,
    MainbodyComponent,
    ToolbarComponent,
    EditingpanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule,
    TabViewModule,
    TreeModule,
    HttpClientModule,
    ToolbarModule,
    FontAwesomeModule,
    DragDropModule
  ],
  providers: [NodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
