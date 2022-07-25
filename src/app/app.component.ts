import { Component } from '@angular/core';
import { AppService, IVoteItem } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly stepCount: number = 2;

  public attemptCount: number = 0;

  public voteItems: IVoteItem[] =[];

  public currentStep: number = 1;
  public selectVote: IVoteItem | null = null;

  public constructor(private _appService: AppService) {
    this._appService.getCompanies().subscribe((data: IVoteItem[]) => {
      this.voteItems = data;
    });
  }

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
