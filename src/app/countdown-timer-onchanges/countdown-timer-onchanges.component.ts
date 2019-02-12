import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-countdown-timer-onchanges',
  templateUrl: './countdown-timer-onchanges.component.html',
  styleUrls: ['./countdown-timer-onchanges.component.scss']
})
export class CountdownTimerOnchangesComponent implements OnChanges, OnInit, OnDestroy {

  constructor() {
  }

  private intervalId = 0;
  message = 'Ok';
  remainingTime: number;
  @Input()
  seconds = 11;


  clearTimer() {
    clearInterval(this.intervalId);
  }


  start() {
    this.countDown();
    if (this.remainingTime <= 0) {
      this.remainingTime = this.seconds;
    }
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }

  reset() {
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.message = `Click start button to start the Countdown`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.remainingTime -= 1;
      if (this.remainingTime === 0) {
        this.message = 'Blast off!';
        this.clearTimer();
      } else {
        this.message = `T-${this.remainingTime} seconds and counting`;
      }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('seconds' in changes) {
      let v = changes.seconds.currentValue;
      v = typeof v === 'undefined' ? 11 : v;
      const vFixed = Number(v);
      this.seconds = Number.isNaN(vFixed) ? 11 : vFixed;
    }

  }

  ngOnDestroy() {
    this.clearTimer();
  }

  ngOnInit() {
    this.reset();
    this.start();
  }
}
