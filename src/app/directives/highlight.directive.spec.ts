import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const el = {
      nativeElement: {
        style: {
          backgroundColor: ""
        }
      }
    };
    const directive = new HighlightDirective(el);
    expect(directive).toBeTruthy();
  });
});
