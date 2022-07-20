import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVoteItem } from '../../app.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  public voteItems: IVoteItem[] | null = [] as IVoteItem[];

  @Input()
  public attemptCount: number = 0;

  @Output()
  public selectVoteOutput: EventEmitter<IVoteItem | null> = new EventEmitter<IVoteItem | null>();

  public selectEvent(item: IVoteItem | null) {
    this.selectVoteOutput.emit(item);
  }
}
