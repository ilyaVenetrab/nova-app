import { Component, Input, OnInit } from '@angular/core';
import { IVoteItem } from '../../app.service';
import { Store } from '@ngrx/store';
import { IDashboard } from '../reducers/dashboard.reducer';
import { refreshState, setSelectVote, updateAttemptCount, updateCurrentStep } from '../actions/dashboard.actions';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.scss']
})
export class FinishStepComponent implements OnInit {
  @Input()
  public selectVote: IVoteItem | null = {} as IVoteItem;

  constructor(private _store: Store<IDashboard>) {
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this._store.dispatch(refreshState({
        selectVote: {} as IVoteItem,
        currentStep: 1,
        attemptCount: 0
      }));
    }, 5000);
  }
}
