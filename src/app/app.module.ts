import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './first-step/button/button.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { SecondStepComponent } from './second-step/second-step.component';
import { FinishStepComponent } from './finish-step/finish-step.component';
import { HeaderComponent } from './header/header.component';
import { FirstAttemptComponent } from './first-step/button/first-attempt/first-attempt.component';
import { SecondAttemptComponent } from './first-step/button/second-attempt/second-attempt.component';
import { ThirdAttemptComponent } from './first-step/button/third-attempt/third-attempt.component';
import { AppService } from './app.service';
import { BD_URL } from './shared/tokens';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SanitizeHtmlPipe } from './shared/pipe/sanitize-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    FirstStepComponent,
    SecondStepComponent,
    FinishStepComponent,
    HeaderComponent,
    FirstAttemptComponent,
    SecondAttemptComponent,
    ThirdAttemptComponent,
    SanitizeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AppService,
    {
      provide: BD_URL,
      useValue: environment.bdUrl,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
