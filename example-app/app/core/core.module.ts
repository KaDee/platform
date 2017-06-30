import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app';
import { NotFoundPageComponent } from './containers/not-found-page';

import { LayoutModule } from 'app/layout/layout.module';

import { GoogleBooksService } from './services/google-books';


export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MaterialModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [ GoogleBooksService ]
    }
  }
}
