import { MetaReducer, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { State as CaracterPageState, reducer as caracterPageReducer } from './caracter-page/caracter-page.reducer';
import { State as CaracterCreateState, reducer as caracterCreateReducer } from './caracter-create/caracter-create.reducer';
import { State as CaracterEditState, reducer as caracterEditReducer } from './caracter-edit/caracter-edit.reducer';
import * as _GroupPage from './group-page/';
import * as _GroupCreate from './group-create';
import * as _GroupEdit from './group-edit';

export interface AppState {
  caracterPage: CaracterPageState;
  caracterCreate: CaracterCreateState;
  caracterEdit: CaracterEditState;
  groupCreate: _GroupCreate.State;
  groupPage: _GroupPage.State;
  groupEdit: _GroupEdit.State;

}

export const reducers: ActionReducerMap<AppState> = {
  caracterPage: caracterPageReducer,
  caracterCreate: caracterCreateReducer,
  caracterEdit: caracterEditReducer,
  groupCreate: _GroupCreate.reducer,
  groupPage: _GroupPage.reducer,
  groupEdit: _GroupEdit.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export namespace GroupCreate {

  // group-create actions
  export namespace actions {
    export import ActionTypes = _GroupCreate.ActionTypes;
    export import Set = _GroupCreate.Set;
    export import Reset = _GroupCreate.Reset;
    export import Save = _GroupCreate.Save;
  }

  // group-create selectors
  export namespace selectors {
    const selectGroupCreate = createFeatureSelector<AppState, _GroupCreate.State>('groupCreate');
    export const selectGroup = createSelector(selectGroupCreate, _GroupCreate.selectors.group);
    export const selectMembers = createSelector(selectGroupCreate, _GroupCreate.selectors.members);
  }
}

export namespace GroupPage {

  // group-page actions
  export namespace actions {
    export import ActionTypes = _GroupPage.ActionTypes;
    export import LoadRequest = _GroupPage.LoadRequest;
    export import Load = _GroupPage.Load;
    export import LoadSuccess = _GroupPage.LoadSuccess;
    export import LoadFailure = _GroupPage.LoadFailure;
    export import Delete = _GroupPage.Delete;
    export import DeleteSuccess = _GroupPage.DeleteSuccess;
    export import DeleteFailure = _GroupPage.DeleteFailure;
  }

  // group-page selectors
  export namespace selectors {
    const selectGroupPage = createFeatureSelector<AppState, _GroupPage.State>('groupPage');
    export const selectLoading = createSelector(selectGroupPage, _GroupPage.selectors.loading);
    export const selectRequest = createSelector(selectGroupPage, _GroupPage.selectors.request);
    export const selectGroups = createSelector(selectGroupPage, _GroupPage.selectors.groups);
    export const selectMeta = createSelector(selectGroupPage, _GroupPage.selectors.meta);
  }

}

export namespace GroupEdit {
  export namespace actions {
    export import ActionTypes = _GroupEdit.ActionTypes;
    export import Load = _GroupEdit.Load;
    export import LoadSuccess = _GroupEdit.LoadSuccess;
    export import Save = _GroupEdit.Save;
  }
  export namespace selectors {
    const selectGroupEdit = createFeatureSelector('groupEdit');
    export const selectGroup = createSelector(selectGroupEdit, _GroupEdit.selectors.group);
  }
}

