import { COUNTRIES_ADDRESS_2 } from '../../../core/constants/country-list';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormHelper } from '../../../core/form-helper';
import { POSTAL_CODE } from '../../../core/constants/regex.constants';
import { EMAIL, PHONE_NUMBER } from '../../../core/constants/regex.constants';
import { iPerson } from '../../../core/models/person.interface';
import { nameAssemble } from '../../../core/constants/name-assemble';

@Component({
    selector: 'app-police-contact',
    templateUrl: './police-contact.component.html',
    styleUrls: ['./police-contact.component.css']
})
export class PoliceContactComponent implements OnInit {

    public formHelper = new FormHelper();
    @Input() person: iPerson;
    @Input() showAddressSection: boolean;
    @Output() personChange = new EventEmitter<iPerson>();

    nameAssemble = nameAssemble;
    countries: any;
    country: any;
    postalRegex: RegExp;
    emailRegex: RegExp = EMAIL;
    phoneRegex: RegExp = PHONE_NUMBER;
    fullNameString: string;

    constructor() {
        this.postalRegex = POSTAL_CODE;
        this.countries = COUNTRIES_ADDRESS_2;
    }

    ngOnInit() {
        console.log(this.person);
        this.country = this.person.address && this.person.address.country ? COUNTRIES_ADDRESS_2[this.person.address.country] : COUNTRIES_ADDRESS_2['Canada'];
        this.fullNameString = nameAssemble(this.person.firstName, this.person.middleName, this.person.lastName);
    }
    onChange() {
        this.personChange.emit(this.person);
    }
}
