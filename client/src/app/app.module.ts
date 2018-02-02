import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InterlinkService } from './interlink.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayComponent } from './display/display.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DisplayComponent,
  ],
  imports: [
    BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule 
    ],
  providers: [InterlinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
