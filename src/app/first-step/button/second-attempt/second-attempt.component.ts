import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVoteItem } from '../../../app.component';
import { FirstAttemptComponent } from '../first-attempt/first-attempt.component';

@Component({
  selector: 'app-second-attempt',
  templateUrl: './second-attempt.component.html',
  styleUrls: ['./second-attempt.component.scss']
})
export class SecondAttemptComponent extends FirstAttemptComponent {
  public scaleCounter: number = 0;

  public mousemoveEvent(item: IVoteItem): void {
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
