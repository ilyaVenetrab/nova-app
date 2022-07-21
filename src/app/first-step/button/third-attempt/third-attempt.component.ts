import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { FirstAttemptComponent } from '../first-attempt/first-attempt.component';
import { IVoteItem } from '../../../app.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-third-attempt',
  templateUrl: './third-attempt.component.html',
  styleUrls: ['./third-attempt.component.scss']
})
export class ThirdAttemptComponent extends FirstAttemptComponent implements AfterViewInit {
  public buttons: NodeListOf<HTMLButtonElement> | null = null;

  public moveCount: number = 0;

  constructor(private _sanitizer: DomSanitizer, public _elementRef: ElementRef) {
    super();
  }

  public override clickEvent(item: IVoteItem, event: MouseEvent): void {
    if (!item.isMain) {
      let target = event.target as HTMLButtonElement;

      this.buttons?.forEach((button: HTMLButtonElement) => {
        if (target !== button) {
          let notClickItem = this.voteItems?.find(i => String(i._id) === button.getAttribute('id'));

          button.setAttribute('style', target.getAttribute('style') as string);
          notClickItem && super.clickEvent(notClickItem);
          this.moveCount = 0;
        } else {
          button.removeAttribute('style');
        }
      });
    }
  }

  public ngAfterViewInit(): void {
    this.buttons = this._elementRef.nativeElement.querySelectorAll('.js-btn');
  }

  public mouseEnterEvent(event: MouseEvent, item: IVoteItem): void {
    if (!item.isMain && this.moveCount < 15) {
      let target = event.target as HTMLButtonElement;

      target.style.position = 'absolute';
      target.style.left = `${this.random()}%`;
      target.style.top = `${this.random()}%`;

      this.moveCount++;
    }
  }

  public random(min: number = 0, max: number = 90): number {
    const rand = min + Math.random() * (max - min + 1);

    return Math.floor(rand);
  }
}
