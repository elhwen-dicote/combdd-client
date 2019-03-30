import { Action } from '@ngrx/store';

import { PageRequest, Page, Caracter } from 'src/app/model';

export enum CaracterPageActionTypes {
  Load = '[CaracterPage] Load CaracterPage',
  LoadSuccess = '[CaracterPage] Load Success',
  Stale = '[CaracterPage] Page Stale',
  Delete = '[CaracterPage] Delete Caracter',
}

export class CaracterPageLoad implements Action {
  readonly type = CaracterPageActionTypes.Load;
  constructor(
    public payload: PageRequest,
  ) { }
}

export class CaracterPageLoadSuccess implements Action {
  readonly type = CaracterPageActionTypes.LoadSuccess;
  constructor(
    public payload: Page<Caracter>,
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
