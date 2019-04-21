import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions as EffectActions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, EMPTY } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, filter, tap, concatMap } from 'rxjs/operators';

import { AppState, GroupPage } from '../app-store';
import { DataService } from 'src/app/services/data.service';
import { PageRequest } from 'src/app/model';

@Injectable()
export class GroupPageEffects {

  constructor(
    private actions$: EffectActions,
    private store: Store<AppState>,
    private dataService: DataService,
  ) { }

  @Effect() loadRequest$: Observable<Action> = this.actions$.pipe(
    ofType<GroupPage.actions.LoadRequest>(GroupPage.actions.ActionTypes.LoadRequest),
    map(() => new GroupPage.actions.Load()),
  );

  @Effect() loadPage$: Observable<Action> = this.actions$.pipe(
    ofType<GroupPage.actions.Load>(GroupPage.actions.ActionTypes.Load),
    withLatestFrom(this.store.pipe(select(GroupPage.selectors.selectRequest))),
    switchMap(
      ([, request]) => this.dataService.getGroupPage(request).pipe(
        map(page => new GroupPage.actions.LoadSuccess(page)),
        catchError(error => {
          console.error(error);
          return of(new GroupPage.actions.LoadFailure(error));
        }),
      )),
  );

  @Effect() delete$: Observable<Action> = this.actions$.pipe(
    ofType<GroupPage.actions.Delete>(GroupPage.actions.ActionTypes.Delete),
    switchMap(action => this.dataService.deleteGroup(action.payload).pipe(
      concatMap(() => [
        new GroupPage.actions.DeleteSuccess(action.payload),
        new GroupPage.actions.Load(),
      ]),
      catchError(error => {
        console.error(error);
        return of(new GroupPage.actions.DeleteFailure(error));
      }),
    )),
  );

  @Effect() emptyPage$: Observable<Action> = this.actions$.pipe(
    ofType<GroupPage.actions.LoadSuccess>(GroupPage.actions.ActionTypes.LoadSuccess),
    filter(action => {
      const meta = action.payload.meta;
      return ((meta.dataSize === 0) && (meta.totalCount !== 0));
    }),
    withLatestFrom(
      this.store.pipe(select(GroupPage.selectors.selectRequest)),
    ),
    switchMap(([, request]) => {
      let po = request.pageOffset;
      const ps = request.pageSize;
      if (po >= ps) {
        return of(new GroupPage.actions.LoadRequest(
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
