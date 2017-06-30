import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromLayout from './reducers/layout';

import { LayoutComponent } from './components/layout';
import { NavItemComponent } from './components/nav-item';
import { SidenavComponent } from './components/sidenav';
import { ToolbarComponent } from './components/toolbar';

export const COMPONENTS = [
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    StoreModule.forFeature('layout', fromLayout.reducer)
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class LayoutModule { }
