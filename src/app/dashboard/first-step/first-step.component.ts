import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IVoteItem } from '../../app.service';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FirstStepComponent {
  @Input()
  public voteItems: IVoteItem[] | null = null;

  @Input()
  public stepCount: number = 2;

  @Input()
  public currentStep: number = 1;

  @Input()
  public attemptCount: number = 0;

  @Output()
  public selectOutput: EventEmitter<IVoteItem | null> = new EventEmitter<IVoteItem | null>();

  @Output()
  public updateStep: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public updateAttemptCount: EventEmitter<number> = new EventEmitter<number>();

  public selectVote: IVoteItem | null = null;

  public handleSelectEvent(item: IVoteItem | null): void {
    this.selectVote = item;
    this.selectOutput.emit(this.selectVote);
  }

  public nextStep(): void {
    this.currentStep++;
    this.updateStep.emit(this.currentStep);

    if (this.attemptCount >= 2) {
      this.attemptCount = 0;
    } else {
      this.attemptCount++;
    }
    this.updateAttemptCount.emit(this.attemptCount);
  }

  public previousStep(): void {
    this.currentStep--;
    this.updateStep.emit(this.currentStep);
  }

  public attemptCountEvent(index: number = 0) {
    this.updateAttemptCount.emit(index);
  }
}
