import { AfterViewInit, Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { FirstAttemptComponent } from '../first-attempt/first-attempt.component';

@Component({
  selector: 'app-second-attempt',
  templateUrl: './second-attempt.component.html',
  styleUrls: ['./second-attempt.component.scss']
})
export class SecondAttemptComponent extends FirstAttemptComponent implements AfterViewInit {
  @Output()
  public updateAttemptCount: EventEmitter<number> = new EventEmitter<number>();

  public scaleCounter: number = 0;

  public mouseleaveCount: number = 0;

  public buttonPosition!: { top: number, left: number };

  public constructor(private _myElem: ElementRef) {
    super();
  }

  public ngAfterViewInit(): void {
    const btn = this._myElem.nativeElement.querySelector('.js-btn');

    this.buttonPosition = {
      top: btn.getBoundingClientRect().top - 5,
      left: btn.getBoundingClientRect().left - 5,
    }
  }

  public mousemoveEvent(event: MouseEvent): void {
    if (event.pageX >= this.buttonPosition.left && event.pageY >= this.buttonPosition.top) {
      this.scaleCounter = this.scaleCounter + 2;
    }
  }

  public mouseleaveEvent(): void {
    this.scaleCounter = 0;
    this.mouseleaveCount++;

    if (this.mouseleaveCount === 4) {
      this.updateAttemptCount.emit(2);
    }
  }

  public transformScale(isMain: boolean): number {
    if (isMain) {
      let scale = 1 + this.scaleCounter / 10;

      return scale < 2.1 ? scale : 2.1;
    } else {
      let scale = 1 - this.scaleCounter / 10;

      return scale > 0 ? scale : 0;
    }
  }
}
