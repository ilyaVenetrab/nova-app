import { Component, Input, OnInit } from '@angular/core';
import { FirstStepComponent } from '../first-step/first-step.component';
import { AppService, IQuestion, IVoteItem } from '../../app.service';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent extends FirstStepComponent implements OnInit {
  @Input()
  public override selectVote: IVoteItem = {} as IVoteItem;

  public answerCount: number = 0;

  public approveQuestion!: IQuestion[];

  public constructor(private _appService: AppService) {
    super();
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
    this.selectOutput.emit(null);
    this.updateStep.emit(1);
    this.selectVote.active = false;
  }
}
