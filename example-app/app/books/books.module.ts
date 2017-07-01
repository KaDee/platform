import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { BookEffects } from './effects/book';
import { CollectionEffects } from './effects/collection';
import { BookExistsGuard } from './guards/book-exists';

import { FindBookPageComponent } from './containers/find-book-page';
import { ViewBookPageComponent } from './containers/view-book-page';
import { SelectedBookPageComponent } from './containers/selected-book-page';
import { CollectionPageComponent } from './containers/collection-page';


export const COMPONENTS = [
  FindBookPageComponent,
  ViewBookPageComponent,
  SelectedBookPageComponent,
  CollectionPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ComponentsModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class BooksModule {
  static forRoot() {
    return {
      ngModule: BooksRootModule,
      providers: [
        BookExistsGuard,
      ]
    }
  }
}

@NgModule({
  imports: [
    BooksModule,
    EffectsModule.forFeature([
      BookEffects,
      CollectionEffects
    ]),
  ]
})
export class BooksRootModule {}