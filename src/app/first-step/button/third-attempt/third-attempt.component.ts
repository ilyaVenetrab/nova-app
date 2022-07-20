import { Component } from '@angular/core';
import { FirstAttemptComponent } from '../first-attempt/first-attempt.component';
import { IVoteItem } from '../../../app.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-third-attempt',
  templateUrl: './third-attempt.component.html',
  styleUrls: ['./third-attempt.component.scss']
})
export class ThirdAttemptComponent extends FirstAttemptComponent {
  constructor(private _sanitizer: DomSanitizer) {
    super();
  }

  public runButton(event: MouseEvent, item: IVoteItem): void {
    if (!item.isMain) {
      let target = event.target as HTMLButtonElement;

      target.style.position = 'absolute';
      target.style.left = `${this.random()}%`;
      target.style.top = `${this.random()}%`;
    }
  }

  public random(min: number = 0, max: number = 90): number {
    const rand = min + Math.random() * (max - min + 1);

    return Math.floor(rand);
  }
}
