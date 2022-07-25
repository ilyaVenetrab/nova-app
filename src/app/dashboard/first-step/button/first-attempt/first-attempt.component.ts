import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVoteItem } from 'src/app/app.service';

@Component({
  selector: 'app-first-attempt',
  templateUrl: './first-attempt.component.html',
  styleUrls: ['./first-attempt.component.scss']
})
export class FirstAttemptComponent {
  @Input()
  public voteItems: IVoteItem[] | null = [] as IVoteItem[];

  @Input()
  public attemptCount: number = 0;

  @Output()
  public selectVoteOutput: EventEmitter<IVoteItem | null> = new EventEmitter<IVoteItem | null>();

  public clickEvent(item: IVoteItem | null, event?: MouseEvent): void {
    this.selectVoteOutput.emit(item);

    this.voteItems?.forEach(i => {
      if (i !== item) {
        i.active = false;
      } else {
        item.active = true;
      }
    });
  }

}
