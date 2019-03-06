import { Action } from '@ngrx/store';
import { CaracterPageRequest, CaracterPage } from 'src/app/model/caracter-page.model';

export enum CaracterPageActionTypes {
  Load = '[CaracterPage] Load CaracterPage',
  LoadSuccess = '[CaracterPage] Load Success',
  Stale = '[CaracterPage] Page Stale',
  Delete = '[CaracterPage] Delete Caracter',
}

export class CaracterPageLoad implements Action {
  readonly type = CaracterPageActionTypes.Load;
  constructor(
    public payload: CaracterPageRequest,
  ) { }
}

export class CaracterPageLoadSuccess implements Action {
  readonly type = CaracterPageActionTypes.LoadSuccess;
  constructor(
    public payload: CaracterPage,
  ) { }
}

export class CaracterPageStale implements Action {
  readonly type = CaracterPageActionTypes.Stale;
}

export class CaracterPageDelete implements Action {
  readonly type = CaracterPageActionTypes.Delete;
  constructor(
    public payload : string,
  ){}
}

export type CaracterPageAction = CaracterPageLoad | CaracterPageLoadSuccess | CaracterPageStale;
