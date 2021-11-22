import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { HttpClientModule } from '@angular/common/http';
import { TabService } from './tab.service'
import { FileService } from './file.service'
import { SidebarComponent } from './sidebar/sidebar.component';
import { FiletreeComponent } from './filetree/filetree.component';
import { TabsComponent } from './tabs/tabs.component';
import { EditorComponent } from './editor/editor.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContainerComponent } from './container/container.component';
import { MainbodyComponent } from './mainbody/mainbody.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EditingpanelComponent } from './editingpanel/editingpanel.component';
import { TooltipModule } from 'primeng/tooltip';
import { ExportComponent } from './export/export.component';
import { ExportService } from './export.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { DragScrollModule } from 'ngx-drag-scroll';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { SliderModule } from 'primeng/slider';
import { BtnPressedService } from './btn-pressed.service';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from 'primeng/editor';
import { PreferencesComponent } from './preferences/preferences.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { RecentFilesComponent } from './recent-files/recent-files.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';


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
    EditingpanelComponent,
    ExportComponent,
    RightSidebarComponent,
    PreferencesComponent,
    RecentFilesComponent

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
    DragDropModule,
    TooltipModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    PinchZoomModule,
    NgxImageZoomModule,
    DragScrollModule,
    SliderModule,
    ColorPickerModule,
    InputTextareaModule,
    EditorModule,
    RadioButtonModule,
    ConfirmDialogModule


  ],
  providers: [TabService, FileService, ExportService,BtnPressedService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
