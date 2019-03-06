import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State as CaracterPageState, reducer as caracterPageReducer, selectCaracterPageCaracters, selectCaracterPageTotalCount, selectCaracterPageStale, selectCaracterPageMeta } from './caracter-page/caracter-page.reducer';
import { CaracterPageEffects } from './caracter-page/caracter-page.effects';
import { State as CaracterCreateState, reducer as caracterCreateReducer, selectCaracterCreateCaracter } from './caracter-create/caracter-create.reducer';
import { CaracterCreateEffects } from './caracter-create/caracter-create.effects';
import { State as CaracterEditState, reducer as caracterEditReducer, selectCaracterEditCaracter } from './caracter-edit/caracter-edit.reducer';
import { CaracterEditEffects } from './caracter-edit/caracter-edit.effects';

export interface AppState {
  caracterPage: CaracterPageState;
  caracterCreate: CaracterCreateState;
  caracterEdit: CaracterEditState;
}

export const reducers: ActionReducerMap<AppState> = {
  caracterPage: caracterPageReducer,
  caracterCreate: caracterCreateReducer,
  caracterEdit: caracterEditReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const effects = [
  CaracterPageEffects,
  CaracterCreateEffects,
  CaracterEditEffects,
];

// caracter-page actions
export { CaracterPageLoad, } from './caracter-page/caracter-page.actions';

// caracter-page selectors
const selectCaracterPage = createFeatureSelector<AppState, CaracterPageState>('caracterPage');
export const caracterPageCaracters = createSelector(
  selectCaracterPage,
  selectCaracterPageCaracters);
export const caracterPageTotalCount = createSelector(
  selectCaracterPage,
  selectCaracterPageTotalCount,
);
export const caracterPageStale = createSelector(
  selectCaracterPage,
  selectCaracterPageStale,
);
export const caracterPageMeta = createSelector(
  selectCaracterPage,
  selectCaracterPageMeta,
);


// caracter-create actions
export { CaracterCreateSet, CaracterCreateReset, CaracterCreateSave } from './caracter-create/caracter-create.actions';

// caracter-create selectors
const selectCaracterCreate = createFeatureSelector<AppState, CaracterCreateState>('caracterCreate');
export const caracterCreateCaracter = createSelector(
  selectCaracterCreate,
  selectCaracterCreateCaracter,
);

// caracter-edit actions
export { CaracterEditLoad, CaracterEditLoadSuccess } from './caracter-edit/caracter-edit.actions'

// caracter-edit selectors
const selectCaracterEdit = createFeatureSelector<AppState, CaracterEditState>('caracterEdit');
export const caracterEditCaracter = createSelector(
  selectCaracterEdit,
  selectCaracterEditCaracter,
);