import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVoteItem } from '../../../app.service';

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

  @Output()
  public updateAttemptCount: EventEmitter<number> = new EventEmitter<number>();

  public isMobile: boolean = window.innerWidth < 1024;

  public selectEvent(item: IVoteItem | null) {
    this.selectVoteOutput.emit(item);
  }

  public attemptCountEvent(index: number = 0) {
    this.updateAttemptCount.emit(index);
  }
}
