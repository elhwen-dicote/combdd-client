import { Group, Page, PageRequest, defaultPageRequest } from 'src/app/model';
import { AnyAction, ActionTypes } from './group-page.actions';


export interface State {
  page: Page<Group>;
  request: PageRequest;
  loading: boolean;
}

export const initialState: State = {
  page: { page: null, meta: null },
  request: defaultPageRequest,
  loading: false,
};

export function reducer(state = initialState, action: AnyAction): State {
  switch (action.type) {

    case ActionTypes.LoadRequest: {
      return {
        ...state,
        request: action.payload,
      };
    }

    case ActionTypes.Load: {
      return {
        ...state,
        loading: true,
      };
    }

    case ActionTypes.LoadSuccess: {
      return {
        ...state,
        page: action.payload,
        loading: false,
      };
    }

    default:
      return state;
  }
}

export namespace selectors {
  export const page = (state: State) => state.page;
  export const request = (state: State) => state.request;
  export const loading = (state: State) => state.loading;
  export const groups = (state: State) => state.page.page;
  export const meta = (state: State) => state.page.meta;
}