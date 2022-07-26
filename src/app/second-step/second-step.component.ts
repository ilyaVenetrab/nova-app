import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVoteItem } from '../app.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FirstStepComponent } from '../first-step/first-step.component';

interface IQuestion {
  title: string | SafeHtml;
  revertButton: boolean;
  refresh: boolean;
}

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent extends FirstStepComponent implements OnInit {
  @Input()
  public override selectVote: IVoteItem = {} as IVoteItem;

  public answerCount: number = 0;

  public approveQuestion: IQuestion[] = [];

  public constructor(private _sanitizer: DomSanitizer) {
    super();
  }

  public ngOnInit(): void {
    this.approveQuestion = [
      {
        title: 'Are you sure of your selection?',
        revertButton: false,
        refresh: false
      },
      {
        title: 'Really?',
        revertButton: true,
        refresh: false
      },
      {
        title: 'You\' really, REALLY sure?',
        revertButton: false,
        refresh: false
      },
      {
        title: this._sanitizer.bypassSecurityTrustHtml(`You don't want to not vote for <snap class="color-red">${this.selectVote.title.toUpperCase()}</snap>?`),
        revertButton: false,
        refresh: true
      }
    ];
  }

  public getQuestion(index: number = 0): IQuestion {
    return this.approveQuestion[index];
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
