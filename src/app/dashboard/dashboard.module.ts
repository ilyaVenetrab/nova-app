import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ButtonComponent } from './first-step/button/button.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { SecondStepComponent } from './second-step/second-step.component';
import { FinishStepComponent } from './finish-step/finish-step.component';
import { HeaderComponent } from './header/header.component';
import { FirstAttemptComponent } from './first-step/button/first-attempt/first-attempt.component';
import { SecondAttemptComponent } from './first-step/button/second-attempt/second-attempt.component';
import { ThirdAttemptComponent } from './first-step/button/third-attempt/third-attempt.component';
import { SanitizeHtmlPipe } from '../shared/pipe/sanitize-html.pipe';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ButtonComponent,
    FirstStepComponent,
    SecondStepComponent,
    FinishStepComponent,
    HeaderComponent,
    FirstAttemptComponent,
    SecondAttemptComponent,
    ThirdAttemptComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
