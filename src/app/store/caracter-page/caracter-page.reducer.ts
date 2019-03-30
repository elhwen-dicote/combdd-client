import { Action } from '@ngrx/store';
import { CaracterPageAction, CaracterPageActionTypes } from './caracter-page.actions';
import { Caracter, Page } from 'src/app/model';

export interface State {
  page: Page<Caracter>;
  loading: boolean;
  stale: boolean;
}

export const initialState: State = {
  page: {
    page: [],
    meta: {
      filter: '',
      totalCount: 0,
      pageOffset: 0,
      pageSize: 0,
      sortBy: '',
      sortOrder: '',
      dataSize: 0,
    },
  },
  loading: false,
  stale: false,
};

export function reducer(state = initialState, action: CaracterPageAction): State {
  switch (action.type) {

    case CaracterPageActionTypes.Load:
      return {
        ...state,
        loading: true,
      }

    case CaracterPageActionTypes.LoadSuccess:
      return {
        ...state,
        page: action.payload,
        loading: false,
        stale: false,
      }

    case CaracterPageActionTypes.Stale:
      return {
        ...state,
        stale: true,
      }

    default:
      return state;
  }
}

export const selectCaracterPageCaracters = (state: State) => state.page.page;
export const selectCaracterPageTotalCount = (state: State) => state.page.meta.totalCount;
export const selectCaracterPageStale = (state: State) => state.stale;
export const selectCaracterPageMeta = (state: State) => state.page.meta;
