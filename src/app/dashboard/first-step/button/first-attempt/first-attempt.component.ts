import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVoteItem } from 'src/app/app.service';
import { setSelectVote } from '../../../actions/dashboard.actions';
import { Store } from '@ngrx/store';
import { IInitialState } from '../../../reducers/dashboard.reducer';

@Component({
  selector: 'app-first-attempt',
  templateUrl: './first-attempt.component.html',
  styleUrls: ['./first-attempt.component.scss']
})
export class FirstAttemptComponent {
  @Input()
  public voteItems: IVoteItem[] = [] as IVoteItem[];

  @Input()
  public attemptCount: number = 0;

  @Output()
  public selectVoteOutput: EventEmitter<IVoteItem> = new EventEmitter<IVoteItem>();

  public constructor(public store: Store<IInitialState>) {}

  public clickEvent(item: IVoteItem, event?: MouseEvent): void {
    this.store.dispatch(setSelectVote({ selectVote: item }));
  }

}
