import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerFormat'
})
export class TimerFormatPipe implements PipeTransform {

  transform(value: number): string {
    return `Function exceution lasted: ${isNaN(value) ? 0 : (value / 1000).toFixed(2)} seconds`;
  }

}
