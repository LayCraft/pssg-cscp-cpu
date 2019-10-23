import { Component, OnInit, Input } from '@angular/core';
import { iTombstone } from '../../../core/models/tombstone.class';
import { StateService } from '../../../core/services/state.service';
import { iPerson } from '../../../core/models/person.class';
import { iContract } from '../../../core/models/contract';
import { TaskStatus } from '../../../core/constants/task-status';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tabs: string[];
  currentTab: string;
  realStatuses: string[] = TaskStatus;
  statuses: string[];
  formTypes: string[];
  @Input() contract: iContract;
  @Input() tombstones: iTombstone[] = [
    {
      contractId: 'foo',
      contractNumber: '15092013-21',
      forDateRangeEnd: new Date('2020-04-20'),
      forDateRangeStart: new Date('2020-04-20'),
      formDeadline: new Date('2020-01-15'),
      formName: 'Contract Renewal Application',
      formStatus: 'Started',
      formType: 'program_application',
      frequency: 'annual',
      lastUpdated: new Date('2019-05-01'),
      organizationId: 'aacb8575ac5acb363a64ca'
    } as iTombstone,
    {
      contractId: 'foo',
      contractNumber: '15092013-21',
      forDateRangeEnd: new Date('2021-03-31'),
      forDateRangeStart: new Date('2020-04-01'),
      formDeadline: new Date('2020-01-15'),
      formName: 'Budget Proposal',
      formStatus: 'Action Required',
      formType: 'budget_proposal',
      frequency: 'annual',
      organizationId: 'aacb8575ac5acb363a64ca'
    } as iTombstone,
    {
      contractId: 'bar',
      contractNumber: '15092013-20',
      forDateRangeEnd: new Date('2019-06-30'),
      forDateRangeStart: new Date('2019-04-01'),
      formDeadline: new Date('2019-07-30'),
      formName: 'Schedule G',
      formStatus: 'Complete',
      formType: 'expense_report',
      frequency: 'quarterly',
      organizationId: 'aacb8575ac5acb363a64ca',
      programName: 'Burns Lake RCMP Victim Assistance Program',
      note: 'FY19-Q1'
    } as iTombstone,
    {
      contractId: 'bar',
      contractNumber: '15092013-20',
      forDateRangeEnd: new Date('2019-09-30'),
      forDateRangeStart: new Date('2019-07-01'),
      formDeadline: new Date('2019-10-30'),
      formName: 'Schedule G',
      formStatus: 'Action Required',
      formType: 'expense_report',
      frequency: 'quarterly',
      organizationId: 'aacb8575ac5acb363a64ca',
      programName: 'Burns Lake RCMP Victim Assistance Program',
      note: 'FY19-Q2'
    } as iTombstone,
    {
      contractId: 'bar',
      contractNumber: '15092013-20',
      forDateRangeEnd: new Date('2019-06-30'),
      forDateRangeStart: new Date('2019-04-01'),
      formDeadline: new Date('2019-07-30'),
      formName: 'Schedule G',
      formStatus: 'Complete',
      formType: 'expense_report',
      frequency: 'quarterly',
      organizationId: 'aacb8575ac5acb363a64ca',
      programName: 'Community Program 1',
      note: 'FY19-Q1'
    } as iTombstone,
    {
      contractId: 'bar',
      contractNumber: '15092013-20',
      forDateRangeEnd: new Date('2019-09-30'),
      forDateRangeStart: new Date('2019-07-01'),
      formDeadline: new Date('2019-10-30'),
      formName: 'Schedule G',
      formStatus: 'Action Required',
      formType: 'expense_report',
      frequency: 'quarterly',
      organizationId: 'aacb8575ac5acb363a64ca',
      programName: 'Community Program 1',
      note: 'FY19-Q2',
      programContact: {
        firstName: 'Tony',
        middleName: 'Eugene',
        lastName: 'Stark',
        title: 'Man of Iron',
        email: 'tonystark67@hotmail.com',
      } as iPerson,
      programId: 'NCC-1701'
    } as iTombstone,
  ];

  constructor(
    private stateService: StateService
  ) {
    this.tabs = ['Current Tasks', 'Completed', 'Programs'];
    this.currentTab = this.tabs[0];
    this.statuses = ['Missed', 'Late', 'Submitted', 'Started', 'Action Required', 'Complete'];
    this.formTypes = ['program_application', 'budget_proposal', 'status_report', 'expense_report'];
  }

  ngOnInit() {
    // split tombstones into current, completed and programs
  }

  setCurrentTab(tabname: string) {
    this.currentTab = tabname;
  }
}
