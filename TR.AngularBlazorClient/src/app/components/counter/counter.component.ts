import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements AfterViewInit {
  stepCount: number = 6;
  counterComponent: any;
  setDetails = {
    myTime: new Date(),
    userId: 48557,
    userName: 'Jay Lathia'
  };

  ngAfterViewInit() {
    this.setBlazorSettings();
    // setTimeout(() => {
    //   this.setBlazorSettings();
    // }, 1000);
  }

  setBlazorSettings() {
    this.counterComponent = document.querySelector('counter-component');
    if (this.counterComponent) {
      this.counterComponent['setDetails'] = this.setDetails;
    }
  }
}
