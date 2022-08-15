import { Component, Input, OnInit } from '@angular/core';
import { FirstStepComponent } from '../first-step/first-step.component';
import { AppService, IQuestion, IVoteItem } from '../../app.service';
import { Store } from '@ngrx/store';
import { IDashboard } from '../reducers/dashboard.reducer';
import { refreshState } from '../actions/dashboard.actions';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent extends FirstStepComponent implements OnInit {
  @Input()
  public selectVote: IVoteItem = {} as IVoteItem;

  public answerCount: number = 0;

  public approveQuestion!: IQuestion[];

  public constructor(private _appService: AppService, public override store: Store<IDashboard>) {
    super(store);
  }

  public ngOnInit(): void {
    this._appService.getQuestion(this.selectVote.title).subscribe((data: IQuestion[]) => {
      this.approveQuestion = data;
    });
  }

  public getQuestion(index: number = 0): IQuestion {
    return this.approveQuestion && this.approveQuestion[index];
  }

  public yesEvent(): void {
    if (this.getQuestion(this.answerCount).refresh) {
      this.refreshSelectVote();
      return;
    }

    if (this.answerCount < this.approveQuestion.length - 1) {
      this.answerCount++;
    } else {
      this.answerCount = 0;
    }
  }

  public noEvent(): void {
    this.refreshSelectVote();
  }

  public refreshSelectVote(): void {
    this.store.dispatch(refreshState({
      selectVote: {} as IVoteItem,
      currentStep: 1,
      attemptCount: 0
    }));
  }
}
