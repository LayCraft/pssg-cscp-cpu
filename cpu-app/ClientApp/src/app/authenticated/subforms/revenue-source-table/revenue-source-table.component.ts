import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RevenueSource } from '../../../core/models/revenue-source.class';
import { revenueSourceTypes } from '../../../core/constants/revenue-source-type';
import { iRevenueSource } from '../../../core/models/revenue-source.interface';
import { FormHelper } from '../../../core/form-helper';

@Component({
  selector: 'app-revenue-source-table',
  templateUrl: './revenue-source-table.component.html',
  styleUrls: ['./revenue-source-table.component.css']
})
export class RevenueSourceTableComponent implements OnInit {
  @Input() revenueSources: iRevenueSource[] = [];
  @Input() isDisabled: boolean = false;
  @Output() revenueSourcesChange = new EventEmitter<RevenueSource[]>();

  totalCash: number = 0;
  totalInKind: number = 0;
  totalGrand: number = 0;
  other = 'Other';
  revenueSourceTypes: string[] = revenueSourceTypes;
  public formHelper = new FormHelper();
  constructor() { }
  ngOnInit() {
    if (!this.revenueSources.length) {
      this.addRevenueSource();
    } else {
      this.calculateTotals();
    }
  }
  addRevenueSource() {
    let rev = new RevenueSource();
    rev.revenueSourceName = revenueSourceTypes[4];
    this.revenueSources.push(rev);
    this.calculateTotals();
  }
  removeRevenueSource(index: number): void {
    let revToRemove = this.revenueSources[index];
    if (revToRemove.revenueSourceId) {
      revToRemove.isActive = false;
    }
    else {
      this.revenueSources.splice(index, 1);
    }
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

    let activeRev = this.revenueSources.filter(rs => rs.isActive);

    if (activeRev.length > 0) {

      activeRev.forEach(rs => {
        rs.total = (rs.cash || 0) + (rs.inKindContribution || 0);
        rs.totalMask = rs.total.toString();
      });
      // totalCash
      this.totalCash = activeRev.map(rs => rs.cash).reduce(reducer) || 0;
      // totalInKind
      this.totalInKind = activeRev.map(rs => rs.inKindContribution).reduce(reducer) || 0;
      // total cost
      this.totalGrand = activeRev.map(rs => {
        let total = 0;
        if (typeof rs.cash === 'number') total += (rs.cash || 0);
        if (typeof rs.inKindContribution === 'number') total += (rs.inKindContribution || 0);
        return total;
      }).reduce(reducer) || 0;
    }

    // after every calculate, output the json to the parent.
    this.revenueSourcesChange.emit(this.revenueSources);
  }
}
