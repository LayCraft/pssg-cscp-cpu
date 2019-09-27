import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoilerplateService } from 'src/app/core/services/boilerplate.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-organization-profile-page',
	templateUrl: './organization-profile-page.component.html',
	styleUrls: ['./organization-profile-page.component.scss']
})
export class OrganizationProfilePageComponent implements OnInit {
	// TODO: collect this from the route
	organizationId: string = 'bceid goes here';
	contactInformationForm: FormGroup;
	boilerplate;
	constructor(
		private boilerplateService: BoilerplateService,
		private router: Router
	) { }

	ngOnInit() {
		this.boilerplateService.getOrganizationBoilerplate(this.organizationId).subscribe(ci => {
			this.contactInformationForm = new FormGroup({
				'contactInformation': new FormControl()
			});
			this.contactInformationForm.controls['contactInformation'].setValue(ci);
		});
	}
	onSave(): void {
		this.boilerplateService.setOrganizationBoilerplate(this.organizationId, this.contactInformationForm.value.contactInformation).subscribe(
			res => {
				this.boilerplate = res;
				this.router.navigate(['/authenticated/dashboard']);
			},
			err => {
				alert('An error has occured. Please try submitting again.');
				console.log(err);
			}
		);
	}
}
