import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

interface IRatingUnit {
  value: number;
  active: boolean;

}

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})


export class RatingBarComponent implements OnInit, OnChanges {

  constructor() {
  }

  @Input() max = 5;
  @Input() ratingValue = 5;
  @Input() showRatingValue = true;
  ratingUnits: Array<IRatingUnit> = [];
  @Output()
  rateChange = new EventEmitter<number>();

  calculate(max, ratingValue) {
    this.ratingUnits = Array.from({length: max},
      (_, index) => ({
        value: index + 1,
        active: index < ratingValue
      }));
  }
  select(index) {
    this.ratingValue = index + 1;
    this.ratingUnits.forEach((item, idx) =>
      item.active = idx < this.ratingValue);
    this.rateChange.emit(this.ratingValue);
  }
  enter(index) {
    this.ratingUnits.forEach((item, idx) =>
      item.active = idx <= index);
  }
  reset() {
    this.ratingUnits.forEach((item, idx) =>
      item.active = idx < this.ratingValue);
  }

  ngOnInit() {
    this.calculate(this.max, this.ratingValue);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('max' in changes) {
      let max = changes.max.currentValue;
      max = typeof max === 'undefined' ? 5 : max;
      this.max = max;
      this.calculate(max, this.ratingValue);
    }
  }

}
