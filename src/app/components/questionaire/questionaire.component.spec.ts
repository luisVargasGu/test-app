import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionComponent } from '../question/question.component';

import { QuestionaireComponent } from './questionaire.component';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { QuestionnaireServiceMock } from 'src/app/mock/questionnaire.service.mock';

describe('QuestionaireComponent', () => {
  let component: QuestionaireComponent;
  let fixture: ComponentFixture<QuestionaireComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [QuestionaireComponent, QuestionComponent],
      providers: [
        { provide: QuestionnaireService, useClass: QuestionnaireServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(QuestionaireComponent);
    component = fixture.componentInstance;
    htmlElement = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', async () => {
    component.generateResponse();
    expect(component.submitted).toBeTruthy();
  });

  it('should call the generate response function', async () => {
    fixture.detectChanges();
    spyOn(component, "generateResponse");
    htmlElement = fixture.debugElement.query(By.css('button')).nativeElement;
    htmlElement.click();
    expect(component.generateResponse).toHaveBeenCalledTimes(1);
  });

  it('form should be invalid', async () => {
    component.form.controls['1'].setValue(true, { emitModelToViewChange: false });
    let formGroup2: any = component.form.controls['2'];
    formGroup2.controls['2.1'].setValue('', { emitModelToViewChange: false });
    formGroup2.controls['2.2'].setValue('', { emitModelToViewChange: false });
    formGroup2.controls['2.3'].setValue('', { emitModelToViewChange: false });
    formGroup2.controls['2.4'].setValue('', { emitModelToViewChange: false });
    let formGroup3: any = component.form.controls['3'];
    formGroup3.controls['3.1'].setValue('', { emitModelToViewChange: false });
    formGroup3.controls['3.2'].setValue('', { emitModelToViewChange: false });
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be valid', async () => {
    component.form.controls['1'].setValue(true, { emitModelToViewChange: false });
    let formGroup2: any = component.form.controls['2'];
    formGroup2.controls['2.1'].setValue('male', { emitModelToViewChange: false });
    formGroup2.controls['2.2'].setValue(`${1999}-${10}-${21}`, { emitModelToViewChange: false });
    formGroup2.controls['2.3'].setValue('canada', { emitModelToViewChange: false });
    formGroup2.controls['2.4'].setValue('married', { emitModelToViewChange: false });
    let formGroup3: any = component.form.controls['3'];
    formGroup3.controls['3.1'].setValue(false, { emitModelToViewChange: false });
    formGroup3.controls['3.2'].setValue(true, { emitModelToViewChange: false });
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
  });
});
