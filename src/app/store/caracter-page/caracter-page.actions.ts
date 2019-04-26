import { Action } from '@ngrx/store';

import { PageRequest, Page, Caracter } from 'src/app/model';

export enum ActionTypes {
  Load = '[CaracterPage] Load Caracter Page',
  LoadSuccess = '[CaracterPage] Load Success',
  LoadFailure = '[CaracterPage] Load Failure',
  LoadRequest = '[CaracterPage] Request Loading CaracterPage',
  Delete = '[CaracterPage] Delete Caracter',
  DeleteSuccess = '[CaracterPage] Delete Success',
  DeleteFailure = '[CaracterPage] Delete Failure',
}

export class Load implements Action {
  readonly type = ActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(
    public payload: Page<Caracter>,
  ) { }
}

export class LoadFailure implements Action {
  readonly type = ActionTypes.LoadFailure;
  constructor(
    public payload: any,
  ) { }
}

export class LoadRequest implements Action {
  readonly type = ActionTypes.LoadRequest;
  constructor(
    public payload: PageRequest,
  ) { }
}

export class Delete implements Action {
  readonly type = ActionTypes.Delete;
  constructor(
    public payload: string,
  ) { }
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
  constructor(
    public payload: string,
  ) { }
}

export class DeleteFailure implements Action {
  readonly type = ActionTypes.DeleteFailure;
  constructor(
    public payload: any,
  ) { }
}

export type AnyAction = Load | LoadSuccess | LoadFailure | LoadRequest | Delete | DeleteSuccess | DeleteFailure;
