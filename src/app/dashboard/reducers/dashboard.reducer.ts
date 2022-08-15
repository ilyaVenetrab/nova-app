import { createReducer, on } from '@ngrx/store';
import { IVoteItem } from '../../app.service';
import { getVoteItem, refreshState, setSelectVote, updateAttemptCount, updateCurrentStep } from '../actions/dashboard.actions';

export interface IInitialState {
  voteItems: IVoteItem[];
  selectVote: IVoteItem;
  currentStep: number;
  attemptCount: number;
  stepCount: number;
}

export interface IDashboard {
  dashboard: IInitialState
}

export const initialState: IInitialState = {
  voteItems: [] as IVoteItem[],
  selectVote: {} as IVoteItem,
  currentStep: 1,
  attemptCount: 0,
  stepCount: 2
};

export const dashboardReducer = createReducer(
  initialState,
  on(getVoteItem, (state, { voteItems }) => {
    return { ...state, voteItems };
  }),
  on(setSelectVote, (state, { selectVote }) => {
    const voteItems: IVoteItem[] = [];

    state.voteItems.forEach((item: IVoteItem) => {
      return voteItems.push({
        _id: item._id,
        isMain: item.isMain,
        title: item.title,
        active: item._id === selectVote._id
      });
    });

    return {
      ...state,
      selectVote: voteItems.filter(i => i._id === selectVote._id)[0] || {},
      voteItems
    };
  }),
  on(updateCurrentStep, (state, { currentStep })=> {
    return {...state, currentStep};
  }),
  on(updateAttemptCount, (state, { attemptCount })=> {
    return {...state, attemptCount};
  }),
  on(refreshState, (state, { selectVote, currentStep, attemptCount })=> {
    const voteItems: IVoteItem[] = [];

    state.voteItems.forEach((item: IVoteItem) => {
      return voteItems.push({
        _id: item._id,
        isMain: item.isMain,
        title: item.title,
        active: false
      });
    });

    return {...state, voteItems, selectVote, currentStep, attemptCount};
  })
);
