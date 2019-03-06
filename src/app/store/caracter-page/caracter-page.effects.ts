import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { CaracterService } from 'src/app/services/caracter.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { CaracterPageActionTypes, CaracterPageLoad, CaracterPageLoadSuccess, CaracterPageStale, CaracterPageDelete } from './caracter-page.actions';

@Injectable()
export class CaracterPageEffects {

  constructor(
    private actions$: Actions,
    private caracterService: CaracterService,
  ) { }

  @Effect() loadPage$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterPageLoad>(CaracterPageActionTypes.Load),
    switchMap((action) => {
      return this.caracterService.getCaracterPage(action.payload).pipe(
        map((page) => {
          return new CaracterPageLoadSuccess(page);
        }),
        catchError((error) => {
          console.error(error);
          return EMPTY;
        })
      );
    })
  );

  @Effect({ dispatch: false }) pageStale$: Observable<Action> = this.actions$.pipe(
    ofType(CaracterPageActionTypes.Stale),
    tap(()=>{
      this.caracterService.invalidateCache();
    }),
  );

  @Effect() deleteCaracter$ : Observable<Action> = this.actions$.pipe(
    ofType<CaracterPageDelete>(CaracterPageActionTypes.Delete),
    switchMap((action)=>{
      return this.caracterService.deleteCaracter(action.payload).pipe(
        map(()=> {
          return new CaracterPageStale();
        }),
        catchError((error)=>{
          console.log(error);
          return EMPTY;
        })
      );
    })
  );

}
