import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program-page',
  templateUrl: './program-page.component.html',
  styleUrls: ['./program-page.component.scss']
})
export class ProgramPageComponent implements OnInit {
  programId: string;
  organizationId: string;
  rawParammap;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // collect the ids for looking up the program from the route.
    this.programId = this.route.snapshot.paramMap.get('progid');
    this.organizationId = this.route.snapshot.paramMap.get('orgid');
  }

}
