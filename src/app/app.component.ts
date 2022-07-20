import { Component } from '@angular/core';

export interface IVoteItem {
  _id: number;
  isMain: boolean;
  title: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly stepCount: number = 2;

  public attemptCount: number = 0;

  public voteItems: IVoteItem[] = [
    {
      _id: 0,
      isMain: true,
      title: 'Novardis'
    },
    {
      _id: 1,
      isMain: false,
      title: 'Another'
    }
  ];

  public currentStep: number = 1;
  public selectVote: IVoteItem | null = null;

  public handleSelectVote(vote: IVoteItem | null): void {
    this.selectVote = vote;
  }

  public handleUpdateStep(step: number): void {
    this.currentStep = step;
  }

  public handleAttemptCount(attemptCount: number): void {
    this.attemptCount = attemptCount;
  }
}
