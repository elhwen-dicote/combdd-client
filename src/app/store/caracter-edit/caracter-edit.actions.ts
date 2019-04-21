import { Action } from '@ngrx/store';

import { Caracter } from 'src/app/model/caracter.model';

export enum ActionTypes {
  Load = '[CaracterEdit] Load Caracter',
  LoadSuccess = '[CaracterEdit] Load Caracter Success',
  Save = '[CaracterEdit] Save Caracter',
}

export class Load implements Action {
  readonly type = ActionTypes.Load;
  constructor(
    public payload: string,
  ) { }
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(
    public payload: Caracter,
  ) { }
}

export class Save implements Action {
  readonly type = ActionTypes.Save;
  constructor(
    public payload: Caracter,
  ) { }
}


export type AnyAction = Load | LoadSuccess | Save;
