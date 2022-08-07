import { UserService } from './core/services/user.service';
import { SessionService } from 'src/app/modules/main-module/services/sessions.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { ConfigSidebarComponent } from './shared/components/config-sidebar/config-sidebar.component';

// Prime
import { DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { MenubarModule } from 'primeng/menubar';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineModule } from 'primeng/timeline';
import { ConfirmationService, FilterService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent, NavigationComponent, ConfigSidebarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    TabMenuModule,
    TooltipModule,
    DynamicDialogModule,
    SidebarModule,
    CalendarModule,
    PanelModule,
    TableModule,
    DialogModule,
    DataViewModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RadioButtonModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SelectButtonModule,
    CardModule,
    ChipsModule,
    TreeModule,
    CheckboxModule,
    InputNumberModule,
    InputSwitchModule,
    TabViewModule,
    ScrollPanelModule,
    BadgeModule,
    OverlayPanelModule,
    ConfirmPopupModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    MenuModule,
    SkeletonModule,
    TimelineModule,
    PanelMenuModule,
  ],
  exports: [
    MenubarModule,
    PanelMenuModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    SidebarModule,
    CalendarModule,
    PanelModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    DataViewModule,
    TabMenuModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RadioButtonModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SelectButtonModule,
    CardModule,
    ChipsModule,
    TreeModule,
    CheckboxModule,
    InputNumberModule,
    CarouselModule,
    AccordionModule,
    InputSwitchModule,
    TabViewModule,
    ScrollPanelModule,
    BadgeModule,
    OverlayPanelModule,
    ConfirmPopupModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    MenuModule,
    SkeletonModule,
    TimelineModule,
  ],
  providers: [
    DialogService,
    SessionService,
    FilterService,
    ConfirmationService,
    UserService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
