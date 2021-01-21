import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './services/api-service.service';
import { HighlightDirective } from './directives/highlight.directive';
import { FooterComponent } from './components/footer/footer.component';
import { TimerFormatPipe } from './pipes/timer-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    FooterComponent,
    TimerFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
