import { Component, OnInit } from '@angular/core';
import { iOrganizationMeta, BoilerplateService } from 'src/app/core/services/boilerplate.service';

@Component({
	selector: 'app-organization-profile-box',
	templateUrl: './organization-profile-box.component.html',
	styleUrls: ['./organization-profile-box.component.scss']
})
export class OrganizationProfileBoxComponent implements OnInit {
	organizationMeta: iOrganizationMeta;
	constructor(
		private boilerplateService: BoilerplateService,
	) { }

	ngOnInit() {
		this.boilerplateService.getOrganizationMeta('TODO').subscribe(m => this.organizationMeta = m);
	}

}
