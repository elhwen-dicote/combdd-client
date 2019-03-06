import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CaracterService } from 'src/app/services/caracter.service';
import { Observable, EMPTY } from 'rxjs';
import { CaracterEditActionTypes, CaracterEditLoad, CaracterEditLoadSuccess, CaracterEditSave } from './caracter-edit.actions';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Caracter } from 'src/app/model/caracter.model';
import { CaracterPageStale } from '../caracter-page/caracter-page.actions';

@Injectable()
export class CaracterEditEffects {

  constructor(
    private actions$: Actions,
    private caracterService: CaracterService,
  ) { }

  @Effect() caracterLoad$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterEditLoad>(CaracterEditActionTypes.Load),
    switchMap(
      (action) => {
        return this.caracterService.getCaracter(action.payload).pipe(
          map((c: Caracter) => {
            return new CaracterEditLoadSuccess(c);
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
    ofType<CaracterEditSave>(CaracterEditActionTypes.Save),
    switchMap(
      (action) => {
        return this.caracterService.updateCaracter(action.payload).pipe(
          map(
            () => {
              return new CaracterPageStale();
            }
          ),
          catchError(
            (error) => {
              console.error(error);
              return EMPTY;
            }
          ),
        );
      }
    ),
  );
}
