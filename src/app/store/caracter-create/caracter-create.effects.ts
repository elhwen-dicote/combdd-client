import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, concatMap, catchError } from 'rxjs/operators';

import { Caracter } from 'src/app/model/caracter.model';
import { DataService } from 'src/app/services/data.service';
import { CaracterPage, CaracterCreate } from '../app-store';

@Injectable()
export class CaracterCreateEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }

  @Effect()
  caracterSave$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterCreate.actions.Save>(CaracterCreate.actions.ActionTypes.Save),
    switchMap(
      (action) => {
        return this.dataService.saveCaracter(action.payload).pipe(
          concatMap(c => [
            new CaracterCreate.actions.Reset(),
            new CaracterPage.actions.Load(),
          ]),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          }),
        );
      }
    ),
  );

}
