import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { Action } from '@ngrx/store';
import { GroupEdit, GroupPage, } from "../app-store";
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';



@Injectable()
export class GroupEditEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) { }

  @Effect() groupLoad$: Observable<Action> = this.actions$.pipe(
    ofType<GroupEdit.actions.Load>(GroupEdit.actions.ActionTypes.Load),
    switchMap(action => {
      return this.dataService.getGroup(action.payload).pipe(
        map(group => new GroupEdit.actions.LoadSuccess(group)),
        catchError(error => {
          console.error(error);
          return EMPTY;
        }),
      );
    }),
  );

  @Effect() groupSave$: Observable<Action> = this.actions$.pipe(
    ofType<GroupEdit.actions.Save>(GroupEdit.actions.ActionTypes.Save),
    switchMap(action => {
      return this.dataService.updateGroup(action.payload).pipe(
        map(_group => new GroupPage.actions.Load()),
        catchError(error => {
          console.error(error);
          return EMPTY;
        }),
      );
    })
  );

}
