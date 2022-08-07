import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainModuleComponent } from './main-module.component';
import { SessionListComponent } from './pages/session-list/session-list.component';

const routes: Routes = [
  { path: 'home', component: MainModuleComponent },
  {
    path: 'session-list',
    component: SessionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
