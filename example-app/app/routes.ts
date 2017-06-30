import { Routes } from '@angular/router';

import { BookExistsGuard } from 'app/books/guards/book-exists';
import { FindBookPageComponent } from 'app/books/containers/find-book-page';
import { ViewBookPageComponent } from 'app/books/containers/view-book-page';
import { CollectionPageComponent } from 'app/books/containers/collection-page';
import { NotFoundPageComponent } from 'app/core/containers/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: CollectionPageComponent
  },
  {
    path: 'book/find',
    component: FindBookPageComponent
  },
  {
    path: 'book/:id',
    canActivate: [ BookExistsGuard ],
    component: ViewBookPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
