import { iPerson } from "./person.interface";
import { iHours } from './hours.interface';
import { iAddress } from "./address.interface";
import { iContactInformation } from "./contact-information.interface";

export interface iCAPProgram {
    contractId: string;
    formState: string;
    name: string;
    programTypeName: string;
    programId: string;
    programLocation: string;
    maxAmount: number;
    applicationAmount: number;
    typesOfModels: string;
    otherModel: string;
    evaluation: boolean;
    evaluationDescription: string;
    additionalComments: string;

    additionalStaff: iPerson[];
    removedStaff: iPerson[];
    programContact: iPerson;
}
