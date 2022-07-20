import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVoteItem } from '../app.component';

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

  public scaleCounter: number = 0;

  public clickEvent(item: IVoteItem | null): void {
    this.selectVoteOutput.emit(item);
  }

  public mousemoveEvent(event: MouseEvent): void {
    let moveBtnID = (event.target as HTMLButtonElement).getAttribute('data-id');
    let item = this.voteItems?.find(i => String(i._id) === moveBtnID);

    if (!item?.isMain) {
      this.scaleCounter = this.scaleCounter + 1;
    }
  }

  public mouseleaveEvent(): void {
    this.scaleCounter = 0;
  }

  public transformScale(isMain: boolean): number {
    if (isMain) {
      return 1 + this.scaleCounter / 10;
    } else {
      let scale = 1 - this.scaleCounter / 10;

      return scale > 0 ? scale : 0;
    }
  }
}
