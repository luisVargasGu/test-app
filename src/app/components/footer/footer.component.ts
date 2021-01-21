import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // output string for how long execution took
  @Input("functionTimer") functionTimer: number;

  constructor() { }

  ngOnInit(): void {
  }

}
