import { SidebarModule } from 'primeng/sidebar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { MainModuleComponent } from './main-module.component';
import { SessionListComponent } from './pages/session-list/session-list.component';
import { BeforeStartingComponent } from './pages/before-starting/before-starting.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { SyllabusCardComponent } from 'src/app/shared/components/syllabus-card/syllabus-card.component';
import { LastLessonComponent } from 'src/app/shared/components/last-lesson/last-lesson.component';

@NgModule({
  declarations: [
    MainModuleComponent,
    SessionListComponent,
    BeforeStartingComponent,
    SyllabusCardComponent,
    LastLessonComponent
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    CardModule,
    ButtonModule,
    ChartModule,
    SidebarModule
  ],
})
export class MainModuleModule {}
