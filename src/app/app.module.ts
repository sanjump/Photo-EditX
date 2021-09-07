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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FiletreeComponent,
    TabsComponent,
    EditorComponent
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
    HttpClientModule
  ],
  providers: [NodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
