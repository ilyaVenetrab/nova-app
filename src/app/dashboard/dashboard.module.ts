import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ButtonComponent } from './first-step/button/button.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { SecondStepComponent } from './second-step/second-step.component';
import { FinishStepComponent } from './finish-step/finish-step.component';
import { FirstAttemptComponent } from './first-step/button/first-attempt/first-attempt.component';
import { SecondAttemptComponent } from './first-step/button/second-attempt/second-attempt.component';
import { ThirdAttemptComponent } from './first-step/button/third-attempt/third-attempt.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from './reducers/dashboard.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    ButtonComponent,
    FirstStepComponent,
    SecondStepComponent,
    FinishStepComponent,
    FirstAttemptComponent,
    SecondAttemptComponent,
    ThirdAttemptComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forRoot({ dashboard: dashboardReducer }),
  ]
})
export class DashboardModule { }
