import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, concatMap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';
import { GroupCreate, GroupPage } from '../app-store';

@Injectable()
export class GroupCreateEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) { }

  @Effect()
  groupSave$: Observable<Action> = this.actions$.pipe(
    ofType<GroupCreate.actions.Save>(GroupCreate.actions.ActionTypes.Save),
    switchMap(
      (action) => {
        return this.dataService.saveGroup(action.payload).pipe(
          concatMap(() => [
            new GroupCreate.actions.Reset(),
            new GroupPage.actions.Load(),
          ]),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        );
      }
    ),
  );
}
