import { Action } from '@ngrx/store';
import { Group } from 'src/app/model/group.model';

export enum ActionTypes {
  Set = '[GroupCreate] Set Group',
  Reset = '[GroupCreate] Reset Form',
  Save = '[GroupCreate] Save Group',
}

export class Set implements Action {
  readonly type = ActionTypes.Set;
  constructor(
    public payload: Partial<Group>,
  ) { }
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}

export class Save implements Action {
  readonly type = ActionTypes.Save;
  constructor(
    public payload: Group,
  ) { }
}

export type AnyAction = Set | Reset | Save;

