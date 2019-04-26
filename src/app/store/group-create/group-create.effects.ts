import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, concatMap, catchError, map, tap } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';
import { GroupCreate, GroupPage, CaracterPage } from '../app-store';

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

  @Effect()
  caracterDeleted$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterPage.actions.DeleteSuccess>(CaracterPage.actions.ActionTypes.DeleteSuccess),
    map(action => new GroupCreate.actions.CaracterDeleted(action.payload)),
  );

}
