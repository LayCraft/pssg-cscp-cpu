import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RevenueSource } from '../../../core/models/revenue-source.class';
import { revenueSourceTypes } from '../../../core/constants/revenue-source-type';
import { iRevenueSource } from '../../../core/models/revenue-source.interface';
@Component({
  selector: 'app-revenue-source-table',
  templateUrl: './revenue-source-table.component.html',
  styleUrls: ['./revenue-source-table.component.css']
})
export class RevenueSourceTableComponent implements OnInit {
  @Input() revenueSources: iRevenueSource[] = [];
  @Output() revenueSourcesChange = new EventEmitter<RevenueSource[]>();

  totalCash: number = 0;
  totalInKind: number = 0;
  totalGrand: number = 0;
  other = 'Other';
  revenueSourceTypes: string[] = revenueSourceTypes;
  constructor() { }
  ngOnInit() {
    if (!this.revenueSources.length) {
      this.addRevenueSource();
    } else {
      this.calculateTotals();
    }
  }
  addRevenueSource() {
    this.revenueSources.push(new RevenueSource());
    this.calculateTotals();
  }
  removeRevenueSource(index: number): void {
    // splice is acting unpredictably so I'm doing it with a for loop
    const newArray = [];
    for (let i = 0; i < this.revenueSources.length; i++) {
      if (i !== index) {
        newArray.push(this.revenueSources[i]);
      }
    }
    this.revenueSources = newArray;
    this.calculateTotals();
  }

  calculateTotals() {
    function reducer(prev: number = 0, curr: number = 0): number {
      // type check the input
      if (typeof curr === 'number') {
        return prev + curr;
      } else {
        return prev;
      }
    }
    // totalCash
    this.totalCash = this.revenueSources.map(rs => rs.cash).reduce(reducer) || 0;
    // totalInKind
    this.totalInKind = this.revenueSources.map(rs => rs.inKindContribution).reduce(reducer) || 0;
    // total cost
    this.totalGrand = this.revenueSources.map(rs => {
      let total = 0;
      if (typeof rs.cash === 'number') total += rs.cash;
      if (typeof rs.inKindContribution === 'number') total += rs.inKindContribution;
      return total;
    }).reduce(reducer) || 0;

    // after every calculate, output the json to the parent.
    this.revenueSourcesChange.emit(this.revenueSources);
  }
}
