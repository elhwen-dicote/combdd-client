import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, of } from 'rxjs';
import { switchMap, map, catchError, tap, withLatestFrom, concatMap, filter } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';
import { CaracterPage, AppState } from '../app-store';
import { PageRequest } from 'src/app/model';

@Injectable()
export class CaracterPageEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<AppState>,
  ) { }

  @Effect() LoadRequest$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterPage.actions.LoadRequest>(CaracterPage.actions.ActionTypes.LoadRequest),
    map(() => new CaracterPage.actions.Load()),
  );

  @Effect() loadPage$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterPage.actions.Load>(CaracterPage.actions.ActionTypes.Load),
    withLatestFrom(this.store.pipe(select(CaracterPage.selectors.selectRequest))),
    switchMap(([, request]) => this.dataService.getCaracterPage(request).pipe(
      map(page => new CaracterPage.actions.LoadSuccess(page)),
      catchError((error) => {
        console.error(error);
        return of(new CaracterPage.actions.LoadFailure(error));
      }),
    )),
  );

  @Effect() delete$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterPage.actions.Delete>(CaracterPage.actions.ActionTypes.Delete),
    switchMap((action) => this.dataService.deleteCaracter(action.payload).pipe(
      concatMap(() => [
        new CaracterPage.actions.DeleteSuccess(action.payload),
        new CaracterPage.actions.Load(),
      ]),
      catchError((error) => {
        console.log(error);
        return of(new CaracterPage.actions.DeleteFailure(error));
      }),
    )),
  );

  @Effect() emptyPage$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterPage.actions.LoadSuccess>(CaracterPage.actions.ActionTypes.LoadSuccess),
    filter(action => {
      const meta = action.payload.meta;
      return ((meta.dataSize === 0) && (meta.totalCount !== 0));
    }),
    withLatestFrom(
      this.store.pipe(select(CaracterPage.selectors.selectRequest)),
    ),
    switchMap(([, request]) => {
      let po = request.pageOffset;
      const ps = request.pageSize;
      if (po >= ps) {
        return of(new CaracterPage.actions.LoadRequest(
          new PageRequest(
            request.filter,
            po - ps,
            request.pageSize,
            request.sortBy,
            request.sortOrder,
          )
        ))
      } else {
        return EMPTY;
      }
    }),
  );

}
