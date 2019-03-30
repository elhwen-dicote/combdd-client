import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { Action } from '@ngrx/store';
import { CaracterCreateSave, CaracterCreateActionTypes, CaracterCreateReset } from './caracter-create.actions';
import { switchMap, concatMap, catchError } from 'rxjs/operators';
import { Caracter } from 'src/app/model/caracter.model';
import { CaracterPageStale } from '../caracter-page/caracter-page.actions';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class CaracterCreateEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }

  @Effect()
  caracterSave$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterCreateSave>(CaracterCreateActionTypes.Save),
    switchMap(
      (action: CaracterCreateSave) => {
        return this.dataService.saveCaracter(action.payload).pipe(
          concatMap((c: Caracter) => {
            return [
              new CaracterCreateReset(),
              new CaracterPageStale(),
            ];
          }),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          }),
        );
      }
    ),
  );

}
