import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-countdown-timer-event-alias',
  templateUrl: './countdown-timer-event-alias.component.html',
  styleUrls: ['./countdown-timer-event-alias.component.scss']
})
export class CountdownTimerEventAliasComponent implements OnInit, OnChanges,OnDestroy {

  constructor() {
  }

  private intervalId = 0;
  message = 'Ok';
  remainingTime: number;
  @Input()
  seconds = 11;
  @Output('timerEnd')
  finish = new EventEmitter<boolean>();

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
        this.finish.emit(true);
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
