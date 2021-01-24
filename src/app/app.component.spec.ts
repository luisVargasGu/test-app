import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { TimerFormatPipe } from './pipes/timer-format.pipe';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        TimerFormatPipe
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    component = fixture.componentInstance;

    htmlElement = fixture.debugElement.nativeElement
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the header component', async(() => {
    expect(htmlElement.querySelector('app-header')).not.toBe(null);
  }));

  it('should have the footer component', async(() => {
    expect(htmlElement.querySelector('app-footer')).not.toBe(null);
  }));
});
