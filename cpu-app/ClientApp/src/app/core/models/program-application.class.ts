import { iProgramApplication } from "./program-application.interface";
import { iPerson } from "./person.interface";
import { iAddress } from "./address.interface";
import { iHours } from "./hours.interface";
import { FormHelper } from "../form-helper";
import { Person } from "./person.class";


export class ProgramApplication implements iProgramApplication {
    contractId: string;
    emailAddress: string;
    faxNumber: string;
    formState: string;
    name: string;
    programTypeName: string;
    phoneNumber: string;
    programId: string;
    assignmentArea: string;
    programLocation: string;
    serviceAreas: string[];
    hasMailingAddress?: boolean;
    isPoliceBased: boolean;
    governmentFunder: string;
    estimatedContractValue: number;

    // revenueSources: iRevenueSource[];
    additionalStaff: iPerson[];
    subContractedStaff: iPerson[];
    removedStaff: iPerson[];
    removedSubContractedStaff: iPerson[];
    mailingAddress: iAddress;
    mainAddress: iAddress;
    mailingAddressSameAsMainAddress: boolean;
    programContact: iPerson;
    policeContact: iPerson;
    hasPoliceContact: boolean;
    sharedCostContact: iPerson;
    hasSubContractedStaff: boolean;
    hasSharedCostContact: boolean;
    numberOfHours: number;
    scheduledHours: number;
    onCallHours: number;
    operationHours: iHours[];
    standbyHours: iHours[];
    perType: number;
    //for tracking selected sub-tab
    currentTab: string;
    private formHelper = new FormHelper();
    constructor(pa?: iProgramApplication) {
        if (pa) Object.assign(this, pa);
    }

    private REQUIRED_FIELDS: string[] = ["emailAddress", "phoneNumber", "mainAddress", "mainAddress.line1", "mainAddress.city", "mainAddress.postalCode",
        "mailingAddress", "mailingAddress.line1", "mailingAddress.city", "mailingAddress.postalCode"];
    hasRequiredFields() {
        for (let i = 0; i < this.REQUIRED_FIELDS.length; ++i) {
            if (!this.formHelper.fetchFromObject(this, this.REQUIRED_FIELDS[i])) {
                return false;
            }
        }
        let skip_employment_status_validation = true;

        if (this.hasPoliceContact) {
            let policeContact = new Person(this.policeContact);

            if (!policeContact.hasRequiredFields(skip_employment_status_validation)) {
                return false;
            }
        }

        if (this.hasSharedCostContact) {
            let sharedCostContact = new Person(this.sharedCostContact);
            if (!sharedCostContact.hasRequiredFields(skip_employment_status_validation)) {
                return false;
            }
        }
        return true;
    }
}
