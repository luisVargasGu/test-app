import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api-service.service';
import { HighlightDirective } from './directives/highlight.directive';
import { FooterComponent } from './components/footer/footer.component';
import { TimerFormatPipe } from './pipes/timer-format.pipe';
import { QuestionaireComponent } from './components/questionaire/questionaire.component';
import { QuestionnaireService } from './services/questionnaire.service';
import { QuestionComponent } from './components/question/question.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    FooterComponent,
    TimerFormatPipe,
    QuestionaireComponent,
    QuestionComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    QuestionnaireService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
