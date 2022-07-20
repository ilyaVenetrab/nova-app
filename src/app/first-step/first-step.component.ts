import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVoteItem } from '../app.component';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent {
  @Input()
  public voteItems: IVoteItem[] | null = null;

  @Output()
  public selectOutput: EventEmitter<IVoteItem> = new EventEmitter<IVoteItem>();

  public handleSelectEvent(item: IVoteItem): void {
    this.selectOutput.emit(item);
  }
}
