import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { ActionTypes, Save, Reset } from './group-create.actions';
import { switchMap, concatMap, catchError } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class GroupCreateEffects {

  constructor(
    private actions$: Actions,
    private dataService : DataService,
    ) {}

  @Effect()
  groupSave$:Observable<Action> = this.actions$.pipe(
    ofType<Save>(ActionTypes.Save),
    switchMap(
      (action:Save)=>{
        return this.dataService.saveGroup(action.payload).pipe(
          concatMap(()=>[
            new Reset(),
          ]),
          catchError((error)=>{
            console.error(error);
            return EMPTY;
          })
        );
      }
    ),
  );
}
