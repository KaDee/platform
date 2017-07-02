import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { GoogleBooksService } from 'app/core/services/google-books';
import * as book from '../actions/book';
import { Book } from 'app/books/models/book';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<number>('Search Scheduler');


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class BookEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(book.SEARCH)
    .debounceTime(this.debounce, this.scheduler)
    .map(toPayload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(book.SEARCH).skip(1);

      return this.googleBooks.searchBooks(query)
        .takeUntil(nextSearch$)
        .map((books: Book[]) => new book.SearchCompleteAction(books))
        .catch(() => of(new book.SearchCompleteAction([])));
    });

    constructor(
      private actions$: Actions,
      private googleBooks: GoogleBooksService,
      @Optional() @Inject(SEARCH_SCHEDULER) private scheduler: Scheduler,
      @Optional() @Inject(SEARCH_DEBOUNCE) private debounce: number = 300
    ) {}
}
