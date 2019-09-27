import { Component, OnInit, Input } from '@angular/core';
import { iContactInformation } from 'src/app/core/models/contact-information.class';
import { ActivatedRoute } from '@angular/router';
import { iOrganizationMeta, BoilerplateService } from 'src/app/core/services/boilerplate.service';

@Component({
	selector: 'app-organization-profile-box',
	templateUrl: './organization-profile-box.component.html',
	styleUrls: ['./organization-profile-box.component.scss']
})
export class OrganizationProfileBoxComponent implements OnInit {
	organizationMeta: iOrganizationMeta;
	organizationId: string;
	constructor(
		private boilerplateService: BoilerplateService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.organizationId = this.route.snapshot.paramMap.get('organizationId');
		this.boilerplateService.getOrganizationMeta(this.organizationId).subscribe(m => this.organizationMeta = m);
	}

}
