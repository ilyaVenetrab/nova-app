import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { FirstAttemptComponent } from '../first-attempt/first-attempt.component';
import { DomSanitizer } from '@angular/platform-browser';
import { IVoteItem } from '../../../../app.service';
import { Store } from '@ngrx/store';
import { IInitialState } from '../../../reducers/dashboard.reducer';

@Component({
  selector: 'app-third-attempt',
  templateUrl: './third-attempt.component.html',
  styleUrls: ['./third-attempt.component.scss']
})
export class ThirdAttemptComponent extends FirstAttemptComponent implements AfterViewInit {
  public buttons: NodeListOf<HTMLButtonElement> | null = null;

  public moveCount: number = 0;

  public isChange: boolean = false;

  public btnStyle: string = '';

  constructor(
    private _sanitizer: DomSanitizer,
    private _elementRef: ElementRef,
    public override store: Store<IInitialState>) {
    super(store);
  }

  public override clickEvent(item: IVoteItem, event: MouseEvent): void {
    if (!item.isMain) {
      let target = event.target as HTMLButtonElement;

      this.buttons?.forEach((button: HTMLButtonElement) => {
        if (target !== button) {
          let notClickItem = this.voteItems?.find(i => String(i._id) === button.getAttribute('id'));

          if (!this.isChange) {
            this.btnStyle = target.getAttribute('style') as string;
            button.setAttribute('style', this.btnStyle);
          } else {
            button.removeAttribute('style');
          }
          notClickItem && super.clickEvent(notClickItem);
        } else {
          if (!this.isChange) {
            button.removeAttribute('style');
          } else {
            button.setAttribute('style', this.btnStyle);
          }
        }
      });

      this.isChange = !this.isChange;
    }
  }

  public ngAfterViewInit(): void {
    this.buttons = this._elementRef.nativeElement.querySelectorAll('.js-btn');
  }

  public mouseEnterEvent(event: MouseEvent, item: IVoteItem): void {
    if (!item.isMain && this.moveCount < 10) {
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
