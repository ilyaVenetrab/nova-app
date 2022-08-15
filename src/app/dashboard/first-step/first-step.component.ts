import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDashboard, IInitialState } from '../reducers/dashboard.reducer';
import { updateAttemptCount, updateCurrentStep } from '../actions/dashboard.actions';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FirstStepComponent {
  @Input()
  public dashboard: IInitialState = {} as IInitialState;

  public constructor(public store: Store<IDashboard>) {
  }

  public nextStep(): void {
    if (this.dashboard.currentStep) {
      let currentStep = this.dashboard.currentStep + 1;
      this.store.dispatch(updateCurrentStep({ currentStep }))
    }

    let count = this.dashboard.attemptCount;
    if (this.dashboard.attemptCount >= 2) {
      count = 0;
    } else {
      count++;
    }
    this.store.dispatch(updateAttemptCount({ attemptCount: count }));
  }

  public previousStep(): void {
    if (this.dashboard.currentStep) {
      let currentStep = this.dashboard.currentStep - 1;
      this.store.dispatch(updateCurrentStep({ currentStep }))
    }
  }
}
