import { Action } from '@ngrx/store';

import { Caracter } from 'src/app/model/caracter.model';

export enum ActionTypes {
  Set = '[CaracterCreate] Set Caracter',
  Reset = '[CaracterCreate] Reset Form',
  Save = '[CaracterCreate] Save Caracter',
}

export class Set implements Action {
  readonly type = ActionTypes.Set;
  constructor(
    public payload: Partial<Caracter>,
  ) { }
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}

export class Save implements Action {
  readonly type = ActionTypes.Save;
  constructor(
    public payload: Caracter
  ) { }
}

export type CaracterCreateAction = Set | Reset | Save;
