import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { CaracterPageActionTypes, CaracterPageLoad, CaracterPageLoadSuccess, CaracterPageStale, CaracterPageDelete } from './caracter-page.actions';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class CaracterPageEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) { }

  @Effect() loadPage$: Observable<Action> = this.actions$.pipe(
    ofType<CaracterPageLoad>(CaracterPageActionTypes.Load),
    switchMap((action) => {
      return this.dataService.getCaracterPage(action.payload).pipe(
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
      this.dataService.invalidateCache();
    }),
  );

  @Effect() deleteCaracter$ : Observable<Action> = this.actions$.pipe(
    ofType<CaracterPageDelete>(CaracterPageActionTypes.Delete),
    switchMap((action)=>{
      return this.dataService.deleteCaracter(action.payload).pipe(
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
