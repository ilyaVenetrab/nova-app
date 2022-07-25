import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { BD_URL } from './shared/tokens';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AdminModule,
    DashboardModule,
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
