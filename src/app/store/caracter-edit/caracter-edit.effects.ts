import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';

import { Caracter } from 'src/app/model/caracter.model';
import { DataService } from 'src/app/services/data.service';
import { CaracterPage, CaracterEdit } from '../app-store';

@Injectable()
export class CaracterEditEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) { }

  @Effect() caracterLoad$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterEdit.actions.Load>(CaracterEdit.actions.ActionTypes.Load),
    switchMap(
      (action) => {
        return this.dataService.getCaracter(action.payload).pipe(
          map((c: Caracter) => {
            return new CaracterEdit.actions.LoadSuccess(c);
          }),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        );
      }
    ),
  );

  @Effect() caracterSave$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterEdit.actions.Save>(CaracterEdit.actions.ActionTypes.Save),
    switchMap((action) => this.dataService.updateCaracter(action.payload).pipe(
      map(() => new CaracterPage.actions.Load()),
      catchError(
        (error) => {
          console.error(error);
          return EMPTY;
        }
      ),
    )),
  );

}
