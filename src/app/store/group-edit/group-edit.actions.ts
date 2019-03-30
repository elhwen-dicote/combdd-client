import { Action } from '@ngrx/store';
import { Group } from 'src/app/model';

export enum ActionTypes {
  Load = '[GroupEdit] Load GroupEdits',
  LoadSuccess = '[GroupEdit] Load Group Success',
  Save = '[GroupEdit] Save Group',
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
    public payload: Group,
  ) { }
}

export class Save implements Action {
  readonly type = ActionTypes.Save;
  constructor(
    public payload: Group,
  ) { }
}

export type AnyAction = Load | LoadSuccess | Save;
