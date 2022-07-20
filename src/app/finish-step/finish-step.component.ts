import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVoteItem } from '../app.component';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.scss']
})
export class FinishStepComponent implements OnInit {
  @Input()
  public selectVote: IVoteItem | null = null;

  @Output()
  public selectOutput: EventEmitter<IVoteItem | null> = new EventEmitter<IVoteItem | null>();

  @Output()
  public updateStep: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public updateAttemptCount: EventEmitter<number> = new EventEmitter<number>();

  public ngOnInit(): void {
    setTimeout(() => {
      this.selectOutput.emit(null);
      this.updateStep.emit(1);
      this.updateAttemptCount.emit(0);
    }, 5000);
  }
}
